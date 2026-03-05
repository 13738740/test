import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "./home";
import Contact from "./contact";
import Collection from "../collection";

const Rout = ({shop})=>{
    return (
        <>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/shop' element={<Home />} />
            <Route path='/collection' element={<Collection />}/>
            <Route path='/contact' element={<Contact />}/>
        </Routes>
        </>
    )
}
export default Rout 