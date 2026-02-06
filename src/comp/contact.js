import React, { useState, useEffect } from "react";
import './contact.css'

const FIREBASE_MESSAGES_URL = 'https://react-ecommerce-9acf4-default-rtdb.firebaseio.com/Message.json'

const Contact = () => {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({ Name: '', email: '', subject: '', Message: '' });
    const [search, setSearch] = useState('');

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await fetch(FIREBASE_MESSAGES_URL);
            if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
            const data = await res.json();
            if (!data) {
                setDataList([]);
            } else if (Array.isArray(data)) {
                setDataList(data.map((d, i) => ({ id: i, ...d })));
            } else {
                const items = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
                setDataList(items.reverse()); // newest first
            }
        } catch (err) {
            console.error('Error fetching messages', err);
            setDataList([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSend = async (e) => {
        e.preventDefault();
        const { Name, email, subject, Message } = user;
        try {
            const res = await fetch(FIREBASE_MESSAGES_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Name, email, subject, Message })
            });
            if (!res.ok) throw new Error(`Send failed: ${res.status}`);
            setUser({ Name: '', email: '', subject: '', Message: '' });
            await fetchMessages();
            alert('Message Sent');
        } catch (err) {
            console.error(err);
            alert('Error Occurred: Message send failed');
        }
    };
    return (
        <>
        <div className='contact'>
            <div className="container">
                <div className="form">
                    <h2>#contact us</h2>
                    <form onSubmit={handleSend}>
                        <div className="box">
                            <div className="lable">
                                <h4>Name</h4>                  
                            </div>
                            <div className="input">
                                <input type='text' placeholder="Name" value={user.Name} name='Name' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="box">
                            <div className="lable">
                                <h4>E-mail</h4>                  
                            </div>
                            <div className="input">
                                <input type='email' placeholder="E-mail" value={user.email} name='email' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="box">
                            <div className="lable">
                                <h4>Subject</h4>                  
                            </div>
                            <div className="input">
                                <input type='text' placeholder="Subject" value={user.subject} name='subject' onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="box">
                            <div className="lable">
                                <h4>Message</h4>                  
                            </div>
                            <div className="input">
                                <textarea placeholder='Message !' value={user.Message} name='Message' onChange={handleChange}></textarea>
                            </div>
                        </div>
                        <button type='submit'>Send</button>
                     </form>
                </div> 
            </div>

        </div>
        <div className="dispay">
                <h1>Data from Firebase:</h1>
                <div style={{ marginBottom: 12 }}>
                    <input
                        type="search"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ padding: '6px 8px', width: '100%', maxWidth: 360 }}
                    />
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {dataList.length === 0 && <li>No messages</li>}
                        {/** filter client-side by Name or email (case-insensitive) */}
                        {dataList
                            .filter((item) => {
                                if (!search) return true;
                                const q = search.toLowerCase();
                                const name = (item.Name || '').toLowerCase();
                                const mail = (item.email || '').toLowerCase();
                                return name.includes(q) || mail.includes(q);
                            })
                            .map((item) => (
                                <li key={item.id}>
                                    <strong>{item.Name}</strong> ({item.email}) — <em>{item.subject}</em>
                                    <div>{item.Message}</div>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
    </>
    )
}
export default Contact