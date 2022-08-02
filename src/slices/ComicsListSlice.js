import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import MarvelService from '../services/MarvelService';

const comicsList = createEntityAdapter();


const initialState = comicsList.getInitialState({
    singleComic: null,
    offset: 290,
    newComicsLoading: false,
    status: 'initial'
});

export const fetchComicsList = createAsyncThunk(
    'comicsList/fetchComicsList',
    (_, thunkAPI) => {
        const offset = thunkAPI.getState().ComicsListSlice.offset;
        return MarvelService().getComics(offset);
    }
);
 

const comicsListSlice = createSlice({
    name: 'comicsList',
    initialState,
    reducers: {
        getSingleComic: (state, action) => {state.singleComic = action.payload}
    },
    extraReducers: builder => {
        builder
            .addCase(fetchComicsList.pending, state => {
                if (state.status === 'initial') {
                    state.newComicsLoading = true;
                } else {
                    state.newComicsLoading = true;
                    state.status = 'loading';
                }
            })
            .addCase(fetchComicsList.fulfilled, (state, action) => {
                comicsList.upsertMany(state, action.payload);
                state.newComicsLoading = false;
                state.status = 'idle';
                state.offset += 8;
            })
            .addCase(fetchComicsList.rejected, state => {
                state.status = 'error';
            })
            .addDefaultCase( () => {})
    }
});

export default comicsListSlice.reducer;
export const { selectAll } = comicsList.getSelectors(state => state.ComicsListSlice);
export const { getSingleComic } = comicsListSlice.actions;