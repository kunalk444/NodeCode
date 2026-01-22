import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import { getFromLocal, saveInLocal } from "./localhelper.js";
import problemSlice from "./problemsSlice.js"
import insideProblemSlice from "./insideProblemSlice.js";

const persistedState = getFromLocal() || undefined;

const store = configureStore({
    reducer:{
        user : userSlice,
        problems : problemSlice,
        insideProblem:insideProblemSlice
    },
    preloadedState:persistedState
});

store.subscribe(()=>{
    saveInLocal({
        user : store.getState().user,
        problems : store.getState().problems,
        insideProblem:store.getState().insideProblem
    });
})

export default store;