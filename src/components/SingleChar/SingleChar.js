import './SingleChar.scss';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


const SingleComic = () => {
    const { singleChar } = useSelector(state => state.CharListSlice);

    
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
            <NavLink to="/comics" className="single-char__back">Back to all</NavLink>
        </div>
    )
}

export default SingleComic;