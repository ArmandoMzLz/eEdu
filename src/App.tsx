import { Routes, Route } from 'react-router-dom';
import BookList from "./bookList.tsx";
import BookCategory from './bookCategory.tsx';
import BookPage from './bookPage.tsx';
import BookSearch from './bookSearch.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/category/:categoryName" element={<BookCategory />}/>
      <Route path='/search/:query' element={<BookSearch />} />
      <Route path="/book/:id" element={<BookPage />} />
    </Routes>
  );
}