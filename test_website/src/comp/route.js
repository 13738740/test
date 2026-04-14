import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./home";
import Chat from "./chat";
import Collection from "./collection";
import Shop from "./shop";
import Admin from './admin';
import About from './about';
import { useAuth0 } from '@auth0/auth0-react';

const AdminRoute = ({ children }) => {
    const { isAuthenticated, user, isLoading } = useAuth0();

    // While Auth0 is checking the session, show nothing or a loader
    if (isLoading) return <div>Loading...</div>;

    // Hardcode your email here if .env isn't working
    const adminList = ["s1373874@live.hkmu.edu.hk"]; 
    
    const userEmail = user?.email?.toLowerCase() || '';
    const isAdmin = isAuthenticated && adminList.includes(userEmail);

    if (!isAdmin) {
        console.log("Access Denied for:", userEmail);
        return <Navigate to='/' replace />;
    }

    return children;
};

const Rout = () => { // Removed 'shop' prop as it's not being used
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/about' element={<About />} />
            {/*<Route path='/chat' element={<Chat />} />*/}
            {/* Protected Admin Route */}
            <Route path='/admin' element={
                <AdminRoute>
                    <Admin />
                </AdminRoute>
            } />
        </Routes>
    );
};

export default Rout;