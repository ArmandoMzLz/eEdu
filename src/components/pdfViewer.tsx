import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '../style/bookPage.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL (
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

interface PdfViwerProps {
    fileUrl: string;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 2.5;
const SCALE_STEP = 0.25;

export default function PdfViewer({ fileUrl }: PdfViwerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageInput, setPageInput] = useState<string>("1");
    const [scale, setScale] = useState<number>(1);

    function zoomIn() {
        setScale((s) => Math.min(s + SCALE_STEP, MAX_SCALE));
    }

    function zoomOut() {
        setScale((s) => Math.max(s - SCALE_STEP, MIN_SCALE));
    }

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
        setPageInput("1");
    }

    function goToPage(page: number) {
        const clamped = Math.min(Math.max(page, 1), numPages);
        setPageNumber(clamped);
        setPageInput(String(clamped));
    }

    function handlePageInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPageInput(e.target.value);
    }

    function handlePageInputCommit() {
        const parsed = Number(pageInput);
        if (!Number.isNaN(parsed) && parsed >= 1) {
            goToPage(parsed);
        } else {
            setPageInput(String(pageNumber));
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Document  
                file={fileUrl} 
                onLoadSuccess={onDocumentLoadSuccess} 
                loading={<p>Loading...</p>} 
                error={<p>The book cannot be loaded.</p>}
            >
                <Page pageNumber={pageNumber} scale={scale} renderTextLayer renderAnnotationLayer />
            </Document>

            {numPages > 0 && (
                <>
                    <div className="next-prev-btn-container">
                        <button disabled={pageNumber <= 1} onClick={() => goToPage(pageNumber - 1)} className="next-prev-btn">
                            &larr;
                        </button>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Page{' '}
                            <input type="number" min={1} max={numPages} value={pageInput}
                                onChange={handlePageInputChange}
                                onBlur={handlePageInputCommit}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                     e.currentTarget.blur();
                                    }
                                }}
                                style={{ width: '4rem', textAlign: 'center' }}
                            />
                            {' '}of {numPages}
                        </span>
                        <button disabled={pageNumber >= numPages} onClick={() => goToPage(pageNumber + 1)} className="next-prev-btn">
                            &rarr;
                        </button>
                    </div>
                    <div className="zoom-btn-container">
                        <button className="zoom-btn" onClick={zoomOut} disabled={scale <= MIN_SCALE}>
                            −
                        </button>
                        <span>{Math.round(scale * 100)}%</span>
                        <button className="zoom-btn" onClick={zoomIn} disabled={scale >= MAX_SCALE}>
                            +
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}