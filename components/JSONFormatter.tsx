// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

export function JSONFormatter() {
    const { t } = useTranslation('common');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const formatJSON = () => {
        setError('');
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            setOutput(formatted);
            setIsValid(true);
        } catch (err) {
            setError('Invalid JSON: ' + (err as Error).message);
            setOutput('');
            setIsValid(false);
        }
    };

    const minifyJSON = () => {
        setError('');
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
            setIsValid(true);
        } catch (err) {
            setError('Invalid JSON: ' + (err as Error).message);
            setOutput('');
            setIsValid(false);
        }
    };

    const validateJSON = () => {
        setError('');
        setOutput('');
        try {
            JSON.parse(input);
            setIsValid(true);
        } catch (err) {
            setError('Invalid JSON: ' + (err as Error).message);
            setIsValid(false);
        }
    };

    const copyToClipboard = () => {
        if (output) {
            navigator.clipboard.writeText(output);
        }
    };

    const clearAll = () => {
        setInput('');
        setOutput('');
        setError('');
        setIsValid(null);
    };

    const loadSample = () => {
        const sampleJSON = {
            "name": "John Doe",
            "age": 30,
            "email": "john@example.com",
            "address": {
                "street": "123 Main St",
                "city": "Anytown",
                "zipCode": "12345"
            },
            "hobbies": ["reading", "coding", "hiking"],
            "isActive": true
        };
        setInput(JSON.stringify(sampleJSON, null, 2));
    };

    return (
        <div className="json-formatter">
            <div className="d-flex gap-2 mb-3">
                <Button variant="outline-secondary" size="sm" onClick={loadSample}>
                    {t('loadSample')}
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={clearAll}>
                    {t('clearAll')}
                </Button>
            </div>

            <Form.Group className="mb-3">
                <Form.Label>JSON Input</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={8}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your JSON here..."
                    style={{ fontFamily: 'monospace' }}
                />
            </Form.Group>

            <div className="d-flex gap-2 mb-3">
                <Button variant="primary" onClick={formatJSON} disabled={!input.trim()}>
                    {t('format')}
                </Button>
                <Button variant="secondary" onClick={minifyJSON} disabled={!input.trim()}>
                    {t('minify')}
                </Button>
                <Button variant="info" onClick={validateJSON} disabled={!input.trim()}>
                    {t('validate')}
                </Button>
            </div>

            {isValid === true && !error && (
                <Alert variant="success">
                    ✅ {t('validJson')}
                </Alert>
            )}

            {isValid === false && (
                <Alert variant="danger">
                    ❌ {t('invalidJson')}: {error}
                </Alert>
            )}

            {output && (
                <Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <Form.Label>Formatted Output</Form.Label>
                        <Button variant="outline-primary" size="sm" onClick={copyToClipboard}>
                            {t('copy')}
                        </Button>
                    </div>
                    <Form.Control
                        as="textarea"
                        rows={8}
                        value={output}
                        readOnly
                        style={{ fontFamily: 'monospace' }}
                    />
                </Form.Group>
            )}
        </div>
    );
}