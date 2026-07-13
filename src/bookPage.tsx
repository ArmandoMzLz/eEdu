import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Book } from "./types/book";
import PdfViewer from "./components/pdfViewer.tsx";
 
export default function BookPage() {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
 
    useEffect(() => {
        fetch('/data/db.json')
            .then((res) => {
                if (!res.ok) throw new Error(`Error ${res.status}`);
                return res.json();
            })
            .then((data: { books: Book[] }) => {
                const found = data.books.find((b) => b.id === Number(id));
                if (!found) throw new Error("Book not found.");
                setBook(found);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);
 
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!book) return null;
 
    return (
        <div>
            <Link to="/">&larr; Return to catalog</Link>
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            <p>Autor: {book.author}</p>
            <PdfViewer fileUrl={book.urlBook} />
        </div>
    );
}