import { createSlice } from "@reduxjs/toolkit";

const problemSlice = createSlice({
    name:'problemSlice',
    initialState:[],
    reducers:{
        saveProblems:(state,action)=>{
            return action.payload;
        }
    }
})

export default problemSlice.reducer;
export const{saveProblems} = problemSlice.actions;