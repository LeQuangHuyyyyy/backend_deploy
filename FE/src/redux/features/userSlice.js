import { createSlice } from "@reduxjs/toolkit";

// default value
const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState, // => initialState: initialState
  reducers: {
    // nhận vào state hien tai va update bang payload
    login: (state, action) => {
      console.log("Redux received login action:", action.payload);
      return action.payload; // action.payload === user
    },
    logout: () => initialState, // null
  },
});
export const { login, logout } = userSlice.actions;
export const selectUser = (store) => store.user; // lay du lieu tai khoan tu dong cap nha=> const user = useSelector(selectUser);
export default userSlice.reducer;
