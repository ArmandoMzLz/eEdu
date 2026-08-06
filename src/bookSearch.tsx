import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Book } from "./types/book";
import './style/bookCategory.css';
import Card from "react-bootstrap/Card";

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
        <div>
            <p className="result-txt">Results for "{decoded}"</p>
            <Link to={"/"} className="return-btn" style={{ textDecoration: 'none'}}>&larr; Return to catalog</Link>
            <div className="book-card-container">
            {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                    <Card as={Link} to={`/book/${book.id}`} className="book-card">
                        <Card.Img src={book.urlCover} className="book-card-image" />
                        <Card.Body>
                            <Card.Header>
                                <Card.Title className="book-card-title">{book.title}</Card.Title>
                            </Card.Header>
                            <Card.Text className="book-card-subtitle">{book.subtitle}</Card.Text>
                            <Card.Text className="book-card-author">{book.author}</Card.Text>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <div className="no-results-msg">
                    <p>No results found for "{decoded}"</p>
                </div>
            )}
            </div>
        </div>
    );
}