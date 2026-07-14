import { Link } from "react-router-dom";
import './style/bookList.css'

export default function BookList() {
    return (
        <>
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
        </>
    );
}