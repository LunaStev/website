// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

export function Base64Tool() {
    const { t } = useTranslation('common');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [error, setError] = useState('');

    const handleConvert = () => {
        setError('');
        try {
            if (mode === 'encode') {
                const encoded = btoa(unescape(encodeURIComponent(input)));
                setOutput(encoded);
            } else {
                const decoded = decodeURIComponent(escape(atob(input)));
                setOutput(decoded);
            }
        } catch {
            setError('Invalid input for Base64 ' + mode);
            setOutput('');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="base64-tool">
            <div className="mb-3">
                <Form.Check
                    inline
                    type="radio"
                    label={t('encode')}
                    name="mode"
                    id="encode"
                    checked={mode === 'encode'}
                    onChange={() => setMode('encode')}
                />
                <Form.Check
                    inline
                    type="radio"
                    label={t('decode')}
                    name="mode"
                    id="decode"
                    checked={mode === 'decode'}
                    onChange={() => setMode('decode')}
                />
            </div>

            <Form.Group className="mb-3">
                <Form.Label>{t('input')}</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
                />
            </Form.Group>

            <div className="d-flex gap-2 mb-3">
                <Button variant="primary" onClick={handleConvert}>
                    {mode === 'encode' ? t('encode') : t('decode')}
                </Button>
                <Button variant="outline-secondary" onClick={() => setInput('')}>
                    {t('clear')}
                </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {output && (
                <Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <Form.Label>{t('output')}</Form.Label>
                        <Button variant="outline-primary" size="sm" onClick={handleCopy}>
                            {t('copy')}
                        </Button>
                    </div>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={output}
                        readOnly
                    />
                </Form.Group>
            )}
        </div>
    );
}