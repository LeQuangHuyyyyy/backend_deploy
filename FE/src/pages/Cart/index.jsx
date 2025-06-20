import { useEffect, useState } from "react";
import {
  Table,
  Button,
  InputNumber,
  message,
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import {
  deleteProductInRedux,
  resetCart,
} from "../../redux/features/cartSlice";

const { Title, Text } = Typography;
const { confirm } = Modal;
const { Option } = Select;

const Cart = () => {
  const [dataCart, setDataCart] = useState({ cartItems: [] });
  const [listDiscount, setListDiscount] = useState([]);
  const [count, setCount] = useState(1);
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
    // fetchDiscountList();
    fetchingDataCart();
  }, [count]);

  const totalAmount = (dataCart.cartItems ?? []).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discountedTotal = totalAmount * (1 - selectedDiscountPercentage / 100);

  const handleOrder = async () => {
    try {
      const response = await api.post("Order", {
        discountId: seletedDiscount || 1,
      });
      showSuccessToast(response.data.message);
      dispatch(resetCart());
      setDataCart({ cartItems: [] });
    } catch {
      toast.error("Lỗi khi thanh toán");
    }
  };

  const confirmOrder = () => {
    confirm({
      title: (
        <Title level={2} className="modal-title">
          Xác nhận đặt hàng
        </Title>
      ),
      icon: (
        <ExclamationCircleOutlined
          style={{ fontSize: "28px", color: "#faad14" }}
        />
      ),
      content: (
        <Text className="modal-content">
          Bạn có chắc chắn muốn đặt hàng với tổng số tiền{" "}
          <strong>{formatMoneyToVND(discountedTotal)} VND</strong> không?
        </Text>
      ),
      okText: "Xác nhận",
      cancelText: "Hủy",
      centered: true,
      width: 500,
      onOk: handleOrder,
    });
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
              <Option value={null}>KHÔNG ÁP DỤNG MÃ</Option>
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
              onClick={confirmOrder}
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
