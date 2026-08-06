import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './style/bookList.css'
import type { Category } from "./types/categories";
import BookMenu from "./components/bookMenu";

export default function BookList() {
    const [ searchQuery, setSearchQuery ] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/data/categories.json')
            .then((res) => {
                if (!res.ok) throw new Error(`Error ${res.status}`);
                return res.json();
            })
            .then((data: { categories: Category[] }) => setCategories(data.categories))
            .catch((err) => console.error(err));
    }, []);

    function handleSearchSubmit(e: React.FormEvent) {
        e.preventDefault();

        const trimmed = searchQuery.trim();
        if(trimmed) {
            navigate(`/search/${encodeURIComponent(trimmed)}`);
        }
    }

    return (
        <main className="main-container">
            <h1 style={{ fontSize: '100px' }}>eEdu</h1>
            <div className="counter-container">
                <p>Total books: </p>
                <div className="counter"></div>     
            </div>
            <form className="search-container" onSubmit={handleSearchSubmit}>
                <div className="search-icon-container">
                    <img className="search-icon" src="search.svg" />
                </div>
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search books, authors, topics, categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                <button className="search-btn">
                    Search
                </button>
            </form>
            <h2 style={{ fontSize: '40px' }}>Main Categories</h2>
            
            <div className="category-menu-container">
                {categories.map((category) => (
                    <BookMenu key={category.name} category={category} />
                ))}
            </div>
        </main>
    );
}