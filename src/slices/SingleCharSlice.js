import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MarvelService from '../services/MarvelService';


const initialState = {
    char: null,
    status: 'loading'
};

export const fetchSingleChar = createAsyncThunk(
    'singleChar/fetchSingleChar',
    () => {
        const random = Math.floor( Math.random() * (1011400 - 1011000) + 1011000);
        
       return MarvelService().getCharacter(random);
    });


const singleCharSlice = createSlice({
    name: 'singleChar',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchSingleChar.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchSingleChar.fulfilled, (state, action) => {
                state.status = 'idle';
                state.char = action.payload;
            })
            .addCase(fetchSingleChar.rejected, state => {
                state.status = 'error';
            })
            .addDefaultCase( () => {})
    }
});

export default singleCharSlice.reducer;
