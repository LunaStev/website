// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

interface JWTHeader {
    alg?: string;
    typ?: string;
    [key: string]: unknown;
}

interface JWTPayloadData {
    iss?: string; // issuer
    aud?: string; // audience
    exp?: number;
    iat?: number;
    nbf?: number;
    [key: string]: unknown;
}

interface JWTPayload {
    header: JWTHeader;
    payload: JWTPayloadData;
    signature: string;
    isExpired: boolean;
    expiresAt?: string;
    issuedAt?: string;
    notBefore?: string;
}

export function JWTDecoder() {
    const { t } = useTranslation('common');
    const [jwt, setJwt] = useState('');
    const [decoded, setDecoded] = useState<JWTPayload | null>(null);
    const [error, setError] = useState('');

    const decodeJWT = () => {
        setError('');
        setDecoded(null);

        if (!jwt.trim()) {
            return;
        }

        try {
            const parts = jwt.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT format. JWT must have 3 parts separated by dots.');
            }

            const [headerB64, payloadB64, signature] = parts;

            // Decode header
            const header = JSON.parse(atob(headerB64.replace(/-/g, '+').replace(/_/g, '/')));
            
            // Decode payload
            const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));

            // Check expiration
            const now = Math.floor(Date.now() / 1000);
            const isExpired = payload.exp ? payload.exp < now : false;

            // Format dates
            const expiresAt = payload.exp ? new Date(payload.exp * 1000).toLocaleString() : undefined;
            const issuedAt = payload.iat ? new Date(payload.iat * 1000).toLocaleString() : undefined;
            const notBefore = payload.nbf ? new Date(payload.nbf * 1000).toLocaleString() : undefined;

            setDecoded({
                header,
                payload,
                signature,
                isExpired,
                expiresAt,
                issuedAt,
                notBefore
            });

        } catch (err) {
            setError('Failed to decode JWT: ' + (err as Error).message);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const loadSample = () => {
        // Sample JWT token (expired)
        const sampleJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        setJwt(sampleJWT);
    };

    const formatJSON = (obj: Record<string, unknown>) => {
        return JSON.stringify(obj, null, 2);
    };

    const getAlgorithmInfo = (alg: string) => {
        const algorithms: { [key: string]: string } = {
            'HS256': 'HMAC using SHA-256',
            'HS384': 'HMAC using SHA-384',
            'HS512': 'HMAC using SHA-512',
            'RS256': 'RSA using SHA-256',
            'RS384': 'RSA using SHA-384',
            'RS512': 'RSA using SHA-512',
            'PS256': 'RSA-PSS using SHA-256',
            'PS384': 'RSA-PSS using SHA-384',
            'PS512': 'RSA-PSS using SHA-512',
            'ES256': 'ECDSA using P-256 and SHA-256',
            'ES384': 'ECDSA using P-384 and SHA-384',
            'ES512': 'ECDSA using P-521 and SHA-512'
        };
        return algorithms[alg] || 'Unknown algorithm';
    };

    return (
        <div className="jwt-decoder">
            <div className="d-flex gap-2 mb-3">
                <Button variant="outline-secondary" size="sm" onClick={loadSample}>
                    {t('loadSample')}
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={() => {
                    setJwt('');
                    setDecoded(null);
                    setError('');
                }}>
                    {t('clear')}
                </Button>
                <Button variant="primary" onClick={decodeJWT}>
                    Decode JWT
                </Button>
            </div>

            <div className="form-group">
                <label className="form-label">JWT Token</label>
                <textarea
                    className="form-control form-control-mono"
                    rows={6}
                    value={jwt}
                    onChange={(e) => setJwt(e.target.value)}
                    placeholder="Paste your JWT token here..."
                    style={{ fontSize: '12px', wordBreak: 'break-all' }}
                />
            </div>

            {error && (
                <Alert variant="danger">
                    ❌ {error}
                </Alert>
            )}

            {decoded && (
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <label className="form-label">Header</label>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => copyToClipboard(formatJSON(decoded.header))}
                                >
                                    {t('copy')}
                                </Button>
                            </div>
                            <textarea
                                className="form-control form-control-mono"
                                rows={8}
                                value={formatJSON(decoded.header)}
                                readOnly
                                style={{ backgroundColor: 'var(--bg-tertiary)', fontSize: '12px' }}
                            />
                            {decoded.header.alg && typeof decoded.header.alg === 'string' && (
                                <small className="text-muted mt-1 d-block">
                                    Algorithm: {getAlgorithmInfo(decoded.header.alg)}
                                </small>
                            )}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <label className="form-label">Payload</label>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => copyToClipboard(formatJSON(decoded.payload))}
                                >
                                    {t('copy')}
                                </Button>
                            </div>
                            <textarea
                                className="form-control form-control-mono"
                                rows={8}
                                value={formatJSON(decoded.payload)}
                                readOnly
                                style={{ backgroundColor: 'var(--bg-tertiary)', fontSize: '12px' }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {decoded && (
                <div className="mt-4">
                    <h6>Token Information</h6>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <strong>Status:</strong> 
                                        {decoded.isExpired ? (
                                            <span className="text-danger ms-2">Expired</span>
                                        ) : (
                                            <span className="text-success ms-2">Valid</span>
                                        )}
                                    </div>
                                    {decoded.issuedAt && (
                                        <div className="mb-2">
                                            <strong>Issued At:</strong> {decoded.issuedAt}
                                        </div>
                                    )}
                                    {decoded.expiresAt && (
                                        <div className="mb-2">
                                            <strong>Expires At:</strong> 
                                            <span className={decoded.isExpired ? 'text-danger' : 'text-success'}>
                                                {' '}{decoded.expiresAt}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    {decoded.notBefore && (
                                        <div className="mb-2">
                                            <strong>Not Before:</strong> {decoded.notBefore}
                                        </div>
                                    )}
                                    {decoded.payload.iss && typeof decoded.payload.iss === 'string' && (
                                        <div className="mb-2">
                                            <strong>Issuer:</strong> {decoded.payload.iss}
                                        </div>
                                    )}
                                    {decoded.payload.aud && typeof decoded.payload.aud === 'string' && (
                                        <div className="mb-2">
                                            <strong>Audience:</strong> {decoded.payload.aud}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-3">
                                <strong>Signature:</strong>
                                <div className="form-control form-control-mono mt-1" style={{ 
                                    fontSize: '12px', 
                                    wordBreak: 'break-all',
                                    backgroundColor: 'var(--bg-tertiary)'
                                }}>
                                    {decoded.signature}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4 p-3 bg-light rounded">
                <h6>JWT Structure</h6>
                <p className="small mb-2">
                    JWT (JSON Web Token) consists of three parts separated by dots (.):
                </p>
                <div className="row">
                    <div className="col-md-4">
                        <div className="text-center">
                            <code className="d-block p-2 bg-warning text-dark rounded">Header</code>
                            <small>Algorithm & token type</small>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-center">
                            <code className="d-block p-2 bg-info text-white rounded">Payload</code>
                            <small>Claims & data</small>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-center">
                            <code className="d-block p-2 bg-success text-white rounded">Signature</code>
                            <small>Verification</small>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <strong>⚠️ Security Note:</strong> This tool only decodes JWT tokens. It does not verify signatures. 
                    Never trust decoded data without proper signature verification on the server side.
                </div>
            </div>
        </div>
    );
}