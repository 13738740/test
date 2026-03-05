import React, { useEffect, useState } from 'react';
import './comp/home.css';

const FIREBASE_INVENTORY_URL = 'https://inventory-aff70-default-rtdb.firebaseio.com/BookDetail.json';

export default function Collection() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function fetchBooks() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(FIREBASE_INVENTORY_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        if (!data) {
          setBooks([]);
        } else if (Array.isArray(data)) {
          setBooks(data.map((d, i) => ({ id: i, ...d })));
        } else {
          const items = Object.keys(data).map((k) => ({ id: k, ...data[k] }));
          setBooks(items.reverse());
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error('Error fetching books', err);
        setError('Unable to load books.');
        setBooks([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchBooks();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="collection page">
      <div className="container">
        <h2>Collection</h2>

        {loading ? (
          <p>Loading books…</p>
        ) : error ? (
          <p style={{ color: 'crimson' }}>{error}</p>
        ) : books.length === 0 ? (
          <p>No books found in the database.</p>
        ) : (
          <>
            <p style={{ marginBottom: 12, fontWeight: 600 }}>Total books: {books.length}</p>
            <ul className="book-list">
              {books.map((b) => (
                <li key={b.id} className="book-item">
                  {(b.ImageUrl || b.Cover || b.cover) ? (
                    <img src={b.ImageUrl || b.Cover || b.cover} alt={b.Book} className="book-cover" />
                  ) : null}
                  <div className="book-row">
                    <div>
                      <strong>{b.Book || 'Untitled'}</strong>
                      {b.Author ? <span> — {b.Author}</span> : null}
                    </div>
                    <div className="muted">{b.ISBN ? `ISBN: ${b.ISBN}` : null}</div>
                  </div>
                  {b.Price ? <div style={{ fontWeight: 600 }}>Price: ${Number(b.Price).toFixed(2)}</div> : null}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
