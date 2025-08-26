// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

export function ColorConverter() {
    const { t } = useTranslation('common');
    const [hex, setHex] = useState('#FF6B6B');
    const [rgb, setRgb] = useState({ r: 255, g: 107, b: 107 });
    const [hsl, setHsl] = useState({ h: 0, s: 70, l: 71 });

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s;
        const l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };

    const hslToRgb = (h: number, s: number, l: number) => {
        h /= 360;
        s /= 100;
        l /= 100;
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    };

    const updateFromHex = (newHex: string) => {
        if (!/^#[0-9A-F]{6}$/i.test(newHex)) return;
        setHex(newHex);
        const newRgb = hexToRgb(newHex);
        if (newRgb) {
            setRgb(newRgb);
            setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
        }
    };

    const updateFromRgb = (newRgb: { r: number; g: number; b: number }) => {
        setRgb(newRgb);
        setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
        setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    };

    const updateFromHsl = (newHsl: { h: number; s: number; l: number }) => {
        setHsl(newHsl);
        const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
        setRgb(newRgb);
        setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="color-converter">
            <div className="color-preview mb-3" style={{ 
                backgroundColor: hex, 
                height: '80px', 
                borderRadius: '8px',
                border: '1px solid #ddd'
            }}></div>

            <Form.Group className="mb-3">
                <Form.Label>HEX</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        value={hex}
                        onChange={(e) => updateFromHex(e.target.value)}
                        placeholder="#FF6B6B"
                    />
                    <Button variant="outline-secondary" onClick={() => copyToClipboard(hex)}>
                        {t('copy')}
                    </Button>
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>RGB</Form.Label>
                <div className="d-flex gap-2">
                    <Form.Control
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.r}
                        onChange={(e) => updateFromRgb({ ...rgb, r: parseInt(e.target.value) || 0 })}
                    />
                    <Form.Control
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.g}
                        onChange={(e) => updateFromRgb({ ...rgb, g: parseInt(e.target.value) || 0 })}
                    />
                    <Form.Control
                        type="number"
                        min="0"
                        max="255"
                        value={rgb.b}
                        onChange={(e) => updateFromRgb({ ...rgb, b: parseInt(e.target.value) || 0 })}
                    />
                    <Button variant="outline-secondary" onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}>
                        {t('copy')}
                    </Button>
                </div>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>HSL</Form.Label>
                <div className="d-flex gap-2">
                    <Form.Control
                        type="number"
                        min="0"
                        max="360"
                        value={hsl.h}
                        onChange={(e) => updateFromHsl({ ...hsl, h: parseInt(e.target.value) || 0 })}
                    />
                    <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={hsl.s}
                        onChange={(e) => updateFromHsl({ ...hsl, s: parseInt(e.target.value) || 0 })}
                    />
                    <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={hsl.l}
                        onChange={(e) => updateFromHsl({ ...hsl, l: parseInt(e.target.value) || 0 })}
                    />
                    <Button variant="outline-secondary" onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}>
                        {t('copy')}
                    </Button>
                </div>
            </Form.Group>
        </div>
    );
}