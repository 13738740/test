import { useState, useEffect } from "react";
import './home.css';
import { useSearch } from '../contexts/SearchContext';

const FIREBASE_INVENTORY_URL = 'https://inventory-aff70-default-rtdb.firebaseio.com/BookDetail.json'
// Point this at the inventory project database. Using the full REST URL with
// the .json suffix avoids browser redirects to the Firebase Console (which
// trigger CORS failures).

const Home = () => {
    const [dataList2, setDataList] = useState([]);
        const [loading2, setLoading] = useState(true);
        const [user2, setUser] = useState({ Book: '', Author: '', ISBN: '', Stock: '', Price: '', Cover: '' });
    const { search: search2 } = useSearch();
        const [error2, setError2] = useState(null);
        const fetchMessages2 = async () => {
            setLoading(true);
            try {
                const res2 = await fetch(FIREBASE_INVENTORY_URL);
                if (!res2.ok) throw new Error(`Fetch failed: ${res2.status}`);
                const data2 = await res2.json();
                if (!data2) {
                    setDataList([]);
                } else if (Array.isArray(data2)) {
                    setDataList(data2.map((d, i) => ({ id: i, ...d })));
                } else {
                    const items2 = Object.keys(data2).map((key2) => ({ id: key2, ...data2[key2] }));
                    setDataList(items2.reverse()); // newest first
                }
            } catch (err2) {
                console.error('Error fetching messages', err2);
                setError2('Unable to load book data. Please try again later.');
                setDataList([]);
            } finally {
                setLoading(false);
            }

        };

        useEffect(() => {
            fetchMessages2();
        }, []);
    
        const handleChange2 = (e) => {
            const { name, value } = e.target;
            setUser((prev) => ({ ...prev, [name]: value }));
        };
    
        const handleSend2 = async (e) => {
            e.preventDefault();
            const { Book, Author, ISBN, Stock, Price, Cover } = user2;
            // basic validation
            if (!Book.trim() || !Author.trim()) {
                setError2('Please provide at least Book title and Author.');
                return;
            }
            setError2(null);
            try {
                const res2 = await fetch(FIREBASE_INVENTORY_URL , {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ Book, Author, ISBN, Stock: Number(Stock) || 0, Price: Number(Price) || 0, Cover: Cover || '' })
                });
                if (!res2.ok) throw new Error(`Send failed: ${res2.status}`);
                setUser({ Book: '', Author: '', ISBN: '', Stock: '', Price: '', Cover: '' });
                await fetchMessages2();
                alert('Book added successfully');
            } catch (err) {
                console.error(err);
                setError2('Error occurred sending book data. Please try again.');
            }
        };
    return (
        <>
        <div className="home">
            <div className="container">
                <div className="form">
                    <h2>#Home Page</h2>
                    <form onSubmit={handleSend2}>
                        <div className="box">
                            <div className="label">
                                <h4>Book</h4>                  
                            </div>
                            <div className="input">
                                <input type='text' placeholder="Book" value={user2.Book} name='Book' onChange={handleChange2}></input>
                            </div>
                        </div>
                        <div className="box">
                            <div className="label">
                                <h4>Author</h4>                  
                            </div>
                            <div className="input">
                                <input type='text' placeholder="Author" value={user2.Author} name='Author' onChange={handleChange2}></input>
                            </div>
                        </div>
                        <div className="box">
                            <div className="label">
                                <h4>ISBN</h4>                  
                            </div>
                            <div className="input">
                                <input type='text' placeholder="ISBN" value={user2.ISBN} name='ISBN' onChange={handleChange2}></input>
                            </div>
                        </div>
                        <div className="box">
                            <div className="label">
                                <h4>Stock</h4>                  
                            </div>
                            <div className="input">
                                <input type='number' placeholder="Stock" value={user2.Stock} name='Stock' onChange={handleChange2}></input>
                            </div>
                        </div>
                        <div className="box">
                            <div className="label">
                                <h4>Price</h4>
                            </div>
                            <div className="input">
                                <input type='number' step='0.01' placeholder="Price" value={user2.Price} name='Price' onChange={handleChange2}></input>
                            </div>
                        </div>
                        <div className="box">
                            <div className="label">
                                <h4>Image URL</h4>
                            </div>
                            <div className="input">
                                <input type='text' placeholder="https://...jpg" value={user2.Cover} name='Cover' onChange={handleChange2}></input>
                            </div>
                        </div>
                        <button type='submit'>Send</button>
                     </form>
                </div> 
            </div>

        </div>
    <div className="dispay2">
        <h1>Data from Firebase:</h1>
        <p style={{ margin: '8px 0', fontWeight: 600 }}>Total books: {dataList2.length}</p>
                <div style={{ marginBottom: 12 }}>
                    {/* Search is controlled from the header search box */}
                    {loading2 ? (
                        <p>Loading...</p>
                    ) : error2 ? (
                        <p style={{ color: 'crimson' }}>{error2}</p>
                    ) : !search2.trim() ? (
                        <p>Type to search books by title, author or ISBN.</p>
                    ) : (
                        (() => {
                            const q = search2.toLowerCase();
                            const filtered = dataList2.filter((item2) => {
                                const book = (item2.Book || '').toLowerCase();
                                const author = (item2.Author || '').toLowerCase();
                                const isbn = (item2.ISBN || '').toLowerCase();
                                return book.includes(q) || author.includes(q) || isbn.includes(q);
                            });
                            if (filtered.length === 0) {
                                return <p>No results found for "{search2}"</p>;
                            }
                            return (
                                <ul>
                                        {filtered.map((item2) => (
                                                <li key={item2.id} className="book-item">
                                                        {(item2.ImageUrl || item2.Cover || item2.cover) ? (
                                                            <img src={item2.ImageUrl || item2.Cover || item2.cover} alt={item2.Book} className="book-cover" />
                                                        ) : null}
                                                    <div className="book-meta">
                                                        <strong>{item2.Book}</strong> ({item2.Author}) — <em>{item2.ISBN}</em>
                                                        {item2.Price ? <div>Price: ${Number(item2.Price).toFixed(2)}</div> : null}
                                                        <div>{item2.Message}</div>
                                                    </div>
                                                </li>
                                            ))}
                                </ul>
                            );
                        })()
                    )}
                </div>

            </div>
        </>
    );
};

export default Home;