import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./index.scss";
const IconTransaction = () => (
  <Avatar
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABuUlEQVR4nN3VOYgWQRAF4E9XF29QBEEUwUC8MiMDA0W8EkXUxETT9dbERNbUI9LUUAwUNRRjFcTEYFcUVpBlNTHyQvH8paEGmqFn/n823AfDNF2vqnpev+5hpmMYR3EP7/AD3/AGd3AkONPCbkyh1+d5i4NdCs/CFfyLAhM4iy1YioXYhDMYyxpdw+y2wpfjPRoJv3GhT9IQTuBn5Fxta5AID2LlqfiuAmcvHhXmd2RNDrQ1qJ6LhfgxTMYmXy982clM0uF+DSq5KmzDX7zHy+CkfanLNR6xwwrotTS5FHMjWB/jJ4Ua5yJ2W0eMZIlzwlEbC7zNwUvnpBOW40MkP41CJSwOzpdS8GsEE6mElfEFyWXfsbVrg7HYyKRxHauwNpxzPIo87CpR0nVZw+qfReI6rI7xi+lu8vawXI7RzDmPY3yzxkk5ryJ2qKn43QaPz8etOK1/cB+LapzT2UGb29RgDz5hX0P8FG4U5nfiVzTYrw9WxHtDrKouV46h4FTF0y08EOaFE3rhmoQ1WBLSJLeczzSvirde16Wb8zkWxD/iY8MPZ2IQWQaRbRyf40C+DismtzRu6MzAf985ijCHSEmoAAAAAElFTkSuQmCC"
    size={20}
  ></Avatar>
);
const IconHistory = () => (
  <Avatar
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAkklEQVR4nO2Uyw2AMAhAOTmV63ghuoM3XcXBukYxTThw6A9sGg6+hCgJ5UXaCvBjgAaED4EFcimgQp4biU/BcKYLqCI0Hdnpgha5+moPrSByPXKOnMdS4544xTrkZike8Y5fBAQAt1i7iS9Jz33EaKAiOCBD4IIVdGDviC7j7zj2bvLCkqAUkPaYaiDLRXMlaPICEKzHmpXR6l4AAAAASUVORK5CYII="
    size={20}
  ></Avatar>
);
const SidebarProflie = () => {
  const navigate = useNavigate();
  //const role = useSelector((store) => store.user?.user.roles[0])
  return (
    <Menu
      mode="vertical"
      defaultSelectedKeys={["/profile"]}
      style={{ background: "#fdf6ee" }}
    >
      <Menu.Item
        key="/profile"
        icon={<UserOutlined />}
        onClick={() => navigate("/my-account/profile")}
        style={{ marginLeft: 6 }}
      >
        Account
      </Menu.Item>
      <Menu.Item
        key="/change_password"
        icon={<LockOutlined />}
        onClick={() => navigate("/my-account/change-password")}
        style={{ marginLeft: 6 }}
      >
        Change Password
      </Menu.Item>
      <Menu.Item
        key="/ggmap"
        icon={<LockOutlined />}
        onClick={() => navigate("/my-account/ggmap")}
        style={{ marginLeft: 6 }}
      >
        Google Map
      </Menu.Item>

      <Menu.Item
        key="/your-order"
        onClick={() => navigate("/my-account/your-order")}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconHistory />
          <span style={{ marginLeft: "6px" }}>Đơn hàng của bạn</span>
        </div>
      </Menu.Item>
      <Menu.Item
        key="/history-ticket"
        onClick={() => navigate("/my-account/history-ticket")}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconHistory />
          <span style={{ marginLeft: "6px" }}>Vé của bạn</span>
        </div>
      </Menu.Item>
      <Menu.Item
        key="/history-deposite"
        onClick={() => navigate("/my-account/history-deposite")}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconHistory />
          <span style={{ marginLeft: "6px" }}>Lịch sử nạp tiền</span>
        </div>
      </Menu.Item>
    </Menu>
  );
};

export default SidebarProflie;
