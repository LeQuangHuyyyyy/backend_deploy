//import { CiSearch } from "react-icons/ci";
import { Button, Input } from "antd";
import "./index.scss";
import { TiUser } from "react-icons/ti";
import { BiSolidCart } from "react-icons/bi";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { LogoutOutlined } from "@ant-design/icons";

import { persistor } from "./../../redux/store";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [balance, setBalance] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {}, [isLoggedIn]);

  const handleNavigateLoginPage = () => {
    navigate("/loginAndRegister");
  };

  const handleNavigateHomePage = () => {
    navigate("/");
  };

  const handleNavigateCartPage = () => {
    navigate("/cart");
  };

  const handleNavigateProfilePage = () => {
    navigate("/my-account/profile");
  };

  const handleNavigateProductsPage = () => {
    navigate("/product");
  };

  const handleNavigateServicesPage = () => {
    navigate("/services");
  };

  const handleNavigatePagesPage = () => {
    navigate("/pages");
  };

  const handleNavigateBlogPage = () => {
    navigate("/blog");
  };

  const handleNavigateContactUsPage = () => {
    navigate("/contact-us");
  };
  return (
    <>
      <div className="header">
        <div className="header__left" onClick={handleNavigateHomePage}>
          <img
            src="https://res.cloudinary.com/dur2ihrqo/image/upload/v1749372179/footer_mqh6fc.png"
            alt="Logo"
            className="header__logo"
          />
        </div>
        <div className="header__center">
          <ul className="header__menu">
            <li onClick={handleNavigateHomePage}>Home</li>
            <li onClick={handleNavigateProductsPage}>Product</li>
            <li onClick={handleNavigateServicesPage}>Services</li>
            <li onClick={handleNavigatePagesPage}>Pages</li>
            <li onClick={handleNavigateBlogPage}>Social</li>
            <li onClick={handleNavigateContactUsPage}>Contact Us</li>
          </ul>
        </div>
        <div className="header__right">
          {isLoggedIn ? (
            <>
              <div className="profile-user" onClick={handleNavigateProfilePage}>
                <TiUser className="user_icon" size={28} />
              </div>
              <div
                className="logout"
                onClick={() => {
                  dispatch(logout());
                  persistor.purge(); // Xoá redux-persist khỏi localStorage
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                  navigate("/loginAndRegister");
                }}
              >
                <LogoutOutlined className="logout-icon" />
              </div>
            </>
          ) : (
            <>
              <div className="profile-user" onClick={handleNavigateLoginPage}>
                <p>Đăng nhập / Đăng ký</p>
              </div>
            </>
          )}
          <div className="cart" onClick={handleNavigateCartPage}>
            <BiSolidCart className="cart_icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
