import { Card, Row, Col, DatePicker, Button, InputNumber } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./index.scss";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../config/api";

const { RangePicker } = DatePicker;

const DashboardStatistic = () => {
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalDoctor, setTotalDoctor] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);
  const [orderProductStats, setOrderProductStats] = useState([]);
  const [orderWorkshopStats, setOrderWorkshopStats] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [revenueData, setRevenueData] = useState([]);
  const [profitOrder, setProfitOrder] = useState([]);

  // Fetch tổng số khách hàng, bác sĩ, nhân viên
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [customerRes, doctorRes, staffRes] = await Promise.all([
          api.get("Accounts/getAllCustomer"),
          api.get("Accounts/getAllDoctor"),
          api.get("Accounts/getAllStaff"),
        ]);
        setTotalCustomer(customerRes.data.total);
        setTotalDoctor(doctorRes.data.total);
        setTotalStaff(staffRes.data.total);
      } catch (error) {
        toast.error("Error fetching summary data");
      }
    };
    fetchAll();
  }, []);

  // Fetch doanh thu theo năm
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await api.get(
          `BookingStatistics/ConfirmedBookingFrequencyByMonth?year=${year}`
        );
        const formattedData = response.data.labels.map((label, index) => ({
          month: label,
          revenue: response.data.data[index],
        }));
        setRevenueData(formattedData);
      } catch {
        toast.error("Error fetching revenue data");
      }
    };
    fetchRevenueData();
  }, [year]);

  // Fetch lợi nhuận đơn hàng
  useEffect(() => {
    const fetchProfit = async () => {
      try {
        const response = await api.get("Order/getProfit");
        const formattedData = response.data.map((item) => ({
          month: `Tháng ${item.month}`,
          revenue: item.revenuePortal,
        }));
        setProfitOrder(formattedData);
      } catch {
        toast.error("Error fetching profit data");
      }
    };
    fetchProfit();
  }, []);

  // Fetch thống kê order product và order workshop theo ngày
  const fetchOrderStats = async () => {
    if (!dateRange[0] || !dateRange[1]) {
      toast.warning("Please select a date range");
      return;
    }
    try {
      const startDate = dateRange[0].format("YYYY-MM-DD");
      const endDate = dateRange[1].format("YYYY-MM-DD");
      // Giả sử API trả về hai mảng: orderProductData, orderWorkshopData
      const [productRes, workshopRes] = await Promise.all([
        api.get(
          `OrderStatistics/ProductOrderByDay?startDate=${startDate}&endDate=${endDate}`
        ),
        api.get(
          `OrderStatistics/WorkshopOrderByDay?startDate=${startDate}&endDate=${endDate}`
        ),
      ]);
      const formattedProduct = productRes.data.labels.map((label, index) => ({
        date: label,
        order: productRes.data.data[index],
      }));
      const formattedWorkshop = workshopRes.data.labels.map((label, index) => ({
        date: label,
        order: workshopRes.data.data[index],
      }));
      setOrderProductStats(formattedProduct);
      setOrderWorkshopStats(formattedWorkshop);
    } catch {
      toast.error("Failed to fetch order statistics");
    }
  };

  return (
    <div className="dashboard-statistic">
      <Row gutter={16} className="summary-cards">
        <Col span={6}>
          <Card className="stat-card customer-card">
            <UserOutlined className="icon" />
            <div>
              <h3>Total User</h3>
              <p>{totalCustomer}</p>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="stat-card doctor-card">
            <UserOutlined className="icon" />
            <div>
              <h3>Total Product</h3>
              <p>{totalDoctor}</p>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="stat-card staff-card">
            <UserOutlined className="icon" />
            <div>
              <h3>Total Workshop</h3>
              <p>{totalStaff}</p>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} className="charts">
        <Col span={24} className="date-picker-container">
          <RangePicker value={dateRange} onChange={setDateRange} />
          <Button
            type="primary"
            onClick={fetchOrderStats}
            style={{ marginLeft: 10 }}
          >
            Load Data
          </Button>
        </Col>

        <Col span={12}>
          <Card title="Order Product Overview" className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderProductStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="order"
                  stroke="#1890ff"
                  strokeWidth={3}
                  name="Order Product"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Order Workshop Overview" className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderWorkshopStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="order"
                  stroke="#faad14"
                  strokeWidth={3}
                  name="Order Workshop"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card
            style={{ margin: "20px 0" }}
            title="Order revenue"
            className="chart-card"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={profitOrder}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="revenue"
                  fill="#ff4500"
                  name={"Tổng doanh thu theo tháng"}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardStatistic;
