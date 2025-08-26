// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

interface PortResult {
    host: string;
    port: number;
    status: 'open' | 'closed' | 'filtered' | 'error';
    service?: string;
    responseTime?: number;
    error?: string;
}

interface PortScan {
    host: string;
    results: PortResult[];
    startTime: number;
    endTime?: number;
    duration?: number;
}

export function PortChecker() {
    const { t } = useTranslation('common');
    const [host, setHost] = useState('');
    const [ports, setPorts] = useState('80,443,22,21,25,53,110,993,995');
    const [scanning, setScanning] = useState(false);
    const [scanResult, setScanResult] = useState<PortScan | null>(null);
    const [error, setError] = useState('');
    const [scanMode, setScanMode] = useState<'single' | 'range' | 'common'>('common');

    // Common port services mapping
    const commonPorts: { [key: number]: string } = {
        21: 'FTP',
        22: 'SSH',
        23: 'Telnet',
        25: 'SMTP',
        53: 'DNS',
        80: 'HTTP',
        110: 'POP3',
        143: 'IMAP',
        443: 'HTTPS',
        993: 'IMAPS',
        995: 'POP3S',
        3389: 'RDP',
        5432: 'PostgreSQL',
        3306: 'MySQL',
        6379: 'Redis',
        27017: 'MongoDB',
        8080: 'HTTP Alt',
        8443: 'HTTPS Alt'
    };

    // Note: In a real browser environment, we cannot actually perform TCP port scans
    // due to browser security restrictions. This is a simulated implementation.
    const simulatePortCheck = async (hostname: string, port: number): Promise<PortResult> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
        
        // For demo purposes, simulate some open/closed ports based on common patterns
        const isCommonOpen = [80, 443, 22].includes(port);
        const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
        
        let status: 'open' | 'closed' | 'filtered' = 'closed';
        
        if (isLocalhost && [22, 80, 443, 3000, 8080].includes(port)) {
            status = 'open';
        } else if (isCommonOpen && Math.random() > 0.3) {
            status = 'open';
        } else if (Math.random() > 0.8) {
            status = 'filtered';
        }
        
        return {
            host: hostname,
            port,
            status,
            service: commonPorts[port],
            responseTime: Math.round(Math.random() * 200 + 50)
        };
    };

    const validateHost = (hostname: string): boolean => {
        // Simple hostname/IP validation
        const hostnameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        
        return hostnameRegex.test(hostname) || ipRegex.test(hostname) || hostname === 'localhost';
    };

    const parsePorts = (portsInput: string): number[] => {
        const portList: number[] = [];
        const ranges = portsInput.split(',').map(p => p.trim());
        
        for (const range of ranges) {
            if (range.includes('-')) {
                const [start, end] = range.split('-').map(p => parseInt(p.trim()));
                if (start && end && start <= end && start > 0 && end <= 65535) {
                    for (let i = start; i <= Math.min(end, start + 1000); i++) { // Limit range size
                        portList.push(i);
                    }
                }
            } else {
                const port = parseInt(range);
                if (port > 0 && port <= 65535) {
                    portList.push(port);
                }
            }
        }
        
        return [...new Set(portList)].sort((a, b) => a - b);
    };

    const scanPorts = async () => {
        setError('');
        setScanResult(null);
        
        if (!host.trim()) {
            setError('Please enter a hostname or IP address');
            return;
        }
        
        if (!validateHost(host.trim())) {
            setError('Invalid hostname or IP address');
            return;
        }
        
        let portList: number[] = [];
        
        if (scanMode === 'common') {
            portList = Object.keys(commonPorts).map(Number);
        } else {
            portList = parsePorts(ports);
        }
        
        if (portList.length === 0) {
            setError('No valid ports specified');
            return;
        }
        
        if (portList.length > 100) {
            setError('Too many ports specified (maximum 100)');
            return;
        }
        
        setScanning(true);
        const startTime = Date.now();
        
        const scan: PortScan = {
            host: host.trim(),
            results: [],
            startTime
        };
        
        try {
            // Note: Browser security limitations prevent real TCP port scanning
            // This is a simulation for demonstration purposes
            console.warn('Note: This is a simulated port scan for demonstration. Real port scanning is not possible in browsers due to security restrictions.');
            
            const promises = portList.map(port => simulatePortCheck(host.trim(), port));
            scan.results = await Promise.all(promises);
            
            scan.endTime = Date.now();
            scan.duration = scan.endTime - scan.startTime;
            
            setScanResult(scan);
        } catch (err) {
            setError('Scan failed: ' + (err as Error).message);
        } finally {
            setScanning(false);
        }
    };

    const copyResults = () => {
        if (!scanResult) return;
        
        const results = scanResult.results
            .map(r => `${r.host}:${r.port} - ${r.status.toUpperCase()}${r.service ? ` (${r.service})` : ''}`)
            .join('\n');
        
        navigator.clipboard.writeText(results);
    };

    const loadPreset = (preset: string) => {
        const presets: { [key: string]: string } = {
            web: '80,443,8080,8443',
            mail: '25,110,143,993,995',
            database: '3306,5432,6379,27017',
            remote: '22,23,3389',
            common: Object.keys(commonPorts).join(',')
        };
        
        setPorts(presets[preset] || '');
        setScanMode('single');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'text-success';
            case 'closed': return 'text-danger';
            case 'filtered': return 'text-warning';
            default: return 'text-muted';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'open': return '✅';
            case 'closed': return '❌';
            case 'filtered': return '⚠️';
            default: return '❓';
        }
    };

    return (
        <div className="port-checker">
            <div className="d-flex gap-2 mb-3 flex-wrap">
                <Button variant="outline-secondary" size="sm" onClick={() => loadPreset('web')}>
                    Web Ports
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={() => loadPreset('mail')}>
                    Mail Ports
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={() => loadPreset('database')}>
                    Database
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={() => loadPreset('remote')}>
                    Remote Access
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={() => {
                    setHost('');
                    setPorts('80,443,22,21,25,53,110,993,995');
                    setScanResult(null);
                    setError('');
                }}>
                    {t('clear')}
                </Button>
                <Button variant="primary" onClick={scanPorts} disabled={scanning || !host.trim()}>
                    {scanning ? <Spinner size="sm" /> : 'Scan Ports'}
                </Button>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label">Target Host</label>
                        <input
                            type="text"
                            className="form-control"
                            value={host}
                            onChange={(e) => setHost(e.target.value)}
                            placeholder="Enter hostname or IP (e.g., google.com, 192.168.1.1)"
                            disabled={scanning}
                        />
                        <small className="text-muted">
                            Examples: google.com, 192.168.1.1, localhost
                        </small>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label">Scan Mode</label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="scanMode"
                                    id="common"
                                    checked={scanMode === 'common'}
                                    onChange={() => setScanMode('common')}
                                    disabled={scanning}
                                />
                                <label className="form-check-label" htmlFor="common">
                                    Common Ports
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="scanMode"
                                    id="custom"
                                    checked={scanMode === 'single'}
                                    onChange={() => setScanMode('single')}
                                    disabled={scanning}
                                />
                                <label className="form-check-label" htmlFor="custom">
                                    Custom Ports
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {scanMode !== 'common' && (
                <div className="form-group">
                    <label className="form-label">Port List</label>
                    <textarea
                        className="form-control form-control-mono"
                        rows={3}
                        value={ports}
                        onChange={(e) => setPorts(e.target.value)}
                        placeholder="Enter ports separated by commas (e.g., 80,443,22) or ranges (e.g., 20-25,80,443)"
                        disabled={scanning}
                        style={{ fontSize: '14px' }}
                    />
                    <small className="text-muted">
                        Supports individual ports (80,443) and ranges (20-25). Maximum 100 ports.
                    </small>
                </div>
            )}

            {error && (
                <Alert variant="danger">
                    ❌ {error}
                </Alert>
            )}

            {scanning && (
                <div className="text-center p-4">
                    <Spinner animation="border" />
                    <div className="mt-2">Scanning ports on {host}...</div>
                </div>
            )}

            {scanResult && (
                <div className="form-group">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label">
                            Scan Results for {scanResult.host}
                        </label>
                        <Button variant="outline-primary" size="sm" onClick={copyResults}>
                            {t('copy')} Results
                        </Button>
                    </div>
                    
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-md-8">
                                    <small>
                                        Scanned {scanResult.results.length} ports in {scanResult.duration}ms
                                    </small>
                                </div>
                                <div className="col-md-4 text-end">
                                    <small>
                                        Open: {scanResult.results.filter(r => r.status === 'open').length} | 
                                        Closed: {scanResult.results.filter(r => r.status === 'closed').length} |
                                        Filtered: {scanResult.results.filter(r => r.status === 'filtered').length}
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <div className="row g-2">
                                {scanResult.results
                                    .sort((a, b) => {
                                        if (a.status === b.status) return a.port - b.port;
                                        if (a.status === 'open') return -1;
                                        if (b.status === 'open') return 1;
                                        if (a.status === 'filtered') return -1;
                                        if (b.status === 'filtered') return 1;
                                        return 0;
                                    })
                                    .map((result, index) => (
                                    <div key={index} className="col-md-6">
                                        <div className={`p-2 border rounded ${
                                            result.status === 'open' ? 'border-success bg-success bg-opacity-10' :
                                            result.status === 'filtered' ? 'border-warning bg-warning bg-opacity-10' :
                                            'border-light'
                                        }`}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <strong>{result.port}</strong>
                                                    {result.service && (
                                                        <small className="text-muted ms-2">({result.service})</small>
                                                    )}
                                                </div>
                                                <div className={`${getStatusColor(result.status)} fw-bold`}>
                                                    {getStatusIcon(result.status)} {result.status.toUpperCase()}
                                                </div>
                                            </div>
                                            {result.responseTime && (
                                                <small className="text-muted">
                                                    Response: {result.responseTime}ms
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4 p-3 bg-warning bg-opacity-10 border border-warning rounded">
                <h6>⚠️ Important Security Notice</h6>
                <p className="small mb-2">
                    <strong>Browser Limitations:</strong> This tool provides a simulated port scan for demonstration purposes only. 
                    Modern browsers prevent direct TCP port scanning due to security restrictions.
                </p>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <strong>For Real Port Scanning:</strong>
                            <ul className="list-unstyled small mt-1">
                                <li>• Use nmap: <code>nmap -p 80,443 target</code></li>
                                <li>• Use telnet: <code>telnet host port</code></li>
                                <li>• Use netcat: <code>nc -zv host port</code></li>
                                <li>• Online tools like nmap-online.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <strong>Legal Notice:</strong>
                            <ul className="list-unstyled small mt-1">
                                <li>• Only scan hosts you own or have permission to test</li>
                                <li>• Unauthorized port scanning may violate terms of service</li>
                                <li>• Some networks may detect and block scanning attempts</li>
                                <li>• Use responsibly and ethically</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 p-3 bg-light rounded">
                <h6>Common Port Services</h6>
                <div className="row">
                    <div className="col-md-6">
                        <ul className="list-unstyled small">
                            <li><strong>21:</strong> FTP (File Transfer)</li>
                            <li><strong>22:</strong> SSH (Secure Shell)</li>
                            <li><strong>25:</strong> SMTP (Email)</li>
                            <li><strong>53:</strong> DNS (Domain Names)</li>
                            <li><strong>80:</strong> HTTP (Web)</li>
                            <li><strong>110:</strong> POP3 (Email)</li>
                            <li><strong>143:</strong> IMAP (Email)</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <ul className="list-unstyled small">
                            <li><strong>443:</strong> HTTPS (Secure Web)</li>
                            <li><strong>993:</strong> IMAPS (Secure Email)</li>
                            <li><strong>995:</strong> POP3S (Secure Email)</li>
                            <li><strong>3306:</strong> MySQL Database</li>
                            <li><strong>3389:</strong> RDP (Remote Desktop)</li>
                            <li><strong>5432:</strong> PostgreSQL</li>
                            <li><strong>8080:</strong> HTTP Alternative</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}