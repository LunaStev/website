// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

interface IPInfo {
    ip: string;
    hostname?: string;
    city?: string;
    region?: string;
    country?: string;
    countryCode?: string;
    timezone?: string;
    isp?: string;
    organization?: string;
    asn?: string;
    latitude?: number;
    longitude?: number;
    isPrivate: boolean;
    ipVersion: 4 | 6;
}

export function IPLookup() {
    const { t } = useTranslation('common');
    const [ip, setIp] = useState('');
    const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateIP = (ipAddress: string): { isValid: boolean; version?: 4 | 6; isPrivate?: boolean } => {
        // IPv4 validation
        const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        
        // IPv6 validation (simplified)
        const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
        
        if (ipv4Regex.test(ipAddress)) {
            const parts = ipAddress.split('.').map(Number);
            const isPrivate = 
                (parts[0] === 10) ||
                (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
                (parts[0] === 192 && parts[1] === 168) ||
                (parts[0] === 127) ||
                (parts[0] === 169 && parts[1] === 254);
            
            return { isValid: true, version: 4, isPrivate };
        }
        
        if (ipv6Regex.test(ipAddress) || ipAddress.includes('::')) {
            const isPrivate = 
                ipAddress.startsWith('::1') ||
                ipAddress.startsWith('fc') ||
                ipAddress.startsWith('fd') ||
                ipAddress.startsWith('fe80');
            
            return { isValid: true, version: 6, isPrivate };
        }
        
        return { isValid: false };
    };

    const getMyIP = async () => {
        setLoading(true);
        setError('');
        
        try {
            // Use a free IP service to get user's public IP
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            setIp(data.ip);
        } catch (err) {
            setError('Failed to get your IP address: ' + (err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const lookupIP = async () => {
        setError('');
        setIpInfo(null);
        
        if (!ip.trim()) return;
        
        const validation = validateIP(ip.trim());
        if (!validation.isValid) {
            setError('Invalid IP address format');
            return;
        }
        
        setLoading(true);
        
        try {
            const ipAddress = ip.trim();
            
            // Basic IP info from validation
            const basicInfo: IPInfo = {
                ip: ipAddress,
                isPrivate: validation.isPrivate || false,
                ipVersion: validation.version!
            };
            
            // For private IPs, don't try to fetch external data
            if (basicInfo.isPrivate) {
                setIpInfo({
                    ...basicInfo,
                    hostname: 'Private/Local network',
                    city: 'N/A (Private)',
                    country: 'N/A (Private)',
                    isp: 'Private network'
                });
                setLoading(false);
                return;
            }
            
            // Try to get IP geolocation info (using free service)
            try {
                const geoResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
                const geoData = await geoResponse.json();
                
                if (geoData.error) {
                    throw new Error(geoData.reason || 'Geolocation service error');
                }
                
                setIpInfo({
                    ...basicInfo,
                    hostname: geoData.hostname || 'Unknown',
                    city: geoData.city || 'Unknown',
                    region: geoData.region || 'Unknown',
                    country: geoData.country_name || 'Unknown',
                    countryCode: geoData.country_code || 'Unknown',
                    timezone: geoData.timezone || 'Unknown',
                    isp: geoData.org || 'Unknown',
                    organization: geoData.org || 'Unknown',
                    asn: geoData.asn || 'Unknown',
                    latitude: geoData.latitude || undefined,
                    longitude: geoData.longitude || undefined
                });
            } catch (geoError) {
                // If geolocation fails, still show basic IP info
                setIpInfo({
                    ...basicInfo,
                    hostname: 'Unable to resolve',
                    city: 'Unable to determine',
                    country: 'Unable to determine',
                    isp: 'Unable to determine'
                });
            }
        } catch (err) {
            setError('Failed to lookup IP: ' + (err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const loadSample = () => {
        const samples = [
            '8.8.8.8', // Google DNS
            '1.1.1.1', // Cloudflare DNS
            '208.67.222.222', // OpenDNS
            '9.9.9.9', // Quad9 DNS
        ];
        setIp(samples[Math.floor(Math.random() * samples.length)]);
    };

    const getIPTypeInfo = (ip: IPInfo) => {
        if (ip.isPrivate) {
            return {
                type: 'Private IP',
                description: 'This IP address is reserved for private networks and cannot be routed on the internet.',
                ranges: ip.ipVersion === 4 ? 
                    ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', '127.0.0.0/8'] :
                    ['::1/128', 'fc00::/7', 'fe80::/10']
            };
        } else {
            return {
                type: 'Public IP',
                description: 'This IP address is publicly routable on the internet.',
                ranges: []
            };
        }
    };

    const validation = ip ? validateIP(ip) : null;

    return (
        <div className="ip-lookup">
            <div className="d-flex gap-2 mb-3">
                <Button variant="outline-secondary" size="sm" onClick={getMyIP} disabled={loading}>
                    {loading ? <Spinner size="sm" /> : 'My IP'}
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={loadSample}>
                    {t('loadSample')}
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={() => {
                    setIp('');
                    setIpInfo(null);
                    setError('');
                }}>
                    {t('clear')}
                </Button>
                <Button variant="primary" onClick={lookupIP} disabled={loading || !ip.trim()}>
                    {loading ? <Spinner size="sm" /> : 'Lookup IP'}
                </Button>
            </div>

            <div className="form-group">
                <label className="form-label">IP Address</label>
                <div className="d-flex gap-2">
                    <input
                        type="text"
                        className={`form-control form-control-mono ${validation && !validation.isValid ? 'is-invalid' : ''}`}
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        placeholder="Enter IP address (e.g., 8.8.8.8 or 2001:4860:4860::8888)"
                        style={{ fontSize: '14px' }}
                    />
                </div>
                {validation && !validation.isValid && (
                    <small className="text-danger">Invalid IP address format</small>
                )}
                {validation && validation.isValid && (
                    <small className="text-muted">
                        Valid IPv{validation.version} address {validation.isPrivate ? '(Private)' : '(Public)'}
                    </small>
                )}
            </div>

            {error && (
                <Alert variant="danger">
                    ❌ {error}
                </Alert>
            )}

            {ipInfo && (
                <div className="form-group">
                    <label className="form-label">IP Information</label>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <strong>IP Address:</strong>
                                            <Button variant="outline-primary" size="sm" onClick={() => copyToClipboard(ipInfo.ip)}>
                                                {t('copy')}
                                            </Button>
                                        </div>
                                        <div className="mt-1 p-2 bg-light rounded font-monospace">{ipInfo.ip}</div>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <strong>IP Version:</strong>
                                        <div className="mt-1">
                                            <span className="badge bg-info">IPv{ipInfo.ipVersion}</span>
                                            {ipInfo.isPrivate && <span className="badge bg-warning text-dark ms-2">Private</span>}
                                        </div>
                                    </div>
                                    
                                    {ipInfo.hostname && (
                                        <div className="mb-3">
                                            <strong>Hostname:</strong>
                                            <div className="mt-1">{ipInfo.hostname}</div>
                                        </div>
                                    )}
                                    
                                    {ipInfo.isp && (
                                        <div className="mb-3">
                                            <strong>ISP/Organization:</strong>
                                            <div className="mt-1">{ipInfo.isp}</div>
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    {ipInfo.city && (
                                        <div className="mb-3">
                                            <strong>Location:</strong>
                                            <div className="mt-1">
                                                {ipInfo.city}, {ipInfo.region}
                                                <br />
                                                {ipInfo.country} ({ipInfo.countryCode})
                                            </div>
                                        </div>
                                    )}
                                    
                                    {ipInfo.timezone && (
                                        <div className="mb-3">
                                            <strong>Timezone:</strong>
                                            <div className="mt-1">{ipInfo.timezone}</div>
                                        </div>
                                    )}
                                    
                                    {ipInfo.latitude && ipInfo.longitude && (
                                        <div className="mb-3">
                                            <strong>Coordinates:</strong>
                                            <div className="mt-1">
                                                {ipInfo.latitude.toFixed(4)}, {ipInfo.longitude.toFixed(4)}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {ipInfo.asn && (
                                        <div className="mb-3">
                                            <strong>ASN:</strong>
                                            <div className="mt-1">{ipInfo.asn}</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {(() => {
                                const typeInfo = getIPTypeInfo(ipInfo);
                                return (
                                    <div className="mt-3 p-3 bg-light rounded">
                                        <h6>{typeInfo.type}</h6>
                                        <p className="small mb-2">{typeInfo.description}</p>
                                        {typeInfo.ranges.length > 0 && (
                                            <div>
                                                <strong>Private IP Ranges:</strong>
                                                <ul className="list-unstyled small mt-1">
                                                    {typeInfo.ranges.map((range, index) => (
                                                        <li key={index}>• {range}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4 p-3 bg-light rounded">
                <h6>IP Address Types</h6>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <strong>IPv4 Private Ranges:</strong>
                            <ul className="list-unstyled small mt-1">
                                <li>• <code>10.0.0.0/8</code> - Class A private</li>
                                <li>• <code>172.16.0.0/12</code> - Class B private</li>
                                <li>• <code>192.168.0.0/16</code> - Class C private</li>
                                <li>• <code>127.0.0.0/8</code> - Loopback</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <strong>IPv6 Special Ranges:</strong>
                            <ul className="list-unstyled small mt-1">
                                <li>• <code>::1/128</code> - Loopback</li>
                                <li>• <code>fc00::/7</code> - Unique local</li>
                                <li>• <code>fe80::/10</code> - Link local</li>
                                <li>• <code>::/128</code> - Unspecified</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <strong>⚠️ Privacy Note:</strong> This tool uses third-party services for geolocation data. 
                    IP lookups are logged by these services. Only lookup IPs you own or have permission to investigate.
                </div>
            </div>
        </div>
    );
}