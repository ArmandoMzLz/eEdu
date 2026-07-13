// bookList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Book } from "./types/book";

export default function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
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

    return (
        <>
        <h2>Main Categories</h2>
        <h3>Math</h3>
        <ul>
            {books.filter(book => book.categories.includes('math')).map((book) => (
                <li key={book.id}>
                    <Link to={`/book/${book.id}`}>
                        {book.title} - {book.author}
                    </Link>
                </li>
            ))}
        </ul>
        <h3>Enginnering</h3>
         <ul>
            {books.filter(book => book.categories.includes('engineering')).map((book) => (
                <li key={book.id}>
                    <Link to={`/book/${book.id}`}>
                        {book.title} - {book.author}
                    </Link>
                </li>
            ))}
        </ul>
        <h3>Software</h3>
         <ul>
            {books.filter(book => book.categories.includes('software')).map((book) => (
                <li key={book.id}>
                    <Link to={`/book/${book.id}`}>
                        {book.title} - {book.author}
                    </Link>
                </li>
            ))}
        </ul>
        <h3>Hardware</h3>
         <ul>
            {books.filter(book => book.categories.includes('hardware')).map((book) => (
                <li key={book.id}>
                    <Link to={`/book/${book.id}`}>
                        {book.title} - {book.author}
                    </Link>
                </li>
            ))}
        </ul>
        <h3>Physics & Science</h3>
         <ul>
            {books.filter(book => (book.categories.includes('physics') || book.categories.includes('science'))).map((book) => (
                <li key={book.id}>
                    <Link to={`/book/${book.id}`}>
                        {book.title} - {book.author}
                    </Link>
                </li>
            ))}
        </ul>
        </>
    );
}