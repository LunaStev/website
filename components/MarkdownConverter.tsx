// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

export function MarkdownConverter() {
    const { t } = useTranslation('common');
    const [markdown, setMarkdown] = useState('# Hello World\n\nThis is **bold** text and *italic* text.\n\n## Code Example\n\n```javascript\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n```\n\n- List item 1\n- List item 2\n- List item 3\n\n[Link to Google](https://google.com)');
    const [html, setHtml] = useState('');
    const [previewMode, setPreviewMode] = useState<'html' | 'preview'>('html');

    const convertMarkdown = () => {
        // Simple markdown to HTML converter
        let result = markdown
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            
            // Bold and Italic
            .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
            
            // Code blocks
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
            
            // Inline code
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            
            // Lists
            .replace(/^\- (.*$)/gim, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            
            // Blockquotes
            .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
            
            // Horizontal rules
            .replace(/^---$/gim, '<hr>')
            
            // Line breaks (double newline becomes paragraph)
            .split('\n\n')
            .map(paragraph => {
                paragraph = paragraph.trim();
                if (paragraph && 
                    !paragraph.startsWith('<h') && 
                    !paragraph.startsWith('<ul>') && 
                    !paragraph.startsWith('<pre>') &&
                    !paragraph.startsWith('<blockquote>') &&
                    !paragraph.includes('<hr>')) {
                    return `<p>${paragraph}</p>`;
                }
                return paragraph;
            })
            .join('\n\n');

        setHtml(result);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(html);
    };

    const loadSample = () => {
        const sample = `# Markdown to HTML Converter

## Features

This converter supports:

- **Headers** (H1-H3)
- **Bold** and *italic* text
- ***Bold and italic*** combined
- \`inline code\`
- [Links](https://example.com)
- Lists (unordered)

### Code Blocks

\`\`\`javascript
function hello() {
    console.log("Hello, World!");
}
\`\`\`

### Blockquotes

> This is a blockquote
> It can span multiple lines

---

That's it! Try editing the markdown on the left.`;
        setMarkdown(sample);
    };

    return (
        <div className="markdown-converter">
            <div className="d-flex gap-2 mb-3">
                <Button variant="outline-secondary" size="sm" onClick={loadSample}>
                    {t('loadSample')}
                </Button>
                <Button variant="outline-secondary" size="sm" onClick={() => setMarkdown('')}>
                    {t('clear')}
                </Button>
                <Button variant="primary" onClick={convertMarkdown}>
                    Convert to HTML
                </Button>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="form-label">Markdown Input</label>
                        <textarea
                            className="form-control form-control-mono"
                            rows={16}
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            placeholder="Enter your markdown here..."
                            style={{ fontSize: '14px' }}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <label className="form-label">HTML Output</label>
                            <div className="d-flex gap-2">
                                <Button
                                    variant={previewMode === 'html' ? 'primary' : 'outline-secondary'}
                                    size="sm"
                                    onClick={() => setPreviewMode('html')}
                                >
                                    HTML
                                </Button>
                                <Button
                                    variant={previewMode === 'preview' ? 'primary' : 'outline-secondary'}
                                    size="sm"
                                    onClick={() => setPreviewMode('preview')}
                                >
                                    Preview
                                </Button>
                                {html && (
                                    <Button variant="outline-primary" size="sm" onClick={copyToClipboard}>
                                        {t('copy')}
                                    </Button>
                                )}
                            </div>
                        </div>

                        {previewMode === 'html' ? (
                            <textarea
                                className="form-control form-control-mono"
                                rows={16}
                                value={html}
                                readOnly
                                style={{ fontSize: '14px' }}
                            />
                        ) : (
                            <div
                                className="form-control"
                                style={{
                                    minHeight: '400px',
                                    padding: '1rem',
                                    overflow: 'auto'
                                }}
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-4 p-3 bg-light rounded">
                <h6>Supported Markdown Syntax</h6>
                <div className="row">
                    <div className="col-md-6">
                        <ul className="list-unstyled small">
                            <li><code># Header 1</code></li>
                            <li><code>## Header 2</code></li>
                            <li><code>### Header 3</code></li>
                            <li><code>**bold text**</code></li>
                            <li><code>*italic text*</code></li>
                            <li><code>`inline code`</code></li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <ul className="list-unstyled small">
                            <li><code>[link](url)</code></li>
                            <li><code>- list item</code></li>
                            <li><code>> blockquote</code></li>
                            <li><code>```code block```</code></li>
                            <li><code>---</code> (horizontal rule)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}