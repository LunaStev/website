// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

export function URLEncoder() {
    const { t } = useTranslation('common');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [encodeType, setEncodeType] = useState<'uri' | 'component'>('component');
    const [error, setError] = useState('');

    const processURL = () => {
        setError('');
        if (!input.trim()) {
            setOutput('');
            return;
        }

        try {
            if (mode === 'encode') {
                if (encodeType === 'uri') {
                    setOutput(encodeURI(input));
                } else {
                    setOutput(encodeURIComponent(input));
                }
            } else {
                try {
                    setOutput(decodeURIComponent(input));
                } catch {
                    // Fallback to decodeURI if decodeURIComponent fails
                    setOutput(decodeURI(input));
                }
            }
        } catch (err) {
            setError('Error processing URL: ' + (err as Error).message);
            setOutput('');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    const loadSample = () => {
        if (mode === 'encode') {
            const samples = [
                'https://example.com/search?q=hello world&lang=en',
                'hello world! how are you?',
                'user@domain.com',
                'path/to/file with spaces.txt',
                '특수문자 테스트 & symbols #@$%'
            ];
            setInput(samples[Math.floor(Math.random() * samples.length)]);
        } else {
            const samples = [
                'https%3A//example.com/search%3Fq%3Dhello%20world%26lang%3Den',
                'hello%20world!%20how%20are%20you%3F',
                'user%40domain.com',
                'path/to/file%20with%20spaces.txt',
                '%ED%8A%B9%EC%88%98%EB%AC%B8%EC%9E%90%20%ED%85%8C%EC%8A%A4%ED%8A%B8%20%26%20symbols%20%23%40%24%25'
            ];
            setInput(samples[Math.floor(Math.random() * samples.length)]);
        }
    };

    const analyzeURL = () => {
        if (!input.trim()) return null;

        try {
            const url = new URL(input.startsWith('http') ? input : 'https://' + input);
            return {
                protocol: url.protocol,
                hostname: url.hostname,
                port: url.port,
                pathname: url.pathname,
                search: url.search,
                hash: url.hash,
                origin: url.origin
            };
        } catch {
            return null;
        }
    };

    const urlInfo = mode === 'decode' ? analyzeURL() : null;

    return (
        <div className="url-encoder">
            <div className="d-flex gap-2 mb-3">
                <Button variant="outline-secondary" size="sm" onClick={loadSample}>
                    {t('loadSample')}
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={() => {
                    setInput('');
                    setOutput('');
                    setError('');
                }}>
                    {t('clear')}
                </Button>
                <Button variant="primary" onClick={processURL}>
                    {mode === 'encode' ? 'Encode' : 'Decode'} URL
                </Button>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label">Mode</label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="mode"
                                    id="encode"
                                    checked={mode === 'encode'}
                                    onChange={() => setMode('encode')}
                                />
                                <label className="form-check-label" htmlFor="encode">
                                    Encode
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="mode"
                                    id="decode"
                                    checked={mode === 'decode'}
                                    onChange={() => setMode('decode')}
                                />
                                <label className="form-check-label" htmlFor="decode">
                                    Decode
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {mode === 'encode' && (
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Encode Type</label>
                            <select
                                className="form-select"
                                value={encodeType}
                                onChange={(e) => setEncodeType(e.target.value as 'uri' | 'component')}
                            >
                                <option value="component">encodeURIComponent (recommended)</option>
                                <option value="uri">encodeURI</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="form-group">
                <label className="form-label">
                    {mode === 'encode' ? 'Text to Encode' : 'URL to Decode'}
                </label>
                <textarea
                    className="form-control form-control-mono"
                    rows={4}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                        mode === 'encode' 
                            ? 'Enter text or URL to encode...' 
                            : 'Enter encoded URL to decode...'
                    }
                />
            </div>

            {error && (
                <Alert variant="danger">
                    ❌ {error}
                </Alert>
            )}

            {output && (
                <div className="form-group">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label">
                            {mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}
                        </label>
                        <Button variant="outline-primary" size="sm" onClick={copyToClipboard}>
                            {t('copy')}
                        </Button>
                    </div>
                    <textarea
                        className="form-control form-control-mono"
                        rows={4}
                        value={output}
                        readOnly
                        style={{ backgroundColor: 'var(--bg-tertiary)' }}
                    />
                </div>
            )}

            {urlInfo && (
                <div className="form-group">
                    <label className="form-label">URL Analysis</label>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-2"><strong>Protocol:</strong> {urlInfo.protocol}</div>
                                    <div className="mb-2"><strong>Hostname:</strong> {urlInfo.hostname}</div>
                                    <div className="mb-2"><strong>Port:</strong> {urlInfo.port || 'default'}</div>
                                    <div className="mb-2"><strong>Origin:</strong> {urlInfo.origin}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-2"><strong>Path:</strong> {urlInfo.pathname}</div>
                                    <div className="mb-2"><strong>Query:</strong> {urlInfo.search || 'none'}</div>
                                    <div className="mb-2"><strong>Fragment:</strong> {urlInfo.hash || 'none'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4 p-3 bg-light rounded">
                <h6>Encoding Differences</h6>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <strong>encodeURIComponent:</strong>
                            <ul className="list-unstyled small mt-1">
                                <li>• Encodes all special characters</li>
                                <li>• Use for URL parameters</li>
                                <li>• Encodes: <code>: / ? # [ ] @</code></li>
                                <li>• Example: <code>hello world → hello%20world</code></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <strong>encodeURI:</strong>
                            <ul className="list-unstyled small mt-1">
                                <li>• Preserves URL structure</li>
                                <li>• Use for complete URLs</li>
                                <li>• Keeps: <code>: / ? # [ ] @</code></li>
                                <li>• Example: <code>https://site.com → https://site.com</code></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}