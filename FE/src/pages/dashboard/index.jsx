import { useState } from "react";
import {
  DashboardOutlined,
  DesktopOutlined,
  FileOutlined,
  LogoutOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.scss";

// icon
import { MdManageAccounts } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { MdDiscount } from "react-icons/md";
import { MdOutlineDiscount } from "react-icons/md";
import { FaBlog } from "react-icons/fa";

import { Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { RootState } from "../../redux/store";
import { jwtDecode } from "jwt-decode";

const { Content, Sider } = Layout;
function getItem(label, key, icon, children, onClick) {
  return {
    key,
    icon,
    children,
    label: onClick ? (
      <span onClick={onClick} style={{ cursor: "pointer" }}>
        {label}
      </span>
    ) : (
      <Link to={`/dashboard/${key}`}>{label}</Link>
    ),
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const items = [
    getItem(
      "Dashboard",
      "",
      <DashboardOutlined style={{ fontSize: "30px" }} />
    ),
    getItem(
      "Quản lý tài khoản",
      "manage-account",
      <MdManageAccounts size={33} />,
      [
        getItem(
          "Danh sách giảng viên",
          "manage-list-instructor",
          <MdManageAccounts size={33} />
        ),
        getItem(
          "Danh sách khách hàng",
          "manage-list-user",
          <MdManageAccounts size={33} />
        ),
      ]
    ),

    getItem(
      "Đơn hàng đợi duyệt",
      "manage-order",
      <MdOutlineProductionQuantityLimits size={30} />,
      [
        getItem(
          "Quản lý đơn yêu cầu hủy",
          "manage-request-cancelOrder",
          <MdOutlineProductionQuantityLimits size={30} />
        ),
      ]
    ),

    getItem("Quản lý mã giảm giá", "manage-discount", <MdDiscount size={30} />),
    getItem("Quản lý blog", "blog-management", <FaBlog size={30} />),
    getItem("Quản lý hình ảnh", "manage-images", <TeamOutlined />),
    getItem("Quản lý thể loại", "manage-category", <FileOutlined />),
    getItem("Quản lý sản phẩm", "manage-products", <TeamOutlined />, ),

    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: (
        <div onClick={handleLogout}>
          <span>Đăng xuất</span>
        </div>
      ),
    },
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const userRole = jwtDecode(localStorage.getItem("token")).role;
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        width={320} // Set the sidebar width correctly
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <div
          style={{
            background: "#1F3B2D",
            color: "#FDF6EC",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          className="admin-section"
        >
          <img
            className="admin-icon"
            style={{
              color: "#FDF6EC",
              fontSize: 24,
              marginRight: 10,
              width: "80%",
              objectFit: "cover",
            }}
            src="https://res.cloudinary.com/dur2ihrqo/image/upload/v1749372179/footer_mqh6fc.png"
          />

          <span className="admin-text">
            {collapsed ? "" : `Welcome ${userRole}`}
          </span>
        </div>
        <Menu
          theme="dard"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{ fontSize: "18px", fontWeight: "300" }}
        />
      </Sider>

      <Layout>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
