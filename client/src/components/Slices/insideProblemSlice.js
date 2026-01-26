import { createSlice } from "@reduxjs/toolkit";

const insideProblemSlice = createSlice({
    name:"insideProblemSlice",
    initialState:{},
    reducers:{
        setProblemData:(state,action)=>{
            return {...action.payload,success:true}; 
        },
        removeProblemData:(state,action)=>{
            return {success:false};
        }
    }
})
export default insideProblemSlice.reducer;
export const{setProblemData,removeProblemData} = insideProblemSlice.actions;