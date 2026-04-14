import React, { useState, useEffect } from "react";
// I recommend creating a collection.css, but you can add this to home.css
import './collection.css'; 

const FIREBASE_INVENTORY_URL = 'https://inventory-aff70-default-rtdb.firebaseio.com/BookDetail.json';

const Collection = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch(FIREBASE_INVENTORY_URL);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
      
      const items = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      setBooks(items);
    } catch (err) {
      setError('Unable to load book data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="collection-page">
      <h2 className="collection-title">Book Collection</h2>
      
      {loading && <p className="status-msg">Loading inventory...</p>}
      {error && <p className="error-msg">{error}</p>}
      
      <div className="collection-grid">
        {books.map((book) => (
          <div key={book.id} className="collection-card">
            <div className="image-box">
               <img src={book.Cover} alt={book.Book} />
            </div>
            <div className="book-info">
                <h3>{book.Book}</h3>
                <p className="author">By: {book.Author}</p>
                <p className="isbn">ISBN: {book.ISBN}</p>
                <p className="price">${book.Price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;