import Banner from "../Banner/Banner";
import CharInfo from "../CharInfo/CharInfo";
import CharList from "../CharList/CharList";
import SearchByName from "../SeachByName/SearchByName";


const MainPage = () => {
    return (
        <>
            <Banner />
            <div className='char__content'>
                <CharList />
                <div className='char_panel'>
                    <SearchByName />
                    <CharInfo />
                </div>
            </div>
        </>
    );
};

export default MainPage;