import {configureStore} from "@reduxjs/toolkit";
import animeReducer from "./slices/HeroSlice"

export const store = configureStore({
    reducer:{
        anime : animeReducer
    }
})