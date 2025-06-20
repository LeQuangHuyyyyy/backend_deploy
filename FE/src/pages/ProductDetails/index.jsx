import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Carousel,
  Flex,
  Breadcrumb,
  notification,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import api from "../../config/api";
import { toast } from "react-toastify";
import "./index.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ProductDetailInfo from "../../components/productdetailinfo";
import QuantitySelector from "../../components/button";
import CarouselProductWithThumb from "../../components/carousel-product";
import CarouselProductWithLightbox from "../../components/carousel-product";
import { formatMoneyToVND } from "../../currency/currency";
import CardProduct from "../../components/product";
import { showSuccessToast } from "../../config/configToast";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/features/cartSlice";

const ProductDetail = () => {
  const { id } = useParams(); // Extract the order ID from the URL
  const navigate = useNavigate();

  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((store) => store.user);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const dispatch = useDispatch();
  const handleQuantityChange = (newValue) => {
    setQuantity(newValue);
    console.log("Số lượng:", newValue);
  };
  const handleAddToCart = async () => {
    if (!product) return;

    if (user) {
      
      try {
        const response = await api.post(
          "cart/items",
          {
            quantity: quantity,
            productId: product.productId,
          },
         
        );
        showSuccessToast("Thêm sản phẩm vào giỏ hàng thành công!");
        dispatch(addProductToCart(response.data));
      } catch (error) {
        console.log(error);
        if (error.code === "ECONNABORTED") {
          toast.error("Kết nối bị timeout. Vui lòng thử lại!");
        } else {
          toast.error("Lỗi khi thêm vào giỏ hàng!");
        }
      }
    } else {
      notification.warning({
        message: "Không thể thêm sản phẩm này",
        description: "Bạn cần đăng nhập tài khoản.",
        duration: 5,
      });
      navigate("/login");
    }
  };
  const fetchProductDetail = async () => {
    try {
      const response = await api.get(`products/${id}`);
      //const idCategory = parseInt(response.data.category.id, 10);
      //setIdCategory(idCategory);
      console.log("Product fetched:", response.data);
      return setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error(error.response.data);
      return null;
    }
  };
  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  // const fetchDataCategory = async () => {
  //   try {
  //     const responseCategory = await api.get(`category/${idCategory}`);
  //     setCategory(responseCategory.data);
  //     const responseSolution = await api.get(
  //       `Solutions/${responseCategory.data.solutionId}`
  //     );
  //     setSolution(responseSolution.data);
  //   } catch (error) {
  //     toast.error("Lỗi khi gọi API!"); // Hiển thị thông báo lỗi
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchDataCategory();
  // }, []);

  // if (!product || !category ) {
  //   return <p>Loading...</p>;
  // }

  // Gọi hàm fetchDataCategory ngay khi component mount

  //console.log("imageList", imageList);

  useEffect(() => {
    // Gọi API lấy sản phẩm gợi ý (ví dụ: random 4 sản phẩm)
    const fetchSuggested = async () => {
      try {
        const res = await api.get("/products?page=0&size=4");
        setSuggestedProducts(res.data.data.content);
      } catch (err) {
        // Xử lý lỗi nếu cần
        console.log(err);
      }
    };
    fetchSuggested();
  }, []);

  if (!product) {
    return <p>Đang tải thông tin sản phẩm...</p>;
  }

  return (
    <div
      style={{
        padding: 40,
        marginLeft: "10vw",
        marginRight: "10vw",
        backgroundColor: "#fdf6ee",
      }}
    >
      {/* <Breadcrumb
        style={{ paddingLeft: "10%", marginBottom: "2vh", fontSize: "1rem" }}
        items={[
          {
            title: <Link to="/">Home</Link>,
          },
          {
            title: <Link to="">{category?.name}</Link>,
          },
        ]}
      /> */}
      <Row
        gutter={16}
        className="productdetail"
        style={{ marginTop: 10, paddingBottom: 20 }}
      >
        <Col span={8}>
          {/* <CarouselProduct numberOfSlide={1} id={productDetailId} />
          <CarouselProduct numberOfSlide={4} id={productDetailId} /> */}
          <CarouselProductWithLightbox images={product.images} />
        </Col>
        <Col span={16}>
          <Card
            title={
              <span
                style={{
                  fontSize: "1.5rem",
                  lineHeight: "2.25rem",
                  letterSpacing: ".01em",
                  fontWeight: 600,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  marginTop: "10px",
                }}
              >
                {product.productName}
              </span>
            }
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              fontSize: "1.5rem",
              lineHeight: "2.25rem",
              letterSpacing: ".01em",
            }}
          >
            <p
              style={{
                fontSize: "2.25rem",
                fontWeight: "600",
                color: "#8a9c7c",
                paddingBottom: "3vh",
              }}
            >
              Giá: {formatMoneyToVND(product.price)}
            </p>

            <div
              className="productdetail-info"
              style={{ display: "flex", alignItems: "" }}
            >
              <p className="productdetail-info__title">Mô tả ngắn</p>
              <p
                className="productdetail-info__name"
                style={{ marginRight: "15%", marginLeft: "8.9vw" }}
              >
                {product.description}
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <QuantitySelector
                defaultValue={1}
                min={1}
                max={10}
                onChange={handleQuantityChange}
              />
            </div>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              style={{ borderRadius: "8px", backgroundColor: "#8a9c7c" }}
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Phần bạn có thể thích */}
      <div className="suggested-products-section">
        <h3>Bạn có thể thích</h3>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={4}
          navigation
          autoplay={true}
          // pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            480: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {suggestedProducts.map((product) => (
            <SwiperSlide key={product.productId}>
              <CardProduct
                product={product}
                imageUrl={product.images?.[0]?.imageUrl}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductDetail;
