import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Book } from "./types/book";
import './style/bookCategory.css';

export default function BookSearch() {
    const { query } = useParams<{ query: string }>();
    const [books, setBooks] = useState<Book[]>([]);
    const decoded = decodeURIComponent(query ?? '').toLowerCase();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/data/db.json')
            .then((res) => {
                if (!res.ok) throw new Error(`Error ${res.status}`);
                return res.json();
            })
            .then((data: { books: Book[] }) => setBooks(data.books))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const filteredBooks = books.filter((book => 
       book.categories.some((category) => category.toLowerCase().includes(decoded)) ||
       book.title.toLowerCase().includes(decoded) ||
       book.subtitle.toLowerCase().includes(decoded) ||
       book.author.toLowerCase().includes(decoded) 
    ));

    return(
        <>
        <Link to={"/"} style={{ textDecoration: 'none'}}>&larr; Return to catalog</Link>
        <p>Results for "{decoded}"</p>
        <div className="book-card-container">
            {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                    <Link key={book.id} to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
                        <div className="book-card">
                            <div className="book-image-container">
                                <img src={book.urlCover} />
                            </div>
                            <div className="book-data-container">
                                <h2>{book.title}</h2>
                                <h3>{book.subtitle}</h3>
                                <h4>{book.author}</h4>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <p>No results found for "{decoded}"</p>
            )}
        </div>
        </>
    );
}