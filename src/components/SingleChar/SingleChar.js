import './SingleChar.scss';

import { NavLink, useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSingleCharByName } from '../../slices/CharListSlice';

import MarvelService from '../../services/MarvelService';

const SingleComic = () => {

    const { singleChar } = useSelector(state => state.CharListSlice);
    const {charId} = useParams();
    const dispatch = useDispatch();
    const {getCharacter} = MarvelService();


    useEffect(()=>{
        getCharacter(charId)
            .then(data => dispatch(getSingleCharByName(data)));
    },[])
    
    return (
        singleChar && <View char={singleChar} />
    )
};

const View = ({char}) => {
    return (
        <div className="single-char">
            <img src={char.thumbnail} alt={char.name} className="single-char__img" />
            <div className="single-char__info">
                <h2 className="single-char__name">{char.name}</h2>
                <p className="single-char__descr">{char.description}</p>
                <p className="single-char__descr">{char.pageCount}</p>
            </div>
            <NavLink to="/" className="single-char__back">Back to all</NavLink>
        </div>
    )
}

export default SingleComic;