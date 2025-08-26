// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

interface Match {
    match: string;
    index: number;
    groups: string[];
}

export function RegexTester() {
    const { t } = useTranslation('common');
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState('g');
    const [testString, setTestString] = useState('');
    const [matches, setMatches] = useState<Match[]>([]);
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const testRegex = () => {
        setError('');
        setMatches([]);
        setIsValid(null);

        if (!pattern.trim()) {
            setError('Please enter a regex pattern');
            return;
        }

        try {
            const regex = new RegExp(pattern, flags);
            setIsValid(true);

            if (testString) {
                const foundMatches: Match[] = [];
                let match;

                if (flags.includes('g')) {
                    while ((match = regex.exec(testString)) !== null) {
                        foundMatches.push({
                            match: match[0],
                            index: match.index,
                            groups: match.slice(1)
                        });
                        if (match.index === regex.lastIndex) {
                            break;
                        }
                    }
                } else {
                    match = regex.exec(testString);
                    if (match) {
                        foundMatches.push({
                            match: match[0],
                            index: match.index,
                            groups: match.slice(1)
                        });
                    }
                }

                setMatches(foundMatches);
            }
        } catch (err) {
            setError('Invalid regex pattern: ' + (err as Error).message);
            setIsValid(false);
        }
    };

    const highlightMatches = (text: string, matches: Match[]) => {
        if (matches.length === 0) return text;

        let result = '';
        let lastIndex = 0;

        matches.forEach((match) => {
            result += text.slice(lastIndex, match.index);
            result += `<mark style="background: #fbbf24; padding: 2px 4px; border-radius: 4px;">${match.match}</mark>`;
            lastIndex = match.index + match.match.length;
        });

        result += text.slice(lastIndex);
        return result;
    };

    const commonPatterns = [
        { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
        { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)' },
        { name: 'Phone', pattern: '\\+?[1-9]\\d{1,14}' },
        { name: 'IPv4', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b' },
        { name: 'Hex Color', pattern: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})' },
        { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' }
    ];

    return (
        <div className="regex-tester">
            <div className="form-group">
                <label className="form-label">Common Patterns</label>
                <div className="d-flex flex-wrap gap-2 mb-3">
                    {commonPatterns.map((p) => (
                        <Button
                            key={p.name}
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setPattern(p.pattern)}
                        >
                            {p.name}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="form-label">Regular Expression</label>
                        <input
                            type="text"
                            className="form-control form-control-mono"
                            value={pattern}
                            onChange={(e) => setPattern(e.target.value)}
                            placeholder="Enter your regex pattern..."
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="form-label">Flags</label>
                        <input
                            type="text"
                            className="form-control"
                            value={flags}
                            onChange={(e) => setFlags(e.target.value)}
                            placeholder="gim"
                        />
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Test String</label>
                <textarea
                    className="form-control"
                    rows={6}
                    value={testString}
                    onChange={(e) => setTestString(e.target.value)}
                    placeholder="Enter text to test against the regex..."
                />
            </div>

            <div className="d-flex gap-2 mb-4">
                <Button variant="primary" onClick={testRegex}>
                    {t('validate')} & Test
                </Button>
                <Button variant="outline-secondary" onClick={() => {
                    setPattern('');
                    setTestString('');
                    setMatches([]);
                    setError('');
                    setIsValid(null);
                }}>
                    {t('clear')}
                </Button>
            </div>

            {error && (
                <Alert variant="danger">
                    ❌ {error}
                </Alert>
            )}

            {isValid === true && !error && (
                <Alert variant="success">
                    ✅ Valid regex pattern
                </Alert>
            )}

            {testString && (
                <div className="form-group">
                    <label className="form-label">Highlighted Matches</label>
                    <div 
                        className="form-control"
                        style={{ 
                            minHeight: '120px', 
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'var(--font-family-mono)'
                        }}
                        dangerouslySetInnerHTML={{
                            __html: highlightMatches(testString, matches)
                        }}
                    />
                </div>
            )}

            {matches.length > 0 && (
                <div className="form-group">
                    <label className="form-label">Match Results ({matches.length} matches found)</label>
                    <div className="border rounded p-3">
                        {matches.map((match, index) => (
                            <div key={index} className="mb-3 p-3 bg-light rounded">
                                <div><strong>Match {index + 1}:</strong> &quot;{match.match}&quot;</div>
                                <div><small className="text-muted">Position: {match.index}-{match.index + match.match.length}</small></div>
                                {match.groups.length > 0 && (
                                    <div><small className="text-muted">Groups: [{match.groups.join(', ')}]</small></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-4 p-3 bg-light rounded">
                <h6>Regex Quick Reference</h6>
                <div className="row">
                    <div className="col-md-6">
                        <ul className="list-unstyled small">
                            <li><code>.</code> - Any character except newline</li>
                            <li><code>*</code> - Zero or more</li>
                            <li><code>+</code> - One or more</li>
                            <li><code>?</code> - Zero or one</li>
                            <li><code>^</code> - Start of string</li>
                            <li><code>$</code> - End of string</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <ul className="list-unstyled small">
                            <li><code>\d</code> - Digit (0-9)</li>
                            <li><code>\w</code> - Word character</li>
                            <li><code>\s</code> - Whitespace</li>
                            <li><code>[abc]</code> - Character set</li>
                            <li><code>(abc)</code> - Capturing group</li>
                            <li><code>a{2,4}</code> - Quantifier (2-4 times)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}