import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import { getFromLocal, saveInLocal } from "./localhelper.js";

const persistedState = getFromLocal() || undefined;

const store = configureStore({
    reducer:{
        user : userSlice,
    },
    preloadedState:persistedState
});

store.subscribe(()=>{
    saveInLocal({
        user : store.getState().user,
    });
})

export default store;