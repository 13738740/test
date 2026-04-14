import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ref, onValue, update } from "firebase/database";
import emailjs from '@emailjs/browser';
import { db } from './firebase';
import './shop.css';

const Shop = () => {
    const [books, setBooks] = useState([]);
    const [cart, setCart] = useState([]);
    const [statusMessage, setStatusMessage] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const linkedBookId = queryParams.get('id');

    // 1. Fetch Books from Firebase
    useEffect(() => {
        const booksRef = ref(db, 'BookDetail'); 
        onValue(booksRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const bookList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setBooks(bookList);
            }
        });
    }, []);

    // 2. Logic to filter for a single linked book OR show all
    const displayBooks = linkedBookId 
        ? books.filter(book => book.id === linkedBookId) 
        : books;

    const addToCart = (book) => {
        const cartCount = cart.filter(item => item.id === book.id).length;
        if (book.Stock > cartCount) {
            setCart([...cart, book]);
            setStatusMessage(`${book.Book} added to cart!`);
            setTimeout(() => setStatusMessage(""), 2000);
        } else {
            alert("Limit reached based on current stock!");
        }
    };

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        try {
            const updates = {};
            cart.forEach(item => {
                updates[`/BookDetail/${item.id}/Stock`] = item.Stock - 1;
            });
            await update(ref(db), updates);
            
            // Trigger EmailJS here if configured
            
            setStatusMessage("Order confirmed! Check your email.");
            setCart([]);
        } catch (error) {
            setStatusMessage("Update failed.");
            console.error(error);
        }
    };

    return (
        <div className="shop-page-layout">
            {/* Left Side: Book Collection */}
            <div className="main-content">
                <div className="content-header">
                    <h2 className="section-title">
                        {linkedBookId ? "Selected Item" : "Books for You"}
                    </h2>
                    {linkedBookId && (
                        <button className="view-all-btn" onClick={() => navigate('/shop')}>
                            ← View All Books
                        </button>
                    )}
                </div>

                {statusMessage && <div className="status-banner">{statusMessage}</div>}
                
                {/* Using the same grid class as Home for consistency */}
                <div className="display2"> 
                    {displayBooks.map(book => (
                        <div key={book.id} className="item2">
                            <div className="image-box">
                                <img src={book.Cover} alt={book.Book} style={{ width: '20%', height: 'auto', objectFit: 'cover', marginBottom: 8 }} />
                            </div>
                            <div className="book-info">
                                <h3>{book.Book}</h3>
                                <p className="author">By: {book.Author}</p>
                                <p className="price">${book.Price}</p>
                            <button 
                                className="link" 
                                onClick={() => addToCart(book)} 
                                disabled={book.Stock <= 0}>
                                {book.Stock > 0 ? "Add to Cart" : "Sold Out"}
                            </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side: Shopping Cart Sidebar */}
            <div className="cart-sidebar">
                <h3>Your Shopping Cart</h3>
                <div className="cart-items-container">
                    {cart.length === 0 ? (
                        <p className="empty-msg">Your cart is empty.</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="sidebar-cart-item">
                                <div className="item-info">
                                    <span className="cart-book-name">{item.Book}</span>
                                    <strong className="cart-book-price">${item.Price}</strong>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="total">
                            Total: ${cart.reduce((acc, curr) => acc + parseFloat(curr.Price), 0).toFixed(2)}
                        </div>
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Confirm Purchase
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;