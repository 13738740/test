import { useState, useEffect } from "react";
import './home.css';
import { useSearch } from '../contexts/SearchContext';
import { Link } from 'react-router-dom';

const FIREBASE_INVENTORY_URL = 'https://inventory-aff70-default-rtdb.firebaseio.com/BookDetail.json'

const Home = () => {
    const [dataList2, setDataList] = useState([]);
    const [loading2, setLoading] = useState(true);
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
                setDataList(items2.reverse());
            }
        } catch (err2) {
            console.error('Error fetching books', err2);
            setError2('Unable to load book data. Please try again later.');
            setDataList([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages2();
    }, []);

    const q = (search2 || '').toLowerCase();
    const filtered = dataList2.filter((item2) => {
        const book = (item2.Book || '').toLowerCase();
        const author = (item2.Author || '').toLowerCase();
        const isbn = (item2.ISBN || '').toLowerCase();
        return book.includes(q) || author.includes(q) || isbn.includes(q);
    });

    return (
        <div className="home">
            <div className="container">
                <h1>Welcome to the Bookstore</h1>
                <p>Explore our collection of books. Use the search box above to find books by title, author, or ISBN.</p>
            </div>

            {/* Status messages placed outside the grid for clean look */}
{/* Status messages section */}
            <div className="search-status" style={{ padding: '0 60px', color: '#4b3621', minHeight: '30px' }}>
                {loading2 && <p>Loading...</p>}
                {error2 && <p style={{ color: 'crimson' }}>{error2}</p>}
                
                {/* This line now ONLY shows if the search bar is empty AND we aren't loading */}
                {!loading2 && !search2.trim() && (
                    <p>Type in the search bar to find your favorite books.</p>
                )}

                {/* Shows "No results" only if the user has typed something and nothing was found */}
                {search2.trim() && filtered.length === 0 && !loading2 && (
                    <p>No results found for "{search2}"</p>
                )}
            </div>

            {/* Results Grid - Using your display2/item2 CSS classes */}
            <div className="display2">
                {filtered.map((item2) => (
                    <div key={item2.id} className="item2">
                        {(item2.ImageUrl || item2.Cover || item2.cover) && (
                            <img 
                                src={item2.Cover || item2.ImageUrl || item2.cover} 
                                alt={item2.Book} 
                                style={{ width: '85%', height: 'auto', objectFit: 'cover', marginBottom: 8 }} />
                        )}
                        <div className="book-info">
                            <h3>{item2.Book}</h3>
                            <p className="author">By: {item2.Author}</p>
                            <p className="isbn">ISBN: {item2.ISBN}</p>
                            <div className="book-meta">
                                {item2.Price ? `$${Number(item2.Price).toFixed(2)}` : "Price N/A"}
                            </div>
                            <Link to={`/shop?id=${item2.id}`} className="link">Shop Now</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;