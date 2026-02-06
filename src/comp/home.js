import React, { useState, useEffect } from "react";
// Realtime Database base URL (no trailing slash)
const FIREBASE_INVENTORY_URL = 'https://onlinebookstoresystem-5246e-default-rtdb.firebaseio.com'

const Home = () => {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            // fetch the `books` node from the RTDB
            const res = await fetch(`${FIREBASE_INVENTORY_URL}/books.json`);
            if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
            const data = await res.json();
            if (!data) {
                setDataList([]);
            } else if (Array.isArray(data)) {
                // if stored as an array
                setDataList(data.map((d, i) => ({ id: i, ...d })));
            } else {
                // RTDB returns an object keyed by push id — convert to array
                const items = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
                setDataList(items.reverse());
            }
        } catch (err) {
            console.error('Error fetching books from RTDB', err);
            setDataList([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div>
            <div className="HomePage">
                <div className="dispay">
                    <h1>Books inventory (Realtime DB)</h1>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul>
                            {dataList.length === 0 && <li>No books found</li>}
                            {dataList.map((item) => (
                                <li key={item.id}>
                                    {/* Your RTDB uses `Books` for the title field */}
                                    <strong>{item.Books || item.Name || item.Books}</strong>
                                    ({item.ISBN || item.id}) — <em>{item.Author}</em>
                                    <div>Stock: {item.Stock}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;