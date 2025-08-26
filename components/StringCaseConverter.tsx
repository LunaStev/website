// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

interface CaseResult {
    name: string;
    value: string;
    description: string;
}

export function StringCaseConverter() {
    const { t } = useTranslation('common');
    const [input, setInput] = useState('Hello World Example Text');
    const [results, setResults] = useState<CaseResult[]>([]);

    const convertCases = () => {
        if (!input.trim()) {
            setResults([]);
            return;
        }

        const text = input.trim();
        const newResults: CaseResult[] = [
            {
                name: 'UPPERCASE',
                value: text.toUpperCase(),
                description: 'All letters converted to uppercase'
            },
            {
                name: 'lowercase',
                value: text.toLowerCase(),
                description: 'All letters converted to lowercase'
            },
            {
                name: 'Title Case',
                value: text.replace(/\w\S*/g, (txt) => 
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                ),
                description: 'First letter of each word capitalized'
            },
            {
                name: 'Sentence case',
                value: text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
                description: 'Only the first letter is capitalized'
            },
            {
                name: 'camelCase',
                value: text
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()),
                description: 'First word lowercase, subsequent words capitalized, no spaces'
            },
            {
                name: 'PascalCase',
                value: text
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
                    .replace(/^./, (chr) => chr.toUpperCase()),
                description: 'All words capitalized, no spaces'
            },
            {
                name: 'snake_case',
                value: text
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9]+/g, '_')
                    .replace(/^_+|_+$/g, ''),
                description: 'Lowercase words separated by underscores'
            },
            {
                name: 'SCREAMING_SNAKE_CASE',
                value: text
                    .toUpperCase()
                    .replace(/[^a-zA-Z0-9]+/g, '_')
                    .replace(/^_+|_+$/g, ''),
                description: 'Uppercase words separated by underscores'
            },
            {
                name: 'kebab-case',
                value: text
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, ''),
                description: 'Lowercase words separated by hyphens'
            },
            {
                name: 'SCREAMING-KEBAB-CASE',
                value: text
                    .toUpperCase()
                    .replace(/[^a-zA-Z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, ''),
                description: 'Uppercase words separated by hyphens'
            },
            {
                name: 'dot.case',
                value: text
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9]+/g, '.')
                    .replace(/^\.+|\.+$/g, ''),
                description: 'Lowercase words separated by dots'
            },
            {
                name: 'path/case',
                value: text
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9]+/g, '/')
                    .replace(/^\/+|\/+$/g, ''),
                description: 'Lowercase words separated by forward slashes'
            }
        ];

        setResults(newResults);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const loadSample = () => {
        const samples = [
            'Hello World Example Text',
            'user name validation',
            'API_RESPONSE_DATA',
            'convert-this-text',
            'XMLHttpRequest'
        ];
        const randomSample = samples[Math.floor(Math.random() * samples.length)];
        setInput(randomSample);
    };

    return (
        <div className="string-case-converter">
            <div className="d-flex gap-2 mb-3">
                <Button variant="outline-secondary" size="sm" onClick={loadSample}>
                    Random Sample
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={() => setInput('')}>
                    {t('clear')}
                </Button>
                <Button variant="primary" onClick={convertCases}>
                    Convert Cases
                </Button>
            </div>

            <div className="form-group">
                <label className="form-label">Input Text</label>
                <input
                    type="text"
                    className="form-control"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter text to convert..."
                    onKeyPress={(e) => e.key === 'Enter' && convertCases()}
                />
            </div>

            {results.length > 0 && (
                <div className="results-grid">
                    <h6 className="mb-3">Conversion Results</h6>
                    <div className="row g-3">
                        {results.map((result, index) => (
                            <div key={index} className="col-md-6">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h6 className="card-title mb-1">{result.name}</h6>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => copyToClipboard(result.value)}
                                            >
                                                {t('copy')}
                                            </Button>
                                        </div>
                                        <p className="text-muted small mb-2">{result.description}</p>
                                        <div 
                                            className="form-control form-control-mono"
                                            style={{ 
                                                minHeight: 'auto',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                backgroundColor: 'var(--bg-tertiary)'
                                            }}
                                            onClick={() => copyToClipboard(result.value)}
                                        >
                                            {result.value}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-4 p-3 bg-light rounded">
                <h6>Case Types Explained</h6>
                <div className="row">
                    <div className="col-md-6">
                        <ul className="list-unstyled small">
                            <li><strong>camelCase:</strong> JavaScript variables</li>
                            <li><strong>PascalCase:</strong> Class names</li>
                            <li><strong>snake_case:</strong> Python variables</li>
                            <li><strong>kebab-case:</strong> CSS classes, URLs</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <ul className="list-unstyled small">
                            <li><strong>SCREAMING_SNAKE:</strong> Constants</li>
                            <li><strong>dot.case:</strong> File extensions</li>
                            <li><strong>path/case:</strong> File paths</li>
                            <li><strong>Title Case:</strong> Headings</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}