import React, { useState } from 'react'
import './nav.css'
import { MdLocalShipping } from 'react-icons/md'
import { AiOutlineSearch } from "react-icons/ai";
import LoginButton from '../component/LoginButton'
import LogoutButton from '../component/LogoutButton'
import Profile from '../component/Profile';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext';

const Nav = () => {
    const { search, setSearch } = useSearch();
    const [showProfile, setShowProfile] = useState(false);
    return (
        <>
        <div className='header'>
            <div className='top_header'>
                <div className='icon'>
                    <MdLocalShipping/>
                </div>
                <div className= 'info'>
                    <p>Free Shipping when purchasing over $400</p>
                </div>
            </div>
            <div className='mid_header'>
                <div className='logo'>
                    <img src='image/logo.jpg' alt='logo'></img>
                </div>
                <div className= 'search_box'>
                    <input
                        type='text'
                        value={search}
                        placeholder='search'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button><AiOutlineSearch /></button>
                </div>
                <div className='user-actions'>
                    {/* Use the shared Login/Logout components (they render conditionally) */}
                    <LoginButton />
                    <LogoutButton />
                    {/* Profile toggle button (shows small popup) */}
                    <div className="profile-area">
                        <button
                            className="profile-btn"
                            aria-label="Toggle profile"
                            onClick={() => setShowProfile((s) => !s)}
                        >
                            <CgProfile className="profile-icon" />
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
                        <li><Link to='/contact' className='link'>Contact</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default Nav