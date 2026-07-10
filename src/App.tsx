import PdfViewer from "./components/pdfViewer";

export default function App() {
  return (
    <main>
      <h1>eEdu</h1>
      <h2>Categories</h2>
      <h3>Math</h3>
      <h3>Tech</h3>
      <h3>Engineering</h3>
      <PdfViewer fileUrl="../public/books/Algebra Lineal y sus Aplicaciones 3ra Edicion David C Lay.pdf" />
    </main>
  );
}