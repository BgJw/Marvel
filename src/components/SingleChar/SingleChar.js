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
        <div className="single-comic">
            <img src={char.thumbnail} alt={char.name} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{char.name}</h2>
                <p className="single-comic__descr">{char.description}</p>
                <p className="single-comic__descr">{char.pageCount}</p>
            </div>
            <NavLink to="/" className="single-comic__back">Back to all</NavLink>
        </div>
    )
}

export default SingleComic;