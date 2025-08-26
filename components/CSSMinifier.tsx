// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

interface ProcessedCSS {
    original: string;
    processed: string;
    originalSize: number;
    processedSize: number;
    compressionRatio: number;
    mode: 'minify' | 'beautify';
}

export function CSSMinifier() {
    const { t } = useTranslation('common');
    const [css, setCss] = useState('');
    const [result, setResult] = useState<ProcessedCSS | null>(null);
    const [mode, setMode] = useState<'minify' | 'beautify'>('minify');
    const [error, setError] = useState('');
    const [options, setOptions] = useState({
        removeComments: true,
        removeWhitespace: true,
        shortenHex: true,
        shortenZeros: true,
        sortProperties: false
    });

    const minifyCSS = (input: string): string => {
        let result = input;
        
        // Remove comments
        if (options.removeComments) {
            result = result.replace(/\/\*[\s\S]*?\*\//g, '');
        }
        
        // Remove unnecessary whitespace
        if (options.removeWhitespace) {
            result = result
                .replace(/\s+/g, ' ') // Multiple spaces to single space
                .replace(/\s*{\s*/g, '{') // Spaces around opening braces
                .replace(/\s*}\s*/g, '}') // Spaces around closing braces
                .replace(/\s*;\s*/g, ';') // Spaces around semicolons
                .replace(/\s*:\s*/g, ':') // Spaces around colons
                .replace(/\s*,\s*/g, ',') // Spaces around commas
                .replace(/;\s*}/g, '}') // Remove last semicolon in blocks
                .trim();
        }
        
        // Shorten hex colors
        if (options.shortenHex) {
            result = result.replace(/#([0-9a-f])\1([0-9a-f])\2([0-9a-f])\3/gi, '#$1$2$3');
        }
        
        // Shorten zeros
        if (options.shortenZeros) {
            result = result
                .replace(/0px/g, '0')
                .replace(/0em/g, '0')
                .replace(/0rem/g, '0')
                .replace(/0%/g, '0')
                .replace(/0pt/g, '0')
                .replace(/0pc/g, '0')
                .replace(/0in/g, '0')
                .replace(/0mm/g, '0')
                .replace(/0cm/g, '0')
                .replace(/0ex/g, '0')
                .replace(/0ch/g, '0')
                .replace(/0vw/g, '0')
                .replace(/0vh/g, '0')
                .replace(/0vmin/g, '0')
                .replace(/0vmax/g, '0')
                .replace(/0deg/g, '0')
                .replace(/0rad/g, '0')
                .replace(/0grad/g, '0')
                .replace(/0turn/g, '0')
                .replace(/0s/g, '0')
                .replace(/0ms/g, '0')
                .replace(/0\.([0-9]+)/g, '.$1'); // 0.5 -> .5
        }
        
        return result;
    };

    const beautifyCSS = (input: string): string => {
        let result = input;
        let indentLevel = 0;
        const indent = '  '; // 2 spaces
        
        // Basic cleanup first
        result = result
            .replace(/\s+/g, ' ')
            .replace(/\s*{\s*/g, ' {\n')
            .replace(/\s*}\s*/g, '\n}\n')
            .replace(/;\s*/g, ';\n')
            .replace(/,\s*/g, ',\n')
            .trim();
        
        // Add proper indentation
        const lines = result.split('\n');
        const formattedLines = lines.map(line => {
            line = line.trim();
            if (!line) return '';
            
            if (line.includes('}')) {
                indentLevel = Math.max(0, indentLevel - 1);
            }
            
            const indentedLine = indent.repeat(indentLevel) + line;
            
            if (line.includes('{')) {
                indentLevel++;
            }
            
            return indentedLine;
        });
        
        // Sort properties within each rule if enabled
        if (options.sortProperties) {
            result = formattedLines.join('\n');
            result = result.replace(/([^{}]+)\{([^{}]+)\}/g, (match, selector, properties) => {
                const props = properties
                    .split(';')
                    .filter((prop: string) => prop.trim())
                    .map((prop: string) => prop.trim())
                    .sort()
                    .map((prop: string) => `  ${prop};`)
                    .join('\n');
                
                return `${selector.trim()} {\n${props}\n}`;
            });
            return result;
        }
        
        return formattedLines.join('\n');
    };

    const processCSS = () => {
        setError('');
        if (!css.trim()) {
            setResult(null);
            return;
        }

        try {
            const processed = mode === 'minify' ? minifyCSS(css) : beautifyCSS(css);
            const originalSize = new Blob([css]).size;
            const processedSize = new Blob([processed]).size;
            const compressionRatio = ((originalSize - processedSize) / originalSize) * 100;

            setResult({
                original: css,
                processed,
                originalSize,
                processedSize,
                compressionRatio,
                mode
            });
        } catch (err) {
            setError('Error processing CSS: ' + (err as Error).message);
        }
    };

    const copyToClipboard = () => {
        if (result) {
            navigator.clipboard.writeText(result.processed);
        }
    };

    const loadSample = () => {
        const sample = `/* Sample CSS for testing */
.header {
    background-color: #ffffff;
    padding: 20px 0px 20px 0px;
    margin: 0px;
    border: 1px solid #cccccc;
}

.nav-item {
    display: inline-block;
    margin-right: 15px;
    font-size: 16px;
}

.content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px 15px;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    color: #ffffff;
    padding: 0.5rem 1.0rem;
    border-radius: 0.25rem;
    text-decoration: none;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
    transform: translateY(-1px);
}

@media (max-width: 768px) {
    .header {
        padding: 10px 0px;
    }
    
    .nav-item {
        display: block;
        margin-bottom: 10px;
    }
}`;
        setCss(sample);
    };

    const validateCSS = (cssText: string): boolean => {
        try {
            // Basic CSS validation - check for balanced braces
            const openBraces = (cssText.match(/{/g) || []).length;
            const closeBraces = (cssText.match(/}/g) || []).length;
            return openBraces === closeBraces;
        } catch {
            return false;
        }
    };

    const isValidCSS = css ? validateCSS(css) : true;

    return (
        <div className="css-minifier">
            <div className="d-flex gap-2 mb-3">
                <Button variant="outline-secondary" size="sm" onClick={loadSample}>
                    {t('loadSample')}
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={() => {
                    setCss('');
                    setResult(null);
                    setError('');
                }}>
                    {t('clear')}
                </Button>
                <Button variant="primary" onClick={processCSS}>
                    {mode === 'minify' ? 'Minify' : 'Beautify'} CSS
                </Button>
            </div>

            <div className="row mb-3">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="form-label">Mode</label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="mode"
                                    id="minify"
                                    checked={mode === 'minify'}
                                    onChange={() => setMode('minify')}
                                />
                                <label className="form-check-label" htmlFor="minify">
                                    Minify
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="mode"
                                    id="beautify"
                                    checked={mode === 'beautify'}
                                    onChange={() => setMode('beautify')}
                                />
                                <label className="form-check-label" htmlFor="beautify">
                                    Beautify
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="form-group">
                        <label className="form-label">Options</label>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="removeComments"
                                        checked={options.removeComments}
                                        onChange={(e) => setOptions({...options, removeComments: e.target.checked})}
                                    />
                                    <label className="form-check-label" htmlFor="removeComments">
                                        Remove comments
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="removeWhitespace"
                                        checked={options.removeWhitespace}
                                        onChange={(e) => setOptions({...options, removeWhitespace: e.target.checked})}
                                    />
                                    <label className="form-check-label" htmlFor="removeWhitespace">
                                        Remove whitespace
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="shortenHex"
                                        checked={options.shortenHex}
                                        onChange={(e) => setOptions({...options, shortenHex: e.target.checked})}
                                    />
                                    <label className="form-check-label" htmlFor="shortenHex">
                                        Shorten hex colors
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="shortenZeros"
                                        checked={options.shortenZeros}
                                        onChange={(e) => setOptions({...options, shortenZeros: e.target.checked})}
                                    />
                                    <label className="form-check-label" htmlFor="shortenZeros">
                                        Shorten zero values
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="sortProperties"
                                        checked={options.sortProperties}
                                        onChange={(e) => setOptions({...options, sortProperties: e.target.checked})}
                                        disabled={mode === 'minify'}
                                    />
                                    <label className="form-check-label" htmlFor="sortProperties">
                                        Sort properties (beautify only)
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">
                    CSS Input
                    {!isValidCSS && <span className="text-danger ms-2">(Invalid CSS - unbalanced braces)</span>}
                </label>
                <textarea
                    className={`form-control form-control-mono ${!isValidCSS ? 'is-invalid' : ''}`}
                    rows={12}
                    value={css}
                    onChange={(e) => setCss(e.target.value)}
                    placeholder="Paste your CSS code here..."
                    style={{ fontSize: '13px' }}
                />
                <small className="text-muted">
                    Size: {new Blob([css]).size} bytes
                </small>
            </div>

            {error && (
                <Alert variant="danger">
                    ❌ {error}
                </Alert>
            )}

            {result && (
                <div className="form-group">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label">
                            {result.mode === 'minify' ? 'Minified' : 'Beautified'} CSS
                        </label>
                        <Button variant="outline-primary" size="sm" onClick={copyToClipboard}>
                            {t('copy')}
                        </Button>
                    </div>
                    
                    <textarea
                        className="form-control form-control-mono"
                        rows={Math.min(Math.max(result.processed.split('\n').length, 8), 20)}
                        value={result.processed}
                        readOnly
                        style={{ 
                            fontSize: '13px',
                            backgroundColor: 'var(--bg-tertiary)'
                        }}
                    />
                    
                    <div className="mt-2 p-3 bg-light rounded">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-2">
                                    <strong>Original Size:</strong> {result.originalSize} bytes
                                </div>
                                <div className="mb-2">
                                    <strong>Processed Size:</strong> {result.processedSize} bytes
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-2">
                                    <strong>Size Change:</strong> {' '}
                                    <span className={result.compressionRatio > 0 ? 'text-success' : 'text-warning'}>
                                        {result.compressionRatio > 0 ? '-' : '+'}{Math.abs(result.compressionRatio).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <strong>Mode:</strong> {result.mode === 'minify' ? 'Minification' : 'Beautification'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4 p-3 bg-light rounded">
                <h6>CSS Processing Features</h6>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <strong>Minification:</strong>
                            <ul className="list-unstyled small mt-1">
                                <li>• Removes comments and unnecessary whitespace</li>
                                <li>• Shortens hex colors (#ffffff → #fff)</li>
                                <li>• Removes units from zero values (0px → 0)</li>
                                <li>• Optimizes decimal values (0.5 → .5)</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <strong>Beautification:</strong>
                            <ul className="list-unstyled small mt-1">
                                <li>• Adds proper indentation and spacing</li>
                                <li>• Formats selectors and properties</li>
                                <li>• Optional property sorting</li>
                                <li>• Improves code readability</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <strong>💡 Tip:</strong> Use minified CSS in production to reduce file sizes and improve load times. Use beautified CSS during development for better readability.
                </div>
            </div>
        </div>
    );
}