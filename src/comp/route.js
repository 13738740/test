import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "./home";
import Contact from "./contact";
import BookDetail from "./BookDetail";
const Rout = ({shop})=>{
    return (
        <>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/contact' element={<Contact />}/>
            <Route path='/book/:id' element={<BookDetail />}/>
        </Routes>
        </>
    )
}
export default Rout 