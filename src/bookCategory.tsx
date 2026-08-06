import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Book } from "./types/book";
import './style/bookCategory.css';
import Card from "react-bootstrap/Card";

export default function BookCategory() {
    const { categoryName } = useParams<{ categoryName: string }>();
    const [books, setBooks] = useState<Book[]>([]);
    const decoded = decodeURIComponent(categoryName ?? '');
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

    return(
        <main>
            <h1>{decoded.toUpperCase()}</h1>
            <Link to={"/"} className="return-btn" style={{ textDecoration: 'none'}}>&larr; Return to catalog</Link>
            <div className="book-card-container">
                {books.filter(book => book.categories.includes(decoded)).map((book) =>
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
                )}
            </div>
        </main>
    );
}