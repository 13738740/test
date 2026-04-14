import React, { useState } from 'react'
import './nav.css'
import { MdLocalShipping } from 'react-icons/md'
import { FaSearch } from "react-icons/fa";
import LoginButton from '../component/LoginButton'
import LogoutButton from '../component/LogoutButton'
import Profile from '../component/Profile';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext';
import { useAuth0 } from '@auth0/auth0-react';

const Nav = () => {
    const { search, setSearch } = useSearch();
    const [showProfile, setShowProfile] = useState(false);
    const { user, isAuthenticated } = useAuth0();
    const adminList = (process.env.REACT_APP_ADMIN_EMAILS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    const isAdmin = isAuthenticated && user && adminList.includes((user.email || '').toLowerCase());
    return (
        <>
        <div className='header'>
            <div className='top_header'>
                <div className='icon'>
                    <MdLocalShipping style={{ backgroundColor: 'transparent'}}/>
                </div>
                <div className= 'info'>
                    <p>Free Shipping when purchasing over $400</p>
                </div>
            </div>
            <div className='mid_header'>
                <div className='logo'>
                    <img src='/image/image.png' alt='logo' />
                </div>
                <div className= 'search_box'>
                    <input
                        type='text'
                        value={search}
                        placeholder='search'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button><FaSearch style={{ backgroundColor: 'transparent', color: '#F9F7F3'}}/></button>
                </div>
                <div className='user-actions'>
                    <LoginButton />
                    <LogoutButton />
                    <div className="profile-area">
                        <button
                            className="profile-btn"
                            aria-label="Toggle profile"
                            onClick={() => setShowProfile((s) => !s)}
                        >
                            <CgProfile className="profile-icon" style={{ backgroundColor: 'transparent', color: '#F9F7F3'}}/>
                        </button>
                        {showProfile && (
                            <div className="profile-popup">
                                <Profile />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='last_header'>
                <div className='nav'>
                    <ul>
                        <li><Link to='/' className='link'>Home</Link></li>
                        <li><Link to='/shop' className='link'>Shop</Link></li>
                        <li><Link to='/collection' className='link'>Collection</Link></li>
                        <li><Link to='/about' className='link'>About</Link></li>
                        {/* <li><Link to='/chat' className='link'>Chat</Link></li> */}
                        {isAdmin ? <li><Link to='/admin' className='link'>Admin</Link></li> : null}
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default Nav
