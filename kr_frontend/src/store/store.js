import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import managementSlice from "./managementSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    management: managementSlice.reducer,
    auth: authSlice.reducer
  },
});

export default store;
