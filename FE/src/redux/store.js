// import { configureStore } from '@reduxjs/toolkit'
// import userSlice from "./features/userSlice";

// export const store = configureStore({
//   reducer: {
//     user:userSlice
//   },
// })

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
import { configureStore } from "@reduxjs/toolkit";


import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

// luu tru state vo localStorage (ko mat data khi refresh trang)
// Cấu hình redux-persist
const persistConfig = {
  key: "root",
  version: 1, // 🔹 Đảm bảo version >= 1
  storage, // luu tru trong localStorage
  whitelist: ["user", "cart"], // Chỉ lưu trạng thái `user` , `cart`
};

// Tạo reducer có khả năng lưu trữ(bao quanh rootReducer de redux store luu tru) )
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store với persistedReducer // luu tru trang thai
export const store = configureStore({
  reducer: persistedReducer,
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Vô hiệu hóa kiểm tra serializable
    }),
});

// Tạo persistor để quản lý state đã lưu
export const persistor = persistStore(store);

// Using regular JS export instead of TypeScript type
export const RootState = store.getState();
