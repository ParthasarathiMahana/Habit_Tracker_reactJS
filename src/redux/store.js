import { configureStore } from "@reduxjs/toolkit";
import { habitReducer } from "./reducers/habitReducer";

export const store = configureStore({
    reducer:{
        habitReducer
    }
});