import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("jwt") !== null
    ? localStorage.getItem("jwt") : "";

const initialState = {
    jwt: token,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
  
    reducers: {
      login(state, action) {    
          state.jwt = action.payload;
          localStorage.setItem("jwt", action.payload);
      },
  
      logout(state, action) {
        state.jwt = "";   
        localStorage.setItem("jwt", "");  
      }
    }
  });
  
  export const authtActions = authSlice.actions;
  export default authSlice;