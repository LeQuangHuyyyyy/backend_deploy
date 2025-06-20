import { useEffect, useState } from "react";
import "./index.scss";
import api from "../../config/api";
import { Flex, Spin, Button, Row, Col, notification } from "antd";
import { toast } from "react-toastify";
import { RightOutlined } from "@ant-design/icons";

import CardProduct from "../../components/product";
import { formatMoneyToVND } from "../../currency/currency";
import { useNavigate } from "react-router";
import { showSuccessToast } from "../../config/configToast";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/features/cartSlice";

const ShoppingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filterPrice, setFilterPrice] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let response;

      if (filterPrice === 100000) {
        response = await api.get(`products/?page=${pageNumber}&size=10`);
      } else if (filterPrice === 200000) {
        response = await api.get(`products/?page=${pageNumber}&size=10`);
      } else if (filterPrice === 400000) {
        response = await api.get(`products/?page=${pageNumber}&size=10`);
      } else if (filterPrice === 500000) {
        response = await api.get(`products/?page=${pageNumber}&size=10`);
      } else {
        response = await api.get(`products?page=${pageNumber}&size=10`, {
          timeout: 10000,
        });
      }

      if (
        Array.isArray(response.data.data) &&
        response.data.data.length === 0
      ) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...response.data.data.content]);
        setHasMore(!response.data.data.last);
        console.log(response.data.data.content);
      }
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách sản phẩm!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNumber, filterPrice]);
  const handleAddToCart = async (product) => {
    if (user?.token) {
      try {
        const response = await api.post("CartProducts", {
          quantity: 1,
          productId: product.id,
        });
        showSuccessToast("Thêm vào giỏ hàng thành công!");
        dispatch(addProductToCart(response.data));
      } catch (error) {
        console.log(error); 
        notification.error({
          message: "Thêm vào giỏ hàng thất bại",
        });
      }
    } else {
      notification.error({
        message: "Bạn chưa đăng nhập",
        description: "Hãy đăng nhập để tiếp tục mua hàng!",
      });
    }
  };
  const handleFilterChange = (price) => {
    setFilterPrice((prev) => (prev === price ? 0 : price));
    setProducts([]);
    setPageNumber(0);
    setHasMore(true);
  };

  const handleNavigateProductDetail = (id) => {
    navigate("/product/" + id);
  };

  return (
    <div className="shopping-page-container">
      <Row gutter={24}>
        <Col span={8} className="shopping-filter-section">
          <Button type="primary" className="shopping-filter-button">
            Lọc sản phẩm theo giá
          </Button>
          <Button
            key={filterPrice}
            onClick={() => handleFilterChange(100000)}
            className={`shopping-price-filter ${
              filterPrice === 100000 ? "active" : ""
            }`}
          >
            Dưới {formatMoneyToVND(100000)}
          </Button>
          <Button
            onClick={() => handleFilterChange(200000)}
            className={`shopping-price-filter ${
              filterPrice === 200000 ? "active" : ""
            }`}
          >
            Trên {formatMoneyToVND(200000)}
          </Button>
          <Button
            onClick={() => handleFilterChange(400000)}
            className={`shopping-price-filter ${
              filterPrice === 400000 ? "active" : ""
            }`}
          >
            Trên {formatMoneyToVND(400000)}
          </Button>
          <Button
            onClick={() => handleFilterChange(500000)}
            className={`shopping-price-filter ${
              filterPrice === 500000 ? "active" : ""
            }`}
          >
            Trên {formatMoneyToVND(500000)}
          </Button>
        </Col>
        <Col span={16} className="shopping-product-section">
          <h2>Sản phẩm của chúng tôi</h2>
          {loading && products.length === 0 ? (
            <Flex
              justify="center"
              align="center"
              className="shopping-loading-container"
            >
              <Spin
                style={{ color: "#8a9c7c" }}
                spinning={loading}
                tip="Loading products..."
                size="large"
              />
            </Flex>
          ) : (
            <>
              <Row gutter={[16, 16]}>
                {products.map((product) => (
                  <Col span={8} key={product.productId}>
                    <CardProduct
                      imageUrl={product.images?.[0]?.imageUrl}
                      product={product}
                    />
                  </Col>
                ))}
              </Row>
              {hasMore && (
                <Flex justify="center" className="shopping-load-more-container">
                  <Button
                    className="shopping-load-more-btn"
                    onClick={() => setPageNumber((prev) => prev + 1)}
                    loading={loading}
                    disabled={!hasMore}
                  >
                    Xem thêm sản phẩm <RightOutlined />
                  </Button>
                </Flex>
              )}
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ShoppingPage;
