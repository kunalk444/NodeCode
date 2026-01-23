import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import { getFromLocal, saveInLocal } from "./localhelper.js";
import problemSlice from "./problemsSlice.js"
import insideProblemSlice from "./insideProblemSlice.js";
import codeslice from "./codeSlice.js";
const persistedState = getFromLocal() || undefined;

const store = configureStore({
    reducer:{
        user : userSlice,
        problems : problemSlice,
        insideProblem:insideProblemSlice,
        code:codeslice
    },
    preloadedState:persistedState
});

store.subscribe(()=>{
    saveInLocal({
        user : store.getState().user,
        problems : store.getState().problems,
        insideProblem:store.getState().insideProblem,
        code:store.getState().code,
    });
})

export default store;