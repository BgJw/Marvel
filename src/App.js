import './Style/Style.scss';

import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MainPage from './components/pages/MainPage';
import Spinner from './components/Spinner/Spinner';

import { fetchComicsList } from './slices/ComicsListSlice';
import { fetchCharList } from './slices/CharListSlice';
import { fetchSingleChar } from './slices/SingleCharSlice';

const Header = lazy(() => import('./components/Header/Header'));
const Page404 = lazy(()=> import('./components/pages/404'));
const ComicsPage = lazy(()=> import('./components/pages/ComicsPage'));
const SingleComic = lazy(()=> import('./components/SingleComic/SingleComic'));
const SingleChar = lazy(()=> import('./components/SingleChar/SingleChar'));

function App() {
    const dispatch = useDispatch();
    const bgColor = useSelector(state => state.CharListSlice.mainPageBgColor);


    useEffect(() => {
        dispatch(fetchSingleChar());
        dispatch(fetchCharList());
        dispatch(fetchComicsList());
    }, [dispatch]);

    return (
        <div className='full'
            style={bgColor && { 'backgroundColor': bgColor }}
        >
            <div className="wrapper">
                <BrowserRouter>
                    <Suspense fallback={ <Spinner /> }>
                        <Header />
                        <Routes>
                            <Route path='/' element={<MainPage />} />
                            <Route path='/comics' element={<ComicsPage />} />
                            <Route path='/comics/:comicId' element={<SingleComic />} />
                            <Route path='/characters/:charId' element={<SingleChar />} />
                            <Route path='*' element={<Page404 />} />
                        </Routes>

                    </Suspense>

                </BrowserRouter>
            </div>

        </div>
    );
}

export default App;
