import React from 'react'
import './nav.css'
import { MdLocalShipping } from 'react-icons/md'
import { AiOutlineSearch } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

const Nav = () => {
    const { loginWithRedirect, logout} = useAuth0();
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
                    <input type='text' value='' placeholder='search'></input>
                    <button><AiOutlineSearch /></button>
                </div>
                <div className='user'>
                    <div className='icon'>
                        <FiLogIn />
                    </div>
                    <div className='btn'>
                        <button onClick={() => loginWithRedirect()}>Login</button>
                    </div>
                    <div className='user2'>
                        <div className='icon'>
                            <CiLogout />
                        </div>
                        <div className='btn2'>
                            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
                        </div>
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