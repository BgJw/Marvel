import './SingleComic.scss';

import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MarvelService from '../../services/MarvelService';
import { useEffect } from 'react';
import { getSingleComic } from '../../slices/ComicsListSlice';


const SingleComic = () => {
    
    const { singleComic } = useSelector(state => state.ComicsListSlice);
    const {comicId} = useParams();
    const dispatch = useDispatch();
    const {getSingleComics} = MarvelService();
    
    useEffect(()=>{
        getSingleComics(comicId)
            .then(data => dispatch(getSingleComic(data)));
    },[])
    
    return (
        singleComic? <View comic={singleComic} />: null
    )
};

const View = ({comic}) => {
    return (
        <div className="single-comic">
            <img src={comic.thumbnail} alt={comic.name} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comic.name}</h2>
                <p className="single-comic__descr">{comic.description}</p>
                <p className="single-comic__descr">{comic.pageCount}</p>
                <p className="single-comic__descr">Language: {comic.language}</p>
                <div className="single-comic__price">{comic.price}</div>
            </div>
            <NavLink to="/comics" className="single-comic__back">Back to all</NavLink>
        </div>
    )
}

export default SingleComic;