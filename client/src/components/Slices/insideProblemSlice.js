import { createSlice } from "@reduxjs/toolkit";

const insideProblemSlice = createSlice({
    name:"insideProblemSlice",
    initialState:{},
    reducers:{
        setProblemData:(state,action)=>{
            return action.payload; 
        },
        removeProblemData:(state,action)=>{
            return {};
        }
    }
})
export default insideProblemSlice.reducer;
export const{setProblemData,removeProblemData} = insideProblemSlice.actions;