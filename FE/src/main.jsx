import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { persistor, store } from "./redux/store.js";
import App from './App.jsx'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react.js';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
    //nay khien cho app render 2 lan ,React sẽ gọi lại useEffect và các hàm để phát hiện lỗi trong chế độ phát triển.

    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* tranh truong hop load cham qua, ma redux nhanh tay lay => sai (dung persistGate) */}
      <App />
      <ToastContainer />
    </PersistGate>
  </Provider>
)
