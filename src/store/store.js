import { configureStore } from "@reduxjs/toolkit";
import CharListSlice from "../slices/CharListSlice";
import ComicsListSlice from "../slices/ComicsListSlice";
import SingleCharSlice from '../slices/SingleCharSlice';

const store = configureStore({
    reducer: { CharListSlice, SingleCharSlice, ComicsListSlice },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;