import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "./home";
import Contact from "./contact";

const Rout = ({shop})=>{
    return (
        <>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/contact' element={<Contact />}/>
        </Routes>
        </>
    )
}
export default Rout 