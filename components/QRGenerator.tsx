// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export function QRGenerator() {
    const { t } = useTranslation('common');
    const [text, setText] = useState('');
    const [size, setSize] = useState(200);
    const [qrUrl, setQrUrl] = useState('');

    const generateQR = () => {
        if (!text.trim()) return;
        const encodedText = encodeURIComponent(text);
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`;
        setQrUrl(url);
    };

    const downloadQR = () => {
        if (!qrUrl) return;
        const link = document.createElement('a');
        link.href = qrUrl;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="qr-generator">
            <Form.Group className="mb-3">
                <Form.Label>Text or URL</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text or URL to generate QR code..."
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Size</Form.Label>
                <Form.Select value={size} onChange={(e) => setSize(parseInt(e.target.value))}>
                    <option value={150}>150x150</option>
                    <option value={200}>200x200</option>
                    <option value={300}>300x300</option>
                    <option value={400}>400x400</option>
                    <option value={500}>500x500</option>
                </Form.Select>
            </Form.Group>

            <div className="d-flex gap-2 mb-3">
                <Button variant="primary" onClick={generateQR} disabled={!text.trim()}>
                    {t('generate')}
                </Button>
                {qrUrl && (
                    <Button variant="outline-primary" onClick={downloadQR}>
                        {t('download')}
                    </Button>
                )}
            </div>

            {qrUrl && (
                <div className="text-center">
                    <Image src={qrUrl} alt="Generated QR Code" className="img-fluid" style={{ maxWidth: '100%', height: 'auto' }} width={400} height={400} />
                </div>
            )}
        </div>
    );
}