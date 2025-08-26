// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

interface GeneratedContent {
    type: string;
    content: string;
    count: number;
}

export function LoremIpsumGenerator() {
    const { t } = useTranslation('common');
    const [generated, setGenerated] = useState<GeneratedContent[]>([]);
    const [count, setCount] = useState(5);
    const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
    const [startWithLorem, setStartWithLorem] = useState(true);
    const [includeHtml, setIncludeHtml] = useState(false);

    const loremWords = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
        'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
        'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
        'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
        'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
        'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
        'accusamus', 'accusantium', 'doloremque', 'laudantium', 'totam', 'rem',
        'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis',
        'et', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'explicabo', 'nemo',
        'ipsam', 'voluptatem', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit',
        'fugit', 'sed', 'quia', 'consequuntur', 'magni', 'dolores', 'ratione',
        'sequi', 'nesciunt', 'neque', 'porro', 'quisquam', 'dolorem', 'adipisci',
        'numquam', 'eius', 'modi', 'tempora', 'incidunt', 'magnam', 'quaerat',
        'voluptatem', 'aliquam', 'quaerat', 'enim', 'minima', 'veniam', 'nostrum',
        'exercitationem', 'ullam', 'corporis', 'suscipit', 'laboriosam'
    ];

    const generateWords = (numWords: number): string[] => {
        const words = [];
        for (let i = 0; i < numWords; i++) {
            words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        return words;
    };

    const generateSentence = (): string => {
        const sentenceLength = Math.floor(Math.random() * 10) + 8; // 8-17 words
        const words = generateWords(sentenceLength);
        const sentence = words.join(' ');
        return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
    };

    const generateParagraph = (): string => {
        const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-6 sentences
        const sentences = [];
        for (let i = 0; i < sentenceCount; i++) {
            sentences.push(generateSentence());
        }
        return sentences.join(' ');
    };

    const generate = () => {
        const content: GeneratedContent[] = [];
        
        if (type === 'words') {
            const words = generateWords(count);
            if (startWithLorem && words.length > 0) {
                words[0] = 'Lorem';
                if (words.length > 1) words[1] = 'ipsum';
            }
            
            let result = words.join(' ');
            if (includeHtml) {
                result = `<span>${result}</span>`;
            }
            
            content.push({
                type: 'Words',
                content: result,
                count: words.length
            });
        } else if (type === 'sentences') {
            const sentences = [];
            for (let i = 0; i < count; i++) {
                sentences.push(generateSentence());
            }
            
            if (startWithLorem && sentences.length > 0) {
                sentences[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
            }
            
            let result = sentences.join(' ');
            if (includeHtml) {
                result = sentences.map(s => `<p>${s}</p>`).join('\n');
            }
            
            content.push({
                type: 'Sentences',
                content: result,
                count: sentences.length
            });
        } else {
            const paragraphs = [];
            for (let i = 0; i < count; i++) {
                paragraphs.push(generateParagraph());
            }
            
            if (startWithLorem && paragraphs.length > 0) {
                paragraphs[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
            }
            
            let result = paragraphs.join('\n\n');
            if (includeHtml) {
                result = paragraphs.map(p => `<p>${p}</p>`).join('\n\n');
            }
            
            content.push({
                type: 'Paragraphs',
                content: result,
                count: paragraphs.length
            });
        }
        
        setGenerated(content);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const getPresets = () => {
        return [
            { name: 'Short (1 paragraph)', type: 'paragraphs' as const, count: 1 },
            { name: 'Medium (3 paragraphs)', type: 'paragraphs' as const, count: 3 },
            { name: 'Long (5 paragraphs)', type: 'paragraphs' as const, count: 5 },
            { name: '10 sentences', type: 'sentences' as const, count: 10 },
            { name: '50 words', type: 'words' as const, count: 50 },
            { name: '100 words', type: 'words' as const, count: 100 }
        ];
    };

    const applyPreset = (preset: { type: 'paragraphs' | 'sentences' | 'words', count: number }) => {
        setType(preset.type);
        setCount(preset.count);
    };

    const getStats = (content: string) => {
        const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
        const charCount = content.length;
        const charCountNoSpaces = content.replace(/\s/g, '').length;
        const paragraphCount = content.split('\n\n').filter(p => p.trim().length > 0).length;
        
        return {
            words: wordCount,
            characters: charCount,
            charactersNoSpaces: charCountNoSpaces,
            paragraphs: paragraphCount
        };
    };

    return (
        <div className="lorem-ipsum-generator">
            <div className="row mb-3">
                <div className="col-md-8">
                    <div className="d-flex gap-2 flex-wrap">
                        {getPresets().map((preset, index) => (
                            <Button
                                key={index}
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => applyPreset(preset)}
                            >
                                {preset.name}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                    <Button variant="outline-secondary" size="sm" onClick={() => setGenerated([])}>
                        {t('clear')}
                    </Button>
                    <Button variant="primary" onClick={generate} className="flex-grow-1">
                        Generate
                    </Button>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-3">
                    <div className="form-group">
                        <label className="form-label">Type</label>
                        <select
                            className="form-select"
                            value={type}
                            onChange={(e) => setType(e.target.value as 'paragraphs' | 'sentences' | 'words')}
                        >
                            <option value="paragraphs">Paragraphs</option>
                            <option value="sentences">Sentences</option>
                            <option value="words">Words</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="form-group">
                        <label className="form-label">Count</label>
                        <input
                            type="number"
                            className="form-control"
                            min="1"
                            max="100"
                            value={count}
                            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Options</label>
                    <div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="startWithLorem"
                                checked={startWithLorem}
                                onChange={(e) => setStartWithLorem(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="startWithLorem">
                                Start with "Lorem ipsum"
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="includeHtml"
                                checked={includeHtml}
                                onChange={(e) => setIncludeHtml(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="includeHtml">
                                Wrap with HTML tags
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {generated.map((item, index) => (
                <div key={index} className="form-group">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label">
                            Generated {item.type} ({item.count} {item.type.toLowerCase()})
                        </label>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => copyToClipboard(item.content)}
                        >
                            {t('copy')}
                        </Button>
                    </div>
                    
                    <textarea
                        className="form-control"
                        rows={Math.min(Math.max(item.content.split('\n').length + 2, 8), 20)}
                        value={item.content}
                        readOnly
                        style={{ 
                            fontSize: '14px', 
                            lineHeight: '1.6',
                            backgroundColor: 'var(--bg-tertiary)'
                        }}
                    />
                    
                    <div className="mt-2 p-2 bg-light rounded">
                        <small className="text-muted">
                            <strong>Statistics:</strong> {' '}
                            {(() => {
                                const stats = getStats(item.content);
                                return `${stats.words} words, ${stats.characters} characters (${stats.charactersNoSpaces} without spaces), ${stats.paragraphs} paragraphs`;
                            })()}
                        </small>
                    </div>
                </div>
            ))}

            <div className="mt-4 p-3 bg-light rounded">
                <h6>About Lorem Ipsum</h6>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <strong>What is Lorem Ipsum?</strong>
                            <ul className="list-unstyled small mt-1">
                                <li>• Placeholder text used in printing and typesetting</li>
                                <li>• Derived from "De finibus bonorum et malorum" by Cicero</li>
                                <li>• Standard dummy text since the 1500s</li>
                                <li>• Scrambled Latin that looks like readable English</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <strong>Common Use Cases:</strong>
                            <ul className="list-unstyled small mt-1">
                                <li>• Web design mockups and prototypes</li>
                                <li>• Print layout design</li>
                                <li>• Font and typography testing</li>
                                <li>• Content management system testing</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <strong>💡 Tip:</strong> Lorem ipsum is preferred over "Here is some content" because it doesn't distract from the visual elements of a design layout.
                </div>
            </div>
        </div>
    );
}