// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type Props = {
    fileUrl: string;
};

export default function PDFViewer({ fileUrl }: Props) {
    const [numPages, setNumPages] = useState<number>(0);

    return (
        <div>
            <Document
                file={fileUrl}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                onLoadError={(error) => console.error('PDF Load Error:', error)}
            >
                {Array.from(new Array(numPages), (_, index) => (
                    <Page key={index + 1} pageNumber={index + 1} />
                ))}
            </Document>
        </div>
    );
}
