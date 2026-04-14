import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { db } from './firebase'; // Use your existing firebase config
import { ref, push } from "firebase/database"; 
import './admin.css';

const Admin = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [form, setForm] = useState({ Book: '', Author: '', ISBN: '', Stock: '', Price: '', Cover: '' });
  const [error, setError] = useState(null);

  // --- CHANGE THIS TO YOUR ACTUAL ADMIN EMAIL ---
  const ADMIN_EMAIL = "s1373874@live.hkmu.edu.hk"; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const { Book, Author, ISBN, Stock, Price, Cover } = form;

    if (!Book.trim() || !Author.trim()) {
      setError('Please provide at least Book title and Author.');
      return;
    }

    setError(null);

    try {
      // Use the Firebase SDK to push to 'BookDetail'
      const booksRef = ref(db, 'BookDetail');
      await push(booksRef, {
        Book,
        Author,
        ISBN,
        Stock: Number(Stock) || 0,
        Price: Number(Price) || 0,
        Cover: Cover || ''
      });

      setForm({ Book: '', Author: '', ISBN: '', Stock: '', Price: '', Cover: '' });
      alert('Book added successfully to Firebase!');
    } catch (err) {
      console.error(err);
      setError('Error saving to Firebase. Check your database rules.');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  // VERIFICATION: Check if authenticated AND if email matches admin
  if (!isAuthenticated || user.email !== ADMIN_EMAIL) {
    return (
      <div className="admin-container">
        <h2>Access Denied</h2>
        <p>You do not have permission to access the admin dashboard.</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome back, Admin ({user.email}).</p>
      
      <form className="admin-form" onSubmit={handleSend}>
        <div className="input-group"><label>Book Title</label><input name="Book" value={form.Book} onChange={handleChange} /></div>
        <div className="input-group"><label>Author</label><input name="Author" value={form.Author} onChange={handleChange} /></div>
        <div className="input-group"><label>ISBN</label><input name="ISBN" value={form.ISBN} onChange={handleChange} /></div>
        <div className="input-group"><label>Stock</label><input name="Stock" type="number" value={form.Stock} onChange={handleChange} /></div>
        <div className="input-group"><label>Price</label><input name="Price" type="number" step="0.01" value={form.Price} onChange={handleChange} /></div>
        <div className="input-group"><label>Cover URL</label><input name="Cover" value={form.Cover} onChange={handleChange} /></div>
        
        {error && <div className="error-msg">{error}</div>}
        <button type="submit" className="admin-submit-btn">Add Book to Inventory</button>
      </form>
    </div>
  );
};

export default Admin;