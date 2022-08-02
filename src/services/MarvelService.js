import { useHttp } from "../hooks/http.hook";



const MarvelService = () => {

    const { request } = useHttp();

    const BASE_API = 'https://gateway.marvel.com:443/v1/public/';
    const API_KEY = 'apikey=53ea69cb2b87f8facb70e9d7cf3a9273';
    const _limit = 8;


    const getAllCharacters = async (offset, limit = _limit) => {
        const res = await request(`${BASE_API}characters?limit=${limit}&offset=${offset}&${API_KEY}`)
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${BASE_API}characters/${id}?${API_KEY}`);
        
        return _transformCharacter(res.data.results[0]);
    };

    const getComics = async (offset, limit = _limit) => {
        const res = await request(`${BASE_API}comics?limit=${limit}&offset=${offset}&${API_KEY}`);

        return res.data.results.map(_transformComics);
    }

    const getSingleComics = async (id) => {
        const res = await request(`${BASE_API}comics/${id}?${API_KEY}`)

        return _transformComics(res.data.results[0]);
    }

    const getCharacterName = async (name) => {
        const res = await request(`${BASE_API}/characters?name=${name}&${API_KEY}`)

        return _transformCharacter(res.data.results[0]);

    }


    const _transformCharacter = (res) => {

        function updateDescription(char) {
            if (char.length > 210) {
                return char.slice(0, 140) + '...';
            }
            else if (!char) {
                return 'There is no description for this character';
            }
            else {
                return char;
            }
        }

        return {
            id: res.id,
            name: res.name,
            description: updateDescription(res.description),
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items,
        }
    }
    const _transformComics = (res) => {

        return {
            id: res.id,
            name: res.title,
            description: res.description || 'There is no description',
            language: res.textObjects.language || 'en-us',
            price: res.prices[0].price === 0 ? "Not found" : res.prices[0].price + '$',
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            pageCount: res.pageCount + ' pages'
        }
    }



    return {
        getAllCharacters,
        getCharacter,
        getComics,
        getSingleComics,
        getCharacterName
    }
}

export default MarvelService;