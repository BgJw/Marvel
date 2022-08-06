import { useSelector } from 'react-redux';
import Skeleton from '../Skeleton/Skeleton';
import './CharInfo.scss';


const CharInfo = () => {

    const {charInfo} = useSelector(state => state.CharListSlice);

    return (
        <div className='char__wrapper'>
            {charInfo ? <View char={charInfo} /> : <Skeleton />}
        </div>
    );
};



const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    return (
        <>
            <header className='char__info'>
                <img className='char__info-img' src={thumbnail} alt={name} />
                <section className='char__info-desc'>
                    <h3>{name}</h3>
                    <a className='button button__main'
                        href={homepage}
                        target={'_blank'}
                        rel="noreferrer">
                        <div className='inner'>
                            HOMEPAGE
                        </div>
                    </a>
                    <a className='button button__secondary'
                        href={wiki}
                        target={'_blank'}
                        rel="noreferrer">
                        <div className='inner'>
                            WIKI
                        </div>
                    </a>
                </section>
            </header>

            <p>
                {
                    description
                }
            </p>
                <h3>Comics: </h3>            
            <ul className="char__comics">
                {comics.length ?
                    comics.map((el, i) => {
                        if (i > 20) { return false }
                        else {
                            return (
                            <li className="char__comics-item"
                                key={el.resourceURI}>
                                {el.name}
                            </li>
                        )
                        }
                    })
                    :
                    <h5>This char dont have any comics</h5>
                }
            </ul>
        </>
    )
};

export default CharInfo;