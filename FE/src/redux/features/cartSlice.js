import { createSlice } from "@reduxjs/toolkit";

// default value
const initialState = {
  items: [],
  totalAmount: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartData: (state, action) => {
      return action.payload;
    },

    addProductToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        existingItem.quantity += action.payload.quantity;
      } else {
        // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
        state.items.push(action.payload);
      }
    },

    deleteProductInRedux: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    resetCart: () => [],
  },
});
export const {
  addProductToCart,
  remove,
  increase,
  decrease,
  getProductTotal,
  getProductItems,
  addCartData,
  deleteProductInRedux,
  resetCart,
} = cartSlice.actions;
export const selectCart = (store) => store.cart; // lay du lieu tai khoan tu dong cap nha=> const user = useSelector(selectUser);
export default cartSlice.reducer;
