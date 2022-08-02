import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import MarvelService from '../services/MarvelService';
import { FastAverageColor } from 'fast-average-color';

const charList = createEntityAdapter();


const initialState = charList.getInitialState({
    
    mainPageBgColor: null,

    charInfo: null,
    singleChar: null,
    offset: 605,
    newItemsLoading: false,
    status: 'initial'
});

export const fetchCharList = createAsyncThunk(
    'charList/fetchCharList',
    (_,thunkAPI) => {
        const offset = thunkAPI.getState().CharListSlice.offset;
        return MarvelService().getAllCharacters(offset)
    }
);

export const getBgColor = createAsyncThunk(
    'charList/getBgColor',
    ( url ) => new FastAverageColor().getColorAsync(url, 'single')
)
 

const charListSlice = createSlice({
    name: 'charList',
    initialState,
    reducers: {
        getCharInfo: (state, action) => { 
                state.charInfo = action.payload; 
            },
        getSingleCharByName: (state, action) =>  {state.singleChar = action.payload},
    },
    extraReducers: builder => {
        builder

            .addCase(getBgColor.fulfilled, (state, action) => { state.mainPageBgColor = action.payload.hexa})

            .addCase(fetchCharList.pending, state => {
                if (state.status === 'initial') {
                    state.newItemsLoading = true;
                } else {
                    state.newItemsLoading = true;
                    state.status = 'loading';
                }
            })
            .addCase(fetchCharList.fulfilled, (state, action) => {
                charList.upsertMany(state, action.payload);
                state.newItemsLoading = false;
                state.status = 'idle';
                state.offset += 8;
            })
            .addCase(fetchCharList.rejected, state => {
                state.status = 'error';
            })
            .addDefaultCase( () => {})
    }
});

export default charListSlice.reducer;
export const { selectAll } = charList.getSelectors(state => state.CharListSlice);
export const { getCharInfo, getSingleCharByName } = charListSlice.actions;