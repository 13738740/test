import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const ref = doc(db, 'books', id);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          setBook(null);
        } else {
          setBook({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        console.error('Failed to load book', err);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBook();
  }, [id]);

  if (loading) return <p>Loading book...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="book-detail">
      <h2>{book.title || book.Name}</h2>
      <p><strong>Author:</strong> {book.author || book.Author}</p>
      <p><strong>Price:</strong> {book.price || book.Price}</p>
      <p>{book.description || book.Description}</p>
      {book.cover && <img src={book.cover} alt={book.title || book.Name} style={{ maxWidth: 240 }} />}
    </div>
  );
};

export default BookDetail;
