// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import crypto from 'crypto';

interface HashResult {
    algorithm: string;
    hash: string;
    length: number;
}

export function HashGenerator() {
    const { t } = useTranslation('common');
    const [input, setInput] = useState('');
    const [results, setResults] = useState<HashResult[]>([]);
    const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>([
        'md5', 'sha1', 'sha256', 'sha512'
    ]);
    const [inputType, setInputType] = useState<'text' | 'file'>('text');
    const [error, setError] = useState('');

    const availableAlgorithms = [
        { value: 'md5', label: 'MD5', description: '128-bit hash (not cryptographically secure)' },
        { value: 'sha1', label: 'SHA-1', description: '160-bit hash (deprecated for security)' },
        { value: 'sha224', label: 'SHA-224', description: '224-bit hash' },
        { value: 'sha256', label: 'SHA-256', description: '256-bit hash (recommended)' },
        { value: 'sha384', label: 'SHA-384', description: '384-bit hash' },
        { value: 'sha512', label: 'SHA-512', description: '512-bit hash (recommended)' },
        { value: 'sha3-256', label: 'SHA3-256', description: '256-bit SHA-3 hash' },
        { value: 'sha3-512', label: 'SHA3-512', description: '512-bit SHA-3 hash' }
    ];

    const generateHashes = () => {
        setError('');
        if (!input.trim()) {
            setResults([]);
            return;
        }

        try {
            const newResults: HashResult[] = [];
            const inputBuffer = Buffer.from(input, 'utf8');

            selectedAlgorithms.forEach(algorithm => {
                try {
                    const hash = crypto.createHash(algorithm).update(inputBuffer).digest('hex');
                    newResults.push({
                        algorithm: algorithm.toUpperCase(),
                        hash,
                        length: hash.length
                    });
                } catch (err) {
                    console.warn(`Algorithm ${algorithm} not supported:`, err);
                }
            });

            setResults(newResults);
        } catch (err) {
            setError('Error generating hashes: ' + (err as Error).message);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const toggleAlgorithm = (algorithm: string) => {
        setSelectedAlgorithms(prev => 
            prev.includes(algorithm)
                ? prev.filter(a => a !== algorithm)
                : [...prev, algorithm]
        );
    };

    const selectAll = () => {
        setSelectedAlgorithms(availableAlgorithms.map(a => a.value));
    };

    const selectRecommended = () => {
        setSelectedAlgorithms(['sha256', 'sha512']);
    };

    const loadSample = () => {
        const samples = [
            'Hello, World!',
            'The quick brown fox jumps over the lazy dog',
            'Password123',
            'Lorem ipsum dolor sit amet',
            JSON.stringify({ user: 'john_doe', timestamp: Date.now() })
        ];
        setInput(samples[Math.floor(Math.random() * samples.length)]);
    };

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setInput(result);
            };
            reader.readAsText(file);
        }
    };

    const compareHashes = () => {
        if (results.length === 0) return null;
        
        const strengthOrder = ['md5', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'sha3-256', 'sha3-512'];
        const sortedResults = [...results].sort((a, b) => {
            const aIndex = strengthOrder.indexOf(a.algorithm.toLowerCase());
            const bIndex = strengthOrder.indexOf(b.algorithm.toLowerCase());
            return aIndex - bIndex;
        });

        return sortedResults;
    };

    return (
        <div className="hash-generator">
            <div className="d-flex gap-2 mb-3">
                <Button variant="outline-secondary" size="sm" onClick={loadSample}>
                    {t('loadSample')}
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={selectRecommended}>
                    Select Recommended
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={selectAll}>
                    Select All
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={() => {
                    setInput('');
                    setResults([]);
                    setError('');
                }}>
                    {t('clear')}
                </Button>
                <Button variant="primary" onClick={generateHashes}>
                    Generate Hashes
                </Button>
            </div>

            <div className="form-group">
                <label className="form-label">Input Type</label>
                <div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="inputType"
                            id="text-input"
                            checked={inputType === 'text'}
                            onChange={() => setInputType('text')}
                        />
                        <label className="form-check-label" htmlFor="text-input">
                            Text Input
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="inputType"
                            id="file-input"
                            checked={inputType === 'file'}
                            onChange={() => setInputType('file')}
                        />
                        <label className="form-check-label" htmlFor="file-input">
                            File Input
                        </label>
                    </div>
                </div>
            </div>

            {inputType === 'text' ? (
                <div className="form-group">
                    <label className="form-label">Input Text</label>
                    <textarea
                        className="form-control form-control-mono"
                        rows={6}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter text to hash..."
                        style={{ fontSize: '14px' }}
                    />
                    <small className="text-muted">
                        Input length: {input.length} characters ({new Blob([input]).size} bytes)
                    </small>
                </div>
            ) : (
                <div className="form-group">
                    <label className="form-label">Select File</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleFileInput}
                        accept=".txt,.json,.xml,.csv"
                    />
                    <small className="text-muted">
                        Supported file types: .txt, .json, .xml, .csv
                    </small>
                </div>
            )}

            <div className="form-group">
                <label className="form-label">Hash Algorithms</label>
                <div className="row">
                    {availableAlgorithms.map(algorithm => (
                        <div key={algorithm.value} className="col-md-6">
                            <div className="form-check mb-2">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={algorithm.value}
                                    checked={selectedAlgorithms.includes(algorithm.value)}
                                    onChange={() => toggleAlgorithm(algorithm.value)}
                                />
                                <label className="form-check-label" htmlFor={algorithm.value}>
                                    <strong>{algorithm.label}</strong>
                                    <br />
                                    <small className="text-muted">{algorithm.description}</small>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {error && (
                <Alert variant="danger">
                    ❌ {error}
                </Alert>
            )}

            {results.length > 0 && (
                <div className="form-group">
                    <label className="form-label">Hash Results</label>
                    <div className="row g-3">
                        {compareHashes()?.map((result, index) => (
                            <div key={index} className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <h6 className="card-title mb-1">{result.algorithm}</h6>
                                                <small className="text-muted">
                                                    {result.length} characters ({result.length / 2} bytes)
                                                </small>
                                            </div>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => copyToClipboard(result.hash)}
                                            >
                                                {t('copy')}
                                            </Button>
                                        </div>
                                        <div
                                            className="form-control form-control-mono"
                                            style={{
                                                wordBreak: 'break-all',
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                                backgroundColor: 'var(--bg-tertiary)'
                                            }}
                                            onClick={() => copyToClipboard(result.hash)}
                                        >
                                            {result.hash}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-4 p-3 bg-light rounded">
                <h6>Hash Algorithm Comparison</h6>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <strong>Secure (Recommended):</strong>
                            <ul className="list-unstyled small mt-1">
                                <li>• <strong>SHA-256:</strong> Fast, widely supported</li>
                                <li>• <strong>SHA-512:</strong> More secure, slower</li>
                                <li>• <strong>SHA3-256/512:</strong> Latest standard</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <strong>Legacy (Not Recommended):</strong>
                            <ul className="list-unstyled small mt-1">
                                <li>• <strong>MD5:</strong> Fast but vulnerable</li>
                                <li>• <strong>SHA-1:</strong> Deprecated for security</li>
                                <li>• Use only for non-security purposes</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <strong>💡 Tip:</strong> For password hashing, use dedicated functions like bcrypt, scrypt, or Argon2 instead of these general-purpose hash functions.
                </div>
            </div>
        </div>
    );
}