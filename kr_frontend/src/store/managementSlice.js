import { createSlice } from "@reduxjs/toolkit";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../api";

const initialState = {
  allItems: [],
};

const managementSlice = createSlice({
  name: "management",
  initialState,

  reducers: {
    // =========== add item ============
    addItem(state, action) {
      const newItem = action.payload;      
        state.allItems.push(newItem);
    },

    //============ delete item ===========

    deleteItem(state, action) {
      const id = action.payload;
        state.allItems = state.allItems.filter((item) => item.id !== id);      
    },

    setItems(state, action) {
      action.payload.forEach(element => {
        state.allItems.push(element);
      });
    },

    editProduct(state, action) {
        state.allItems = state.allItems.filter((item) => item.id !== action.payload.id);        
        state.allItems.push(action.payload);
    }
  }
});

export const managementActions = managementSlice.actions;
export default managementSlice;
