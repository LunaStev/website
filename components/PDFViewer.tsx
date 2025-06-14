// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
    fileUrl: string;
}

export default function PDFViewer({ fileUrl }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);

    return (
        <div>
            <Document file={fileUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                {Array.from(new Array(numPages), (_, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
            </Document>
        </div>
    );
}