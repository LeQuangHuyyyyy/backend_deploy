import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
// luu tru nhieu slice nhu userSlice, productSlice, cartSlice,V.V.V
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default rootReducer;
