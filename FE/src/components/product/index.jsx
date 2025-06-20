import React from "react";
import { motion } from "framer-motion";
import "./index.scss";

import { formatMoneyToVND } from "../../currency/currency";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/api";
import { showSuccessToast } from "../../config/configToast";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/features/cartSlice";
import { RootState } from "../../redux/store";
import { notification } from "antd";

const CardProduct = ({ product, imageUrl }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleAddFoodToCart = async () => {
    if (user) {
      try {
        const response = await api.post("cart/items", {
          quantity: 1,
          productId: product.id,
        });
        showSuccessToast("Thêm sản phẩm vào giỏ hàng thành công!!");
        dispatch(addProductToCart(response.data));
      } catch (error) {
        toast.error("Error while resolving!!");
        console.log(error);
      }
    } else {
      notification.error({
        message: "Thêm vào giỏ hàng thất bại!",
        description: "Bạn cần đăng nhập tài khoản.",
        duration: 5,
      });
    }
  };
  const navigate = useNavigate();
  const handleNavigateProductDetail = () => {
    navigate("/product/" + product.productId);
  };
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="image" onClick={handleNavigateProductDetail}>
        <img src={imageUrl} alt={"image"} />
      </div>
      <div className="content">
        <h3 className="name">
          {product.productName.substring(0, 20)}
          {product.productName.length > 20 && "..."}
        </h3>
        <p className="price">{formatMoneyToVND(product.price)}</p>
        <p className="description">
          {product.description.substring(0, 50)}
          {product.description.length > 50 && "..."}
        </p>
      </div>

      <motion.button
        onClick={handleAddFoodToCart}
        className="btn"
        whileTap={{ scale: 0.95 }}
      >
        Thêm vào giỏ hàng
      </motion.button>
    </motion.div>
  );
};

export default CardProduct;
