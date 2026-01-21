import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"userSlice",
    initialState:{
        name:null,
        id:null,
        email:null,
        isLoggedIn:false
    },
    reducers:{
        saveUserData:(state,action)=>{
            return {...action.payload,isLoggedIn:true};
        },
        delUserData:(state,action)=>{
            state.email=null;
            state.id = null;
            state.name = null;
            state.isLoggedIn = true;
        }
    }
})

export const{saveUserData,delUserData} = userSlice.actions;
export default userSlice.reducer;