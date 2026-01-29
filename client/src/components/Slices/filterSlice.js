import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name : "filterSlice",
    initialState:{
        tag : "all",
        status : "all"
    },
    reducers:{
        changeFilters:(state,action)=>{
            if(action.payload.type==="tag")state.tag = action.payload.tag;
            state.status = action.payload.status;            
        }
    }
});

export default filterSlice.reducer;
export const{changeFilters} = filterSlice.actions;