import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import Layout from "./components/layout";
import Home from "./pages/Homes";
import LoginAndRegister from "./pages/LoginAndRegister";
import Services from "./pages/Services";
import YouknowWho from "./pages/YouknowWho";
import ActivateWorkshopOwner from "./pages/ActivateWorkshopOwner";
import DashboardInstructor from "./pages/DashboardInstructor";
import ProductDetail from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import ProductPage from "./pages/Product";
import UploadExample from "./utils/imagekit-upload";
import WorkshopPage from "./pages/WorkshopPage";
import HistoryTransaction from "./pages/HistoryTransaction";

import PaymentQR from "./pages/PaymentQR";
import BankAccountRegister from "./pages/BankAccount";
import ChangePassword from "./pages/changepassword";

import Profile from "./pages/Profile/index";
import HistoryTicket from "./pages/History-Ticket";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import MarketingPage from "./pages/Marketing";
import WorkshopDetailsPage from "./pages/WorkshopDetailsPage";
import WorkshopDetails from "./pages/WorkshopDetails";
import LayoutProfile from "./components/Layout-Profile"
import OrderSuccess from "./pages/order-success";
import OrderFailed from "./pages/order-failed";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/PaymentQR",
          element: <PaymentQR />,
        },
        {
          path: "/BankAccountRegister",
          element: <BankAccountRegister />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/Banlaai",
          element: <YouknowWho />,
        },
        {
          path: "/activateWorkshopOwner",
          element: <ActivateWorkshopOwner />,
        },
        {
          path: "/dashboardInstructor",
          element: <DashboardInstructor />,
        },
        {
          path: "/product/:id",
          element: <ProductDetail />,
        },
        {
          path: "/workshop/:id",
          element: <WorkshopDetails />,
        },
        {
          path: "/product",
          element: <ProductPage />,
        },
        {
          path: "/upload",
          element: <UploadExample />,
        },
        {
          path: "/workshopdetails",
          element: <WorkshopDetailsPage />,
        },
        {
          path: "/workshop",
          element: <WorkshopPage />,
        },
        {
          path: "/historyTransaction",
          element: <HistoryTransaction />,
        },
        {
          path: "forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: "marketing",
          element: <MarketingPage />,
        },
        {
          path: "order-success",
          element: <OrderSuccess />,
        },
        {
          path: "order-failed",
          element: <OrderFailed />,
        },
        {
          path: "/my-account",
          element: <LayoutProfile />,
          children: [
            {
              path: "/my-account/profile",
              element: <Profile />,
            },
            {
              path: "change-password",
              element: <ChangePassword />,
            },
            {
              path: "history-ticket",
              element: <HistoryTicket />,
            },
          ],
        },
      ],
    },
    {
      path: "/loginAndRegister",
      element: <LoginAndRegister />,
    },
  ]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <RouterProvider router={router} />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
