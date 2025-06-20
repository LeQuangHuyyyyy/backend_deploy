import { useEffect, useState } from "react";
import "./index.scss";
import api from "../../config/api";
import { Flex, Spin, Button, Row, Col, Input } from "antd";
import {
  RightOutlined,
  CalendarOutlined,
  DollarOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import WorkshopSuggestion from "../../components/WorkshopSuggestion";
import { formatDateVN, formatMoneyToVND } from "../../currency/currency";
import { useNavigate } from "react-router";

const WorkshopPage = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filterPrice, setFilterPrice] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  // Hàm fetch workshop search
  const fetchWorkshopsSearch = async (keyword) => {
    try {
      setLoading(true);
      const response = await api.get(
        `workshops/search?keyword=${encodeURIComponent(keyword)}&page=0&size=10`
      );
      setWorkshops(response.data.content || []);
      setHasMore(false); // Search chỉ lấy 1 trang
    } catch {
      toast.error("Lỗi khi tìm kiếm workshop!");
      setWorkshops([]);
    } finally {
      setLoading(false);
    }
  };

  // Giả lập API hoặc dùng API thật
  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      let response;
      if (filterPrice === 100000) {
        response = await api.get(
          `workshops/price-range?minPrice=0&maxPrice=100000&page=${pageNumber}&size=10`
        );
      } else if (filterPrice === 200000) {
        response = await api.get(
          `workshops/price-range?minPrice=200000&maxPrice=400000&page=${pageNumber}&size=10`
        );
      } else if (filterPrice === 400000) {
        response = await api.get(
          `workshops/price-range?minPrice=400000&maxPrice=500000&page=${pageNumber}&size=10`
        );
      } else if (filterPrice === 500000) {
        response = await api.get(
          `workshops/price-range?minPrice=500000&maxPrice=10000000&page=${pageNumber}&size=10`
        );
      } else {
        response = await api.get(`workshops?page=${pageNumber}&size=10`);
      }

      if (
        Array.isArray(response.data.content) &&
        response.data.content.length === 0
      ) {
        setHasMore(false);
      } else {
        setWorkshops((prev) => [...prev, ...response.data.content]);
      }
    } catch {
      toast.error("Lỗi khi lấy danh sách workshop!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searching) fetchWorkshops();
    // eslint-disable-next-line
  }, [pageNumber, filterPrice]);

  // Xử lý search
  const handleSearch = () => {
    if (searchKeyword.trim() === "") {
      setSearching(false);
      setPageNumber(0);
      setWorkshops([]);
      setHasMore(true);
      fetchWorkshops();
      return;
    }
    setSearching(true);
    fetchWorkshopsSearch(searchKeyword);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFilterChange = (price) => {
    setFilterPrice((prev) => (prev === price ? 0 : price));
    setWorkshops([]);
    setPageNumber(0);
    setHasMore(true);
    setSearching(false);
    setSearchKeyword("");
  };

  const handleNavigateWorkshopDetail = (id) => {
    navigate("/workshop/" + id);
  };

  return (
    <div className="workshop-page-container">
      <Row gutter={24}>
        <Col span={6} className="workshop-filter-section">
          <Button type="primary" className="workshop-filter-button">
            Lọc workshop
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
        <Col span={17} className="workshop-list-section">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Input
              placeholder="Tìm kiếm workshop..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={handleInputKeyDown}
              style={{ width: 250, marginRight: 8 }}
              allowClear
            />
            <Button
              icon={<SearchOutlined />}
              type="primary"
              className="workshop-search-btn"
              onClick={handleSearch}
            >
              Tìm kiếm
            </Button>
          </div>
          <h2>Danh sách Workshop</h2>
          {loading && workshops.length === 0 ? (
            <Flex
              justify="center"
              align="center"
              className="workshop-loading-container"
            >
              <Spin
                spinning={loading}
                tip="Loading workshops..."
                size="large"
              />
            </Flex>
          ) : (
            <>
              <Row gutter={[16, 16]}>
                {workshops.map((item) => (
                  <Col span={6} key={item.id}>
                    {/* Dùng lại card của WorkshopSuggestion */}
                    <div
                      className="workshop-card"
                      onClick={() =>
                        handleNavigateWorkshopDetail(item.workshopId)
                      }
                    >
                      <img
                        src={item.urlImage}
                        alt="workshop"
                        className="workshop-img"
                      />
                      <div className="workshop-desc">{item.workshopTitle}</div>
                      <div className="workshop-price">
                        <DollarOutlined /> {formatMoneyToVND(item.price)}
                      </div>
                      <div className="workshop-date">
                        <CalendarOutlined /> {formatDateVN(item.createAt)}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              {hasMore && !searching && (
                <Flex justify="center" className="workshop-load-more-container">
                  <Button
                    className="workshop-load-more-btn"
                    onClick={() => setPageNumber((prev) => prev + 1)}
                    loading={loading}
                    disabled={!hasMore}
                  >
                    Xem thêm workshop <RightOutlined />
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

export default WorkshopPage;
