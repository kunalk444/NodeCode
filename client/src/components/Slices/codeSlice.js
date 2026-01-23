import { createSlice } from "@reduxjs/toolkit";

const codeSlice = createSlice({
    name:"codeSlice",
    initialState:null,
    reducers:{
        saveCode:(state,action)=>{
            return action.payload;
        },
        delCode:(state,action)=>{
            return null;
        }
    }
})

export default codeSlice.reducer;
export const{saveCode,delCode}=codeSlice.actions;