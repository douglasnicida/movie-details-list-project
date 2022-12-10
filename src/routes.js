import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home/Home';
import Filme from './pages/Filme/Filme';
import Header from './components/Header/Header';
import Error from './pages/Error/Error';
import Favoritos from './pages/Favoritos/Favoritos';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="/filme/:id" element={ <Filme/> } />
                <Route path="/favoritos" element={ <Favoritos /> }/>

                <Route path='*' element={ <Error/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;
