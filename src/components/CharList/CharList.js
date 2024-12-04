import { useDispatch, useSelector } from 'react-redux';
import { getCharInfo, fetchCharList, selectAll, getBgColor } from '../../slices/CharListSlice';

import setContent from '../../utils/setContent';

import './CharList.scss';

const CharList = () => {
    const dispatch = useDispatch();
    const chars = useSelector(selectAll);
    const { charInfo, status, newItemsLoading, offset } = useSelector(state => state.CharListSlice);
    return (
        <div className='charList'>
            {
                setContent(View, {chars, dispatch, getCharInfo, charInfo, getBgColor}, status, newItemsLoading)
            }

            <button
                className="button button__main button__long"
                onClick={() => dispatch(fetchCharList())}
                disabled={newItemsLoading}
                style={offset >= 1550 ? { display: 'none' } : { display: '' }}>
                <div
                    className="inner">
                    load more
                </div>
            </button>
        </div>
    );
};

const View = ( {props} ) => {
    const {chars, dispatch, getCharInfo, charInfo, getBgColor } = props;
    
    const content = chars.map(char => {

        const clazz = char.id === charInfo?.id ? 'active': '';
        
        return (
            <li
                className={`list ${clazz}`}
                key={char.id}
                onClick={() => {
                        dispatch(getCharInfo(char)); 
                        dispatch(getBgColor(char.thumbnail))}
                        }>  
                <button>
                    <img src={char.thumbnail} alt={char.name} loading='lazy'/>
                    <div>{char.name}</div>
                </button>
            </li>
        )
    })
    return (
        <ul>
            {content}
        </ul>
    )
}

export default CharList;