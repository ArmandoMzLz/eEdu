import { Link } from "react-router-dom";
import type { Category } from "../types/categories";
import Dropdown from "react-bootstrap/Dropdown";
import '../style/bookMenu.css';

interface BookMenuProps {
    category: Category;
}

function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function BookMenu({ category }: BookMenuProps) {
    return (
        <div className="dropdown-container">
        <Dropdown className="dropdown-menu">
            <Dropdown.Menu show>
                <Dropdown.Header className="dropdown-header">{capitalize(category.name)}</Dropdown.Header>
                <Dropdown.Item style={{ fontSize: '20px' }} className="dropdown-item" as={Link} to={`/category/${encodeURIComponent(category.name)}`}>
                    All {capitalize(category.name)}
                </Dropdown.Item>

                {category.subcategories.length > 0 && <Dropdown.Divider />}

                {category.subcategories.map((sub) => (
                    <Dropdown.Item
                        key={sub}
                        as={Link}
                        to={`/category/${encodeURIComponent(sub)}`}
                        className="dropdown-item"
                    >
                        {capitalize(sub)}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
        </div>
    );
}