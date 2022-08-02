import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Page404 from './components/pages/404';
import ComicsPage from './components/pages/ComicsPage';
import MainPage from './components/pages/MainPage';
import SingleComic from './components/SingleComic/SingleComic';
import SingleChar from './components/SingleChar/SingleChar';
import './Style/Style.scss';


import { fetchComicsList } from './slices/ComicsListSlice';
import { fetchCharList } from './slices/CharListSlice';
import { fetchSingleChar } from './slices/SingleCharSlice';


function App() {
    const dispatch = useDispatch();
    const bgColor = useSelector(state => state.CharListSlice.mainPageBgColor);


    useEffect(() => {
        dispatch(fetchSingleChar());
        dispatch(fetchCharList());
        dispatch(fetchComicsList());
    }, []);

    return (
        <div className='full'
            style={bgColor && { 'backgroundColor': bgColor }}
            >
            <div className="wrapper">
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/comics' element={<ComicsPage />} />
                        <Route path='/comics/:comicId' element={<SingleComic />} />
                        <Route path='/characters/:charId' element={<SingleChar />} />
                        <Route path='*' element={<Page404 />} />
                    </Routes>
                </BrowserRouter>
            </div>

        </div>
    );
}

export default App;
