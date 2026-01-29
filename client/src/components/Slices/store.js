import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import { getFromLocal, saveInLocal } from "./localhelper.js";
import problemSlice from "./problemsSlice.js"
import insideProblemSlice from "./insideProblemSlice.js";
import codeslice from "./codeSlice.js";
import filterSlice from "./filterSlice.js"
const persistedState = getFromLocal() || undefined;

const store = configureStore({
    reducer:{
        user : userSlice,
        problems : problemSlice,
        insideProblem:insideProblemSlice,
        code:codeslice,
        filters:filterSlice,
    },
    preloadedState:persistedState
});

store.subscribe(()=>{
    saveInLocal({
        user : store.getState().user,
        problems : store.getState().problems,
        insideProblem:store.getState().insideProblem,
        code:store.getState().code,
        filters:store.getState().filters,
    });
})

export default store;