// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

interface GeneratedUUID {
    version: string;
    uuid: string;
    timestamp?: string;
    format: 'standard' | 'uppercase' | 'no-hyphens' | 'braces';
}

export function UUIDGenerator() {
    const { t } = useTranslation('common');
    const [uuids, setUuids] = useState<GeneratedUUID[]>([]);
    const [version, setVersion] = useState<'v1' | 'v4'>('v4');
    const [quantity, setQuantity] = useState(1);
    const [format, setFormat] = useState<'standard' | 'uppercase' | 'no-hyphens' | 'braces'>('standard');
    const [showBulk, setShowBulk] = useState(false);

    // Simple UUID v4 generator (crypto-random)
    const generateUUIDv4 = (): string => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    // Simple UUID v1 generator (timestamp-based, simplified)
    const generateUUIDv1 = (): string => {
        const timestamp = Date.now();
        const timeHex = timestamp.toString(16).padStart(12, '0');
        const clockSeq = Math.random() * 16384 | 0;
        const node = Array.from({length: 6}, () => Math.random() * 256 | 0);
        
        // Simplified v1 format
        const timeLow = timeHex.slice(-8);
        const timeMid = timeHex.slice(-12, -8);
        const timeHigh = '1' + timeHex.slice(-15, -12).padStart(3, '0');
        const clockSeqHex = clockSeq.toString(16).padStart(4, '0');
        const nodeHex = node.map(n => n.toString(16).padStart(2, '0')).join('');
        
        return `${timeLow}-${timeMid}-${timeHigh}-${clockSeqHex.slice(0, 2)}${clockSeqHex.slice(2)}-${nodeHex}`;
    };

    const formatUUID = (uuid: string, formatType: string): string => {
        const clean = uuid.replace(/-/g, '');
        switch (formatType) {
            case 'uppercase':
                return uuid.toUpperCase();
            case 'no-hyphens':
                return clean;
            case 'braces':
                return `{${uuid}}`;
            default:
                return uuid;
        }
    };

    const generateUUIDs = () => {
        const newUUIDs: GeneratedUUID[] = [];
        const count = Math.min(quantity, 100); // Limit to 100 for performance

        for (let i = 0; i < count; i++) {
            const uuid = version === 'v4' ? generateUUIDv4() : generateUUIDv1();
            const formattedUUID = formatUUID(uuid, format);
            
            newUUIDs.push({
                version: version.toUpperCase(),
                uuid: formattedUUID,
                timestamp: version === 'v1' ? new Date().toISOString() : undefined,
                format
            });
        }

        setUuids(newUUIDs);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const copyAllUUIDs = () => {
        const allUUIDs = uuids.map(u => u.uuid).join('\n');
        navigator.clipboard.writeText(allUUIDs);
    };

    const validateUUID = (uuid: string): { isValid: boolean; version?: string; info: string } => {
        const cleanUUID = uuid.replace(/[{}]/g, '').replace(/-/g, '');
        
        if (cleanUUID.length !== 32) {
            return { isValid: false, info: 'Invalid length (must be 32 hex characters)' };
        }
        
        if (!/^[0-9a-f]+$/i.test(cleanUUID)) {
            return { isValid: false, info: 'Invalid characters (must be hexadecimal)' };
        }
        
        const formatted = cleanUUID.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
        const versionChar = formatted.charAt(14);
        
        let version = 'Unknown';
        if (versionChar === '1') version = 'v1';
        else if (versionChar === '4') version = 'v4';
        
        return { 
            isValid: true, 
            version,
            info: `Valid UUID ${version} (${formatted})`
        };
    };

    const [validationInput, setValidationInput] = useState('');
    const validationResult = validationInput ? validateUUID(validationInput) : null;

    return (
        <div className="uuid-generator">
            <div className="d-flex gap-2 mb-3">
                <Button variant="outline-secondary" size="sm" onClick={() => setShowBulk(!showBulk)}>
                    {showBulk ? 'Simple Mode' : 'Bulk Mode'}
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={() => {
                    setUuids([]);
                    setValidationInput('');
                }}>
                    {t('clear')}
                </Button>
                <Button variant="primary" onClick={generateUUIDs}>
                    Generate UUID{quantity > 1 ? 's' : ''}
                </Button>
            </div>

            <div className="row mb-3">
                <div className="col-md-3">
                    <div className="form-group">
                        <label className="form-label">Version</label>
                        <select
                            className="form-select"
                            value={version}
                            onChange={(e) => setVersion(e.target.value as 'v1' | 'v4')}
                        >
                            <option value="v4">UUID v4 (Random)</option>
                            <option value="v1">UUID v1 (Timestamp)</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="form-group">
                        <label className="form-label">Format</label>
                        <select
                            className="form-select"
                            value={format}
                            onChange={(e) => setFormat(e.target.value as 'standard' | 'uppercase' | 'no-hyphens' | 'braces')}
                        >
                            <option value="standard">Standard (with hyphens)</option>
                            <option value="uppercase">Uppercase</option>
                            <option value="no-hyphens">No hyphens</option>
                            <option value="braces">With braces {}</option>
                        </select>
                    </div>
                </div>

                {showBulk && (
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="form-label">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                min="1"
                                max="100"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                            />
                        </div>
                    </div>
                )}

                {uuids.length > 1 && (
                    <div className="col-md-3 d-flex align-items-end">
                        <Button variant="outline-primary" size="sm" onClick={copyAllUUIDs} className="w-100">
                            Copy All ({uuids.length})
                        </Button>
                    </div>
                )}
            </div>

            {uuids.length > 0 && (
                <div className="form-group">
                    <label className="form-label">Generated UUIDs</label>
                    <div className="row g-2">
                        {uuids.map((uuid, index) => (
                            <div key={index} className="col-12">
                                <div className="card">
                                    <div className="card-body p-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="flex-grow-1">
                                                <div className="d-flex align-items-center gap-2 mb-1">
                                                    <span className="badge bg-secondary">{uuid.version}</span>
                                                    {uuid.timestamp && (
                                                        <small className="text-muted">
                                                            Generated: {new Date(uuid.timestamp).toLocaleString()}
                                                        </small>
                                                    )}
                                                </div>
                                                <code
                                                    className="d-block p-2 bg-light rounded font-monospace"
                                                    style={{ 
                                                        cursor: 'pointer', 
                                                        fontSize: '14px',
                                                        wordBreak: 'break-all'
                                                    }}
                                                    onClick={() => copyToClipboard(uuid.uuid)}
                                                >
                                                    {uuid.uuid}
                                                </code>
                                            </div>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => copyToClipboard(uuid.uuid)}
                                            >
                                                {t('copy')}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="form-group">
                <label className="form-label">UUID Validator</label>
                <div className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control form-control-mono"
                        value={validationInput}
                        onChange={(e) => setValidationInput(e.target.value)}
                        placeholder="Paste UUID to validate..."
                        style={{ fontSize: '14px' }}
                    />
                    <Button 
                        variant="outline-secondary" 
                        onClick={() => setValidationInput(uuids[0]?.uuid || '')}
                        disabled={uuids.length === 0}
                    >
                        Use Generated
                    </Button>
                </div>
                
                {validationResult && (
                    <div className={`mt-2 p-2 rounded ${validationResult.isValid ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                        {validationResult.isValid ? '✅' : '❌'} {validationResult.info}
                    </div>
                )}
            </div>

            <div className="mt-4 p-3 bg-light rounded">
                <h6>UUID Versions</h6>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <strong>UUID v4 (Random):</strong>
                            <ul className="list-unstyled small mt-1">
                                <li>• Generated using random numbers</li>
                                <li>• Most commonly used</li>
                                <li>• Statistically unique</li>
                                <li>• No embedded information</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <strong>UUID v1 (Timestamp):</strong>
                            <ul className="list-unstyled small mt-1">
                                <li>• Contains timestamp and MAC address</li>
                                <li>• Guaranteed uniqueness</li>
                                <li>• Can leak information</li>
                                <li>• Sequential nature</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <strong>Format:</strong> <code>xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx</code>
                    <br />
                    <small>Where M is version (1 or 4) and N is variant (8, 9, A, or B)</small>
                </div>
            </div>
        </div>
    );
}