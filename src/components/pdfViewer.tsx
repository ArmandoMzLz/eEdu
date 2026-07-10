import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL (
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

interface PdfViwerProps {
    fileUrl: string;
}

export default function PdfViewer({ fileUrl }: PdfViwerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Document  
                file={fileUrl} 
                onLoadSuccess={onDocumentLoadSuccess} 
                loading={<p>Loading...</p>} 
                error={<p>The book cannot be loaded.</p>}
            >
                <Page pageNumber={pageNumber} renderTextLayer renderAnnotationLayer />
            </Document>

            {numPages > 0 && (
                <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem'}}>
                    <button
                        disabled={pageNumber <= 1}
                        onClick={() => setPageNumber((p) => p - 1)}
                    >
                        Previous
                    </button>
                    <span>
                        Page {pageNumber} of {numPages}
                    </span>
                    <button
                        disabled={pageNumber >= numPages}
                        onClick={() => setPageNumber((p) => p + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}