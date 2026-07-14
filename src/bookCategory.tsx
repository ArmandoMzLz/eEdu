import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Book } from "./types/book";

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
        <>
        <Link to={"/"} style={{ textDecoration: 'none'}}>&larr; Return to catalog</Link>
        <div>
        <ul>
            {books.filter(book => book.categories.includes(decoded)).map((book) =>
                <li key={book.id}>
                    <Link to={`/book/${book.id}`} style={{ textDecoration: 'none'}}>
                        {book.title} - {book.author}
                    </Link>
                </li>
            )}
        </ul>
        </div>
        </>
    );
}