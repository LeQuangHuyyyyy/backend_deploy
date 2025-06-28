import { useEffect, useState } from "react";
import {
  Table,
  Button,
  InputNumber,
  Card,
  Row,
  Col,
  Typography,
  Modal,
  Select,
  Popconfirm,
} from "antd";
import {
  DeleteOutlined,
  ShoppingCartOutlined,
  ExclamationCircleOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import api from "../../config/api";
import "./index.scss";
import { toast } from "react-toastify";
import { showSuccessToast } from "../../config/configToast";
import { formatMoneyToVND } from "../../currency/currency";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProductInRedux,
  resetCart,
} from "../../redux/features/cartSlice";
import { jwtDecode } from "jwt-decode";

const { Title, Text } = Typography;

const { Option } = Select;

const Cart = () => {
  const [dataCart, setDataCart] = useState({ cartItems: [] });
  const [listDiscount, setListDiscount] = useState([]);
  const [seletedDiscount, setSeletectedDiscount] = useState(null);
  const [selectedDiscountPercentage, setSelectedDiscountPercentage] =
    useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchingDataCart = async () => {
    try {
      const response = await api.get(`cart`);
      setDataCart(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi khi tải giỏ hàng");
    }
  };

  const fetchDiscountList = async () => {
    try {
      const response = await api.get("Discount");
      const discounts = response.data.items;
      const filterDiscount = discounts.filter((item) => item.id !== 1);
      setListDiscount(filterDiscount);
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching data!!");
    }
  };

  useEffect(() => {
    fetchDiscountList();
    fetchingDataCart();
  }, []);

  const totalAmount = (dataCart.cartItems ?? []).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discountedTotal = totalAmount * (1 - selectedDiscountPercentage / 100);
  const decodedToken = jwtDecode(localStorage.getItem("token"));
  const cartId = decodedToken.cartId;
  const handleOrder = async () => {
    try {
      const response = await api.post("/orders", {
        discountId: seletedDiscount || 1,
        cartId: cartId,
        shippingAddress: "string",
      });

      const checkoutUrl = response.data?.data?.data?.checkoutUrl;

      if (checkoutUrl) {
        // Redirect to payment gateway
        window.location.href = checkoutUrl;
      } else {
        // If no checkoutUrl, assume success and clear cart
        showSuccessToast(
          response.data?.description || "Tạo đơn hàng thành công!"
        );
        dispatch(resetCart());
        setDataCart({ cartItems: [] });
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error(error.response?.data?.message || "Lỗi khi tạo đơn hàng");
    }
  };

  const navigateToProduct = (id) => {
    navigate(`/product/${id}`);
  };
  const updateQuantity = async (cartItemId, productId, newQuantity) => {
    if (isUpdating) return;

    const oldItem = dataCart.cartItems.find(
      (item) => item.cartItemId === cartItemId
    );
    if (!oldItem || oldItem.quantity === newQuantity) return;

    // Update UI immediately
    setDataCart((prev) => ({
      ...prev,
      cartItems: prev.cartItems.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      ),
    }));

    setIsUpdating(true);
    try {
      if (newQuantity > oldItem.quantity) {
        // Increment quantity
        await api.post(`cart/items`, {
          quantity: 1,
          productId,
        });
      } else {
        // Decrement quantity
        await api.delete(`cart/items/quantity/${cartItemId}`);
      }
      showSuccessToast("Cập nhật số lượng thành công");
    } catch {
      // Rollback on error
      setDataCart((prev) => ({
        ...prev,
        cartItems: prev.cartItems.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: oldItem.quantity }
            : item
        ),
      }));
      toast.error("Lỗi khi cập nhật số lượng!");
    } finally {
      setIsUpdating(false);
    }
  };

  const columns = [
    {
      title: (
        <Text className="text" strong>
          Sản phẩm
        </Text>
      ),
      dataIndex: "productName",
      key: "productName",
      render: (productName, record) => (
        <Text
          className="product-name"
          onClick={() => navigateToProduct(record.productId)}
        >
          {productName}
        </Text>
      ),
    },
    // {
    //   title: (
    //     <Text className="text" strong>
    //       Mô tả
    //     </Text>
    //   ),
    //   dataIndex: "product",
    //   key: "description",
    //   render: (product) => (
    //     <Text className="product-description">{product.description}</Text>
    //   ),
    // },
    {
      title: (
        <Text className="text" strong>
          Giá
        </Text>
      ),
      dataIndex: "price",
      key: "price",
      render: (price) =>
        price !== undefined ? (
          <Text className="price">{price.toLocaleString()} VND</Text>
        ) : (
          <Text className="price">0 VND</Text>
        ),
    },
    {
      title: (
        <Text className="text" strong>
          Số lượng
        </Text>
      ),
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <div className="quantity-control">
          <Button
            icon={<MinusOutlined />}
            onClick={() => {
              if (quantity > 1) {
                updateQuantity(
                  record.cartItemId,
                  record.productId,
                  quantity - 1
                );
              } else {
                handleConfirmDelelete(record.cartItemId);
              }
            }}
            disabled={isUpdating}
          />
          <span className="quantity-display">{quantity}</span>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              updateQuantity(record.cartItemId, record.productId, quantity + 1);
            }}
            disabled={isUpdating}
          />
        </div>
      ),
    },
    {
      title: (
        <Text className="text" strong>
          Tổng
        </Text>
      ),
      key: "total",
      render: (record) => (
        <Text className="total">
          {(record.price * record.quantity).toLocaleString()} VND
        </Text>
      ),
    },
    {
      title: (
        <Text className="text" strong>
          Hành động
        </Text>
      ),
      key: "action",
      render: (record) => (
        <Popconfirm
          title="Xóa mặt hàng này"
          description="Bạn có chắc muốn xóa sản phẩm này ra khỏi giỏ hàng không?"
          onConfirm={() => handleConfirmDelelete(record.cartItemId)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            icon={<DeleteOutlined style={{ fontSize: "27px" }} />}
            disabled={isUpdating}
          >
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const handleConfirmDelelete = async (id) => {
    try {
      await api.delete(`cart/items/${id}`);
      showSuccessToast("Sản phẩm này đã bị xóa khỏi giỏ hàng của bạn!!");
      dispatch(deleteProductInRedux(id));
      // Update local state immediately
      setDataCart((prev) => ({
        ...prev,
        cartItems: prev.cartItems.filter((item) => item.cartItemId !== id),
      }));
    } catch {
      toast.error("Lỗi khi xóa sản phẩm");
    }
  };

  return (
    <div className="cart-container">
      <Row gutter={24}>
        <Col span={18}>
          <Card bordered={false} className="cart-card">
            <Title level={3} className="cart-title">
              <ShoppingCartOutlined /> Giỏ hàng của bạn
            </Title>
            <Table
              dataSource={dataCart.cartItems}
              columns={columns}
              rowKey="cartItemId"
              pagination={false}
              loading={isUpdating}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} className="summary-card">
            <Title level={3} className="summary-title">
              Tóm tắt đơn hàng
            </Title>
            <Text className="total-amount">
              Tổng tiền:{" "}
              <strong>{formatMoneyToVND(discountedTotal)} VND</strong>
            </Text>

            {/* Dropdown chọn discount */}
            <Select
              style={{ width: "100%", marginTop: 10 }}
              placeholder="Chọn mã giảm giá"
              onChange={(value, option) => {
                setSeletectedDiscount(value);
                setSelectedDiscountPercentage(option?.data_percentage || 0);
              }}
              disabled={isUpdating}
            >
              <Option value={null}>Giam 10%</Option>
              {listDiscount.map((discount) => (
                <Option
                  key={discount.id}
                  value={discount.id}
                  data_percentage={discount.percentage}
                >
                  {`${discount.code} - Giảm ${discount.percentage}%`}
                </Option>
              ))}
            </Select>

            <Button
              onClick={handleOrder}
              type="primary"
              block
              className="checkout-btn"
              style={{ marginTop: 10 }}
              disabled={isUpdating}
            >
              Thanh toán ngay
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
