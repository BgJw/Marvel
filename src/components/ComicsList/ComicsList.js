import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchComicsList, selectAll, getSingleComic } from '../../slices/ComicsListSlice';
import setContent from '../../utils/setContent';

import './ComicsList.scss';

const ComicsList = () => {
    const dispatch = useDispatch();
    const comics = useSelector(selectAll);
    const { newComicsLoading, status} = useSelector(state => state.ComicsListSlice);


    return (
        <div className="comics__list">

                {setContent(View, {comics, dispatch}, status, newComicsLoading)}
            <button 
                className="button button__main button__long"
                onClick={() => dispatch(fetchComicsList()) }
                disabled={newComicsLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
};

const View = ({props}) => {
    const {comics, dispatch} = props;
    return (
        <ul className="comics__grid">
            {comics.map( (el, i) => (
                <li key={el.id + i} 
                    className="comics__item"
                    onClick={() => dispatch(getSingleComic(el))}>
                    <NavLink to={`/comics/${el.id}`}>
                        <img className="comics__item-img" src={el.thumbnail} alt={el.name} />
                        <div className="comics__item-name">{el.name}</div>
                        <div className="comics__item-price">{el.price}</div>
                    </NavLink>
                </li>
            ))
}
        </ul>
    )
};

export default ComicsList;