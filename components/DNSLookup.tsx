// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

interface DNSRecord {
    name: string;
    type: string;
    value: string;
    ttl?: number;
    priority?: number;
}

interface DNSResult {
    domain: string;
    records: DNSRecord[];
    queryTime: number;
    server?: string;
    error?: string;
}

export function DNSLookup() {
    const { t } = useTranslation('common');
    const [domain, setDomain] = useState('');
    const [recordType, setRecordType] = useState('A');
    const [dnsServer, setDnsServer] = useState('8.8.8.8');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<DNSResult[]>([]);
    const [error, setError] = useState('');

    const recordTypes = [
        { value: 'A', label: 'A - IPv4 Address' },
        { value: 'AAAA', label: 'AAAA - IPv6 Address' },
        { value: 'CNAME', label: 'CNAME - Canonical Name' },
        { value: 'MX', label: 'MX - Mail Exchange' },
        { value: 'NS', label: 'NS - Name Server' },
        { value: 'TXT', label: 'TXT - Text Records' },
        { value: 'SOA', label: 'SOA - Start of Authority' },
        { value: 'PTR', label: 'PTR - Pointer (Reverse)' },
        { value: 'SRV', label: 'SRV - Service' },
        { value: 'ALL', label: 'ALL - All Records' }
    ];

    const dnsServers = [
        { value: '8.8.8.8', label: 'Google DNS (8.8.8.8)' },
        { value: '8.8.4.4', label: 'Google DNS (8.8.4.4)' },
        { value: '1.1.1.1', label: 'Cloudflare (1.1.1.1)' },
        { value: '1.0.0.1', label: 'Cloudflare (1.0.0.1)' },
        { value: '208.67.222.222', label: 'OpenDNS (208.67.222.222)' },
        { value: '208.67.220.220', label: 'OpenDNS (208.67.220.220)' },
        { value: '9.9.9.9', label: 'Quad9 (9.9.9.9)' }
    ];

    const validateDomain = (domainName: string): boolean => {
        const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return domainRegex.test(domainName) && domainName.length <= 253;
    };

    // Simulate DNS lookup (browser limitations prevent real DNS queries)
    const simulateDNSLookup = async (domainName: string, type: string): Promise<DNSRecord[]> => {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
        
        const records: DNSRecord[] = [];
        
        // Simulate common records based on domain and type
        if (type === 'A' || type === 'ALL') {
            if (domainName.includes('google')) {
                records.push({ name: domainName, type: 'A', value: '142.250.191.14', ttl: 300 });
                records.push({ name: domainName, type: 'A', value: '142.250.191.46', ttl: 300 });
            } else if (domainName.includes('github')) {
                records.push({ name: domainName, type: 'A', value: '140.82.121.4', ttl: 60 });
            } else {
                records.push({ name: domainName, type: 'A', value: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`, ttl: 300 });
            }
        }
        
        if (type === 'AAAA' || type === 'ALL') {
            if (domainName.includes('google')) {
                records.push({ name: domainName, type: 'AAAA', value: '2607:f8b0:4004:c1b::65', ttl: 300 });
            }
        }
        
        if (type === 'MX' || type === 'ALL') {
            if (domainName.includes('gmail') || domainName.includes('google')) {
                records.push({ name: domainName, type: 'MX', value: 'alt1.gmail-smtp-in.l.google.com', ttl: 3600, priority: 5 });
                records.push({ name: domainName, type: 'MX', value: 'gmail-smtp-in.l.google.com', ttl: 3600, priority: 1 });
            } else {
                records.push({ name: domainName, type: 'MX', value: `mail.${domainName}`, ttl: 3600, priority: 10 });
            }
        }
        
        if (type === 'NS' || type === 'ALL') {
            records.push({ name: domainName, type: 'NS', value: `ns1.${domainName.split('.').slice(-2).join('.')}.`, ttl: 86400 });
            records.push({ name: domainName, type: 'NS', value: `ns2.${domainName.split('.').slice(-2).join('.')}.`, ttl: 86400 });
        }
        
        if (type === 'TXT' || type === 'ALL') {
            records.push({ name: domainName, type: 'TXT', value: 'v=spf1 include:_spf.google.com ~all', ttl: 300 });
            if (domainName.includes('google')) {
                records.push({ name: domainName, type: 'TXT', value: 'google-site-verification=example123', ttl: 300 });
            }
        }
        
        if (type === 'CNAME') {
            if (domainName.startsWith('www.')) {
                records.push({ name: domainName, type: 'CNAME', value: domainName.substring(4), ttl: 300 });
            }
        }
        
        if (type === 'SOA' || type === 'ALL') {
            const rootDomain = domainName.split('.').slice(-2).join('.');
            records.push({ 
                name: domainName, 
                type: 'SOA', 
                value: `ns1.${rootDomain}. admin.${rootDomain}. 2024012601 10800 3600 604800 86400`, 
                ttl: 86400 
            });
        }
        
        return records;
    };

    const performLookup = async () => {
        setError('');
        setLoading(true);
        
        if (!domain.trim()) {
            setError('Please enter a domain name');
            setLoading(false);
            return;
        }
        
        if (!validateDomain(domain.trim())) {
            setError('Invalid domain name format');
            setLoading(false);
            return;
        }
        
        const startTime = Date.now();
        
        try {
            // Note: Browser limitations prevent real DNS queries
            console.warn('Note: This is a simulated DNS lookup for demonstration. Real DNS queries are not possible in browsers due to security restrictions.');
            
            const records = await simulateDNSLookup(domain.trim().toLowerCase(), recordType);
            const queryTime = Date.now() - startTime;
            
            const result: DNSResult = {
                domain: domain.trim().toLowerCase(),
                records,
                queryTime,
                server: dnsServer
            };
            
            setResults([result, ...results.slice(0, 4)]); // Keep last 5 results
        } catch (err) {
            setError('DNS lookup failed: ' + (err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const copyRecord = (record: DNSRecord) => {
        const text = `${record.name} ${record.ttl ? record.ttl : ''} IN ${record.type} ${record.priority ? record.priority + ' ' : ''}${record.value}`;
        navigator.clipboard.writeText(text);
    };

    const copyAllRecords = (result: DNSResult) => {
        const text = result.records
            .map(r => `${r.name} ${r.ttl ? r.ttl : ''} IN ${r.type} ${r.priority ? r.priority + ' ' : ''}${r.value}`)
            .join('\n');
        navigator.clipboard.writeText(text);
    };

    const loadSample = () => {
        const samples = ['google.com', 'github.com', 'stackoverflow.com', 'amazon.com', 'microsoft.com'];
        setDomain(samples[Math.floor(Math.random() * samples.length)]);
    };

    const getRecordTypeDescription = (type: string): string => {
        const descriptions: { [key: string]: string } = {
            'A': 'Maps domain to IPv4 address',
            'AAAA': 'Maps domain to IPv6 address',
            'CNAME': 'Canonical name (alias) for another domain',
            'MX': 'Mail exchange server for email delivery',
            'NS': 'Authoritative name servers for the domain',
            'TXT': 'Text records for various purposes (SPF, DKIM, etc.)',
            'SOA': 'Start of Authority record with zone information',
            'PTR': 'Reverse DNS lookup (IP to domain)',
            'SRV': 'Service discovery records',
        };
        return descriptions[type] || 'DNS record type';
    };

    return (
        <div className="dns-lookup">
            <div className="d-flex gap-2 mb-3 flex-wrap">
                <Button variant="outline-secondary" size="sm" onClick={loadSample}>
                    {t('loadSample')}
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={() => {
                    setDomain('');
                    setResults([]);
                    setError('');
                }}>
                    {t('clear')}
                </Button>
                <Button variant="primary" onClick={performLookup} disabled={loading || !domain.trim()}>
                    {loading ? <Spinner size="sm" /> : 'Lookup DNS'}
                </Button>
            </div>

            <div className="row mb-3">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="form-label">Domain Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            placeholder="Enter domain name (e.g., google.com)"
                            disabled={loading}
                            onKeyPress={(e) => e.key === 'Enter' && performLookup()}
                        />
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group">
                        <label className="form-label">Record Type</label>
                        <select
                            className="form-select"
                            value={recordType}
                            onChange={(e) => setRecordType(e.target.value)}
                            disabled={loading}
                        >
                            {recordTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                        <small className="text-muted">
                            {getRecordTypeDescription(recordType)}
                        </small>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group">
                        <label className="form-label">DNS Server</label>
                        <select
                            className="form-select"
                            value={dnsServer}
                            onChange={(e) => setDnsServer(e.target.value)}
                            disabled={loading}
                        >
                            {dnsServers.map(server => (
                                <option key={server.value} value={server.value}>
                                    {server.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {error && (
                <Alert variant="danger">
                    ❌ {error}
                </Alert>
            )}

            {loading && (
                <div className="text-center p-4">
                    <Spinner animation="border" />
                    <div className="mt-2">Looking up DNS records for {domain}...</div>
                </div>
            )}

            {results.map((result, resultIndex) => (
                <div key={resultIndex} className="form-group">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label">
                            DNS Records for {result.domain}
                        </label>
                        <div className="d-flex gap-2">
                            <small className="text-muted align-self-center">
                                Query time: {result.queryTime}ms via {result.server}
                            </small>
                            <Button variant="outline-primary" size="sm" onClick={() => copyAllRecords(result)}>
                                {t('copy')} All
                            </Button>
                        </div>
                    </div>
                    
                    <div className="card">
                        <div className="card-body p-0">
                            {result.records.length === 0 ? (
                                <div className="p-3 text-center text-muted">
                                    No {recordType} records found for {result.domain}
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-sm mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Name</th>
                                                <th>Type</th>
                                                <th>Value</th>
                                                <th>TTL</th>
                                                <th>Priority</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.records.map((record, index) => (
                                                <tr key={index}>
                                                    <td className="font-monospace text-break" style={{ fontSize: '12px' }}>
                                                        {record.name}
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-info">{record.type}</span>
                                                    </td>
                                                    <td className="font-monospace text-break" style={{ fontSize: '12px' }}>
                                                        {record.value}
                                                    </td>
                                                    <td className="text-muted small">
                                                        {record.ttl ? `${record.ttl}s` : '-'}
                                                    </td>
                                                    <td className="text-muted small">
                                                        {record.priority || '-'}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            onClick={() => copyRecord(record)}
                                                        >
                                                            Copy
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            <div className="mt-4 p-3 bg-warning bg-opacity-10 border border-warning rounded">
                <h6>⚠️ Browser Limitation Notice</h6>
                <p className="small mb-2">
                    This tool provides simulated DNS lookups for demonstration purposes. 
                    Browsers cannot perform direct DNS queries due to security restrictions.
                </p>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <strong>For Real DNS Lookups:</strong>
                            <ul className="list-unstyled small mt-1">
                                <li>• Command line: <code>nslookup domain</code></li>
                                <li>• Command line: <code>dig domain A</code></li>
                                <li>• Online tools: DNS checker websites</li>
                                <li>• Network utilities and apps</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <strong>DNS Record Types:</strong>
                            <ul className="list-unstyled small mt-1">
                                <li>• <strong>A:</strong> IPv4 addresses</li>
                                <li>• <strong>AAAA:</strong> IPv6 addresses</li>
                                <li>• <strong>MX:</strong> Email servers</li>
                                <li>• <strong>TXT:</strong> Text/configuration data</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 p-3 bg-light rounded">
                <h6>DNS Record Types Reference</h6>
                <div className="row">
                    <div className="col-md-6">
                        <ul className="list-unstyled small">
                            <li><strong>A:</strong> Maps domain to IPv4 address (e.g., 192.168.1.1)</li>
                            <li><strong>AAAA:</strong> Maps domain to IPv6 address</li>
                            <li><strong>CNAME:</strong> Canonical name alias to another domain</li>
                            <li><strong>MX:</strong> Mail exchange servers with priority</li>
                            <li><strong>NS:</strong> Authoritative name servers for domain</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <ul className="list-unstyled small">
                            <li><strong>TXT:</strong> Text records (SPF, DKIM, site verification)</li>
                            <li><strong>SOA:</strong> Start of Authority zone information</li>
                            <li><strong>PTR:</strong> Reverse DNS (IP to domain name)</li>
                            <li><strong>SRV:</strong> Service discovery records</li>
                            <li><strong>TTL:</strong> Time To Live (cache duration in seconds)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}