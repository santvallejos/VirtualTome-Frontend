import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import Book from './components/Book/Book.jsx';
import Tittles from './components/Tiittles/Tittles.jsx';
import AddBook from './components/addBook/addBook.jsx';

function App() {
  const [books, setBooks] = useState([]);
  const [showAddBookForm, setShowAddBookForm] = useState(false); // Estado para alternar entre lista y formulario

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch('http://localhost:3000/books') // URL de tu API
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error:', error));
  }

  /* Se implementa esto porque no se puede usar el DOM en react */
  const toggleView = () => {
    setShowAddBookForm((prevState) => !prevState); // Alterna entre true y false
  };

  const handleDeleteBook = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  return (
    <>
    <div>
      {/* Títulos */}
      <Tittles />

      <main>
        <section>
          {/* Botones */}
          <button className="selects" onClick={toggleView}>
            {showAddBookForm ? 'Lista de libros' : 'Añadir libro'}
          </button>
        </section>

        <section>
          {/* Lista de libros */}
          {!showAddBookForm && (
            <div className='containerLitsBooks'>
              <ul id="listBooks" className='litsBooks'>
                {[...books].reverse().map((book) => (
                  <Book
                    key={book.id}
                    id={book.id}
                    nombre={book.nombre}
                    autor={book.autor}
                    categoria={book.categoria}
                    url={book.url}
                    publicacion={book.publicacion}
                    onDelete={handleDeleteBook}
                  />
                ))}
              </ul>
            </div>
          )}
        </section>

        <section>
          {/* Formulario para añadir libro */}
          {showAddBookForm && (<AddBook />)}
        </section>
      </main>
      </div>
    </>
  );
}

export default App;