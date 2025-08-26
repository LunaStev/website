// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

export function UnixTimestamp() {
    const { t } = useTranslation('common');
    const [timestamp, setTimestamp] = useState('');
    const [datetime, setDatetime] = useState('');
    const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));
    const [mode, setMode] = useState<'to-human' | 'to-unix'>('to-human');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Math.floor(Date.now() / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const convertFromUnix = () => {
        if (!timestamp.trim()) return;
        
        const ts = parseInt(timestamp);
        if (isNaN(ts)) return;

        // Handle both seconds and milliseconds
        const date = new Date(ts.toString().length === 10 ? ts * 1000 : ts);
        
        if (isNaN(date.getTime())) return;

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };

        setDatetime(date.toLocaleString('en-US', options));
    };

    const convertToUnix = () => {
        if (!datetime.trim()) return;

        const date = new Date(datetime);
        if (isNaN(date.getTime())) return;

        setTimestamp(Math.floor(date.getTime() / 1000).toString());
    };

    const useCurrentTime = () => {
        if (mode === 'to-human') {
            setTimestamp(currentTime.toString());
        } else {
            const now = new Date();
            setDatetime(now.toISOString().slice(0, -1));
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const getFormattedDates = (ts: number) => {
        const date = new Date(ts * 1000);
        
        return {
            iso: date.toISOString(),
            utc: date.toUTCString(),
            local: date.toLocaleString(),
            date: date.toDateString(),
            time: date.toTimeString(),
            relative: getRelativeTime(date)
        };
    };

    const getRelativeTime = (date: Date) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
        if (Math.abs(diffInSeconds) < 60) return `${Math.abs(diffInSeconds)} seconds ${diffInSeconds < 0 ? 'in the future' : 'ago'}`;
        if (Math.abs(diffInSeconds) < 3600) return `${Math.floor(Math.abs(diffInSeconds) / 60)} minutes ${diffInSeconds < 0 ? 'in the future' : 'ago'}`;
        if (Math.abs(diffInSeconds) < 86400) return `${Math.floor(Math.abs(diffInSeconds) / 3600)} hours ${diffInSeconds < 0 ? 'in the future' : 'ago'}`;
        return `${Math.floor(Math.abs(diffInSeconds) / 86400)} days ${diffInSeconds < 0 ? 'in the future' : 'ago'}`;
    };

    const parsedTimestamp = timestamp ? parseInt(timestamp) : null;
    const formattedDates = parsedTimestamp && !isNaN(parsedTimestamp) ? getFormattedDates(parsedTimestamp) : null;

    return (
        <div className="unix-timestamp">
            <div className="form-group">
                <label className="form-label">Current Unix Timestamp</label>
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                    <div className="flex-grow-1">
                        <div className="h4 mb-1 font-monospace">{currentTime}</div>
                        <small className="text-muted">{new Date().toLocaleString()}</small>
                    </div>
                    <Button variant="outline-primary" size="sm" onClick={() => copyToClipboard(currentTime.toString())}>
                        {t('copy')}
                    </Button>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Conversion Mode</label>
                <div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="mode"
                            id="to-human"
                            checked={mode === 'to-human'}
                            onChange={() => setMode('to-human')}
                        />
                        <label className="form-check-label" htmlFor="to-human">
                            Unix → Human Readable
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="mode"
                            id="to-unix"
                            checked={mode === 'to-unix'}
                            onChange={() => setMode('to-unix')}
                        />
                        <label className="form-check-label" htmlFor="to-unix">
                            Human Readable → Unix
                        </label>
                    </div>
                </div>
            </div>

            {mode === 'to-human' ? (
                <div className="form-group">
                    <label className="form-label">Unix Timestamp</label>
                    <div className="d-flex gap-2">
                        <input
                            type="text"
                            className="form-control form-control-mono"
                            value={timestamp}
                            onChange={(e) => setTimestamp(e.target.value)}
                            placeholder="1640995200 (10 digits) or 1640995200000 (13 digits)"
                        />
                        <Button variant="outline-secondary" onClick={useCurrentTime}>
                            Now
                        </Button>
                        <Button variant="primary" onClick={convertFromUnix}>
                            Convert
                        </Button>
                    </div>
                    <small className="text-muted">
                        Enter timestamp in seconds (10 digits) or milliseconds (13 digits)
                    </small>
                </div>
            ) : (
                <div className="form-group">
                    <label className="form-label">Date & Time</label>
                    <div className="d-flex gap-2">
                        <input
                            type="datetime-local"
                            className="form-control"
                            value={datetime}
                            onChange={(e) => setDatetime(e.target.value)}
                        />
                        <Button variant="outline-secondary" onClick={useCurrentTime}>
                            Now
                        </Button>
                        <Button variant="primary" onClick={convertToUnix}>
                            Convert
                        </Button>
                    </div>
                </div>
            )}

            {formattedDates && mode === 'to-human' && (
                <div className="form-group">
                    <label className="form-label">Formatted Dates</label>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <strong>ISO 8601:</strong>
                                            <Button variant="outline-primary" size="sm" onClick={() => copyToClipboard(formattedDates.iso)}>
                                                {t('copy')}
                                            </Button>
                                        </div>
                                        <code className="d-block mt-1 p-2 bg-light rounded">{formattedDates.iso}</code>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <strong>UTC:</strong>
                                            <Button variant="outline-primary" size="sm" onClick={() => copyToClipboard(formattedDates.utc)}>
                                                {t('copy')}
                                            </Button>
                                        </div>
                                        <code className="d-block mt-1 p-2 bg-light rounded">{formattedDates.utc}</code>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <strong>Local:</strong>
                                            <Button variant="outline-primary" size="sm" onClick={() => copyToClipboard(formattedDates.local)}>
                                                {t('copy')}
                                            </Button>
                                        </div>
                                        <code className="d-block mt-1 p-2 bg-light rounded">{formattedDates.local}</code>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <strong>Date:</strong>
                                            <Button variant="outline-primary" size="sm" onClick={() => copyToClipboard(formattedDates.date)}>
                                                {t('copy')}
                                            </Button>
                                        </div>
                                        <code className="d-block mt-1 p-2 bg-light rounded">{formattedDates.date}</code>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <strong>Time:</strong>
                                            <Button variant="outline-primary" size="sm" onClick={() => copyToClipboard(formattedDates.time)}>
                                                {t('copy')}
                                            </Button>
                                        </div>
                                        <code className="d-block mt-1 p-2 bg-light rounded">{formattedDates.time}</code>
                                    </div>
                                    <div className="mb-3">
                                        <strong>Relative:</strong>
                                        <div className="mt-1 p-2 bg-info text-white rounded">{formattedDates.relative}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {timestamp && mode === 'to-unix' && (
                <div className="form-group">
                    <label className="form-label">Unix Timestamp Result</label>
                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                        <div className="flex-grow-1">
                            <div className="h5 mb-0 font-monospace">{timestamp}</div>
                        </div>
                        <Button variant="outline-primary" size="sm" onClick={() => copyToClipboard(timestamp)}>
                            {t('copy')}
                        </Button>
                    </div>
                </div>
            )}

            <div className="mt-4 p-3 bg-light rounded">
                <h6>About Unix Timestamps</h6>
                <div className="row">
                    <div className="col-md-6">
                        <ul className="list-unstyled small">
                            <li><strong>10 digits:</strong> Seconds since Jan 1, 1970 UTC</li>
                            <li><strong>13 digits:</strong> Milliseconds since Jan 1, 1970 UTC</li>
                            <li><strong>Range:</strong> 1970-2038 for 32-bit systems</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <ul className="list-unstyled small">
                            <li><strong>Used in:</strong> Databases, APIs, logs</li>
                            <li><strong>Timezone:</strong> Always UTC/GMT</li>
                            <li><strong>Precision:</strong> Second or millisecond level</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}