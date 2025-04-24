import { MD5 } from "crypto-js";
import { useHttp } from "../hooks/http.hook";



const MarvelService = () => {
    const { request } = useHttp();

    const BASE_API = 'https://gateway.marvel.com:443/v1/public/';
    const PUBLIC_KEY = '53ea69cb2b87f8facb70e9d7cf3a9273';
    const PRIVATE_KEY = '2bf5e455f7e3df9c939d7d284daed9e12b4bc9cb';
    const _limit = 8;


    const getAuthParams = () => {
        const ts = Date.now().toString(); 
        const hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
        return `apikey=${PUBLIC_KEY}&ts=${ts}&hash=${hash}`;
    };
    
    const secureUrl = (url) => {
        return url ? url.replace(/^http:/, 'https:') : url;
    };

    
    const getAllCharacters = async (offset, limit = _limit) => {
        const res = await request(`${BASE_API}characters?limit=${limit}&offset=${offset}&${getAuthParams()}`);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${BASE_API}characters/${id}?${getAuthParams()}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getComics = async (offset, limit = _limit) => {
        const res = await request(`${BASE_API}comics?limit=${limit}&offset=${offset}&${getAuthParams()}`);
        return res.data.results.map(_transformComics);
    };

    const getSingleComics = async (id) => {
        const res = await request(`${BASE_API}comics/${id}?${getAuthParams()}`);
        return _transformComics(res.data.results[0]);
    };

    const getCharacterName = async (name) => {
        const res = await request(`${BASE_API}/characters?name=${name}&${getAuthParams()}`);
        return _transformCharacter(res.data.results[0]);
    };

    const _transformCharacter = (res) => {
        const updateDescription = (desc) => {
            if (!desc) return 'There is no description for this character';
            return desc.length > 210 ? `${desc.slice(0, 210)}...` : desc;
        };

        return {
            id: res.id,
            name: res.name,
            description: updateDescription(res.description),
            thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`.replace(/^http:/, 'https:'),
            homepage: secureUrl(res.urls?.[0]?.url || "#"),
            wiki: secureUrl(res.urls?.[1]?.url || "#"),
            comics: res.comics?.items || [],
        };
    };

    const _transformComics = (res) => {
        return {
            id: res.id,
            name: res.title,
            description: res.description || 'There is no description',
            language: res.textObjects?.[0]?.language || 'en-us',
            price: res.prices?.[0]?.price === 0 ? "Not found" : `${res.prices[0].price}$`,
            thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`.replace(/^http:/, 'https:'),
            pageCount: res.pageCount ? `${res.pageCount} pages` : "Page count not available",
        };
    };

    return {
        getAllCharacters,
        getCharacter,
        getComics,
        getSingleComics,
        getCharacterName,
    };
};

export default MarvelService;
