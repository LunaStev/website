// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';

export function ImageResizer() {
    const { t } = useTranslation('common');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [width, setWidth] = useState<number>(800);
    const [height, setHeight] = useState<number>(600);
    const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
    const [originalDimensions, setOriginalDimensions] = useState<{width: number, height: number} | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                setOriginalDimensions({ width: img.width, height: img.height });
                setWidth(img.width);
                setHeight(img.height);
                setPreview(e.target?.result as string);
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    const handleWidthChange = (newWidth: number) => {
        setWidth(newWidth);
        if (maintainAspectRatio && originalDimensions) {
            const aspectRatio = originalDimensions.height / originalDimensions.width;
            setHeight(Math.round(newWidth * aspectRatio));
        }
    };

    const handleHeightChange = (newHeight: number) => {
        setHeight(newHeight);
        if (maintainAspectRatio && originalDimensions) {
            const aspectRatio = originalDimensions.width / originalDimensions.height;
            setWidth(Math.round(newHeight * aspectRatio));
        }
    };

    const resizeImage = () => {
        if (!selectedFile || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.onload = () => {
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            
            canvas.toBlob((blob) => {
                if (!blob) return;
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `resized_${selectedFile.name}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            }, selectedFile.type);
        };
        img.src = preview;
    };

    return (
        <div className="image-resizer">
            <Form.Group className="mb-3">
                <Form.Label>Select Image</Form.Label>
                <Form.Control
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileSelect}
                />
            </Form.Group>

            {preview && (
                <div className="mb-3">
                    <img 
                        src={preview} 
                        alt="Preview" 
                        style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
                        className="img-thumbnail"
                    />
                    {originalDimensions && (
                        <p className="text-muted mt-2">
                            Original: {originalDimensions.width} × {originalDimensions.height}
                        </p>
                    )}
                </div>
            )}

            {selectedFile && (
                <>
                    <Form.Check
                        type="checkbox"
                        label="Maintain aspect ratio"
                        checked={maintainAspectRatio}
                        onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                        className="mb-3"
                    />

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Width (px)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={width}
                                    onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                                    min="1"
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Height (px)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={height}
                                    onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                                    min="1"
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <Button variant="primary" onClick={resizeImage} className="mb-3">
                        {t('download')}
                    </Button>
                </>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
}