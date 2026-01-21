import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import { getFromLocal, saveInLocal } from "./localhelper.js";
import problemSlice from "./problemsSlice.js"

const persistedState = getFromLocal() || undefined;

const store = configureStore({
    reducer:{
        user : userSlice,
        problems : problemSlice
    },
    preloadedState:persistedState
});

store.subscribe(()=>{
    saveInLocal({
        user : store.getState().user,
        problems : store.getState().problems,
    });
})

export default store;