import { Link, useNavigate } from "react-router-dom";
import { use, useState } from "react";
import './style/bookList.css'

export default function BookList() {
    const [ searchQuery, setSearchQuery ] = useState("");
    const navigate = useNavigate();

    function handleSearchSubmit(e: React.FormEvent) {
        e.preventDefault();

        const trimmed = searchQuery.trim();
        if(trimmed) {
            navigate(`/search/${encodeURIComponent(trimmed)}`);
        }
    }

    return (
        <main className="main-container">
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
            <h2>Main Categories</h2>
            <div className="category-card-container">
                <Link to={`/category/${encodeURIComponent('math')}`} style={{ textDecoration: 'none'}}>
                    <div className="category-card">
                        <h3>Mathematics</h3>
                    </div>
                </Link>
                <Link to={`/category/${encodeURIComponent('engineering')}`} style={{ textDecoration: 'none'}}>
                    <div className="category-card">
                        <h3>Engineering</h3>
                    </div>
                </Link>
                <Link to={`/category/${encodeURIComponent('software')}`} style={{ textDecoration: 'none'}}>
                    <div className="category-card">
                        <h3>Software</h3>
                    </div>
                </Link>
                <Link to={`/category/${encodeURIComponent('hardware')}`} style={{ textDecoration: 'none'}}>
                    <div className="category-card">
                        <h3>Hardware</h3>
                    </div>
                </Link>
                <Link to={`/category/${encodeURIComponent('physics')}`} style={{ textDecoration: 'none'}}>
                    <div className="category-card">
                        <h3>Physics and Science</h3>
                    </div>
                </Link>
            </div>
        </main>
    );
}