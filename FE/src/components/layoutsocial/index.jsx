import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import ListFriendandGroup from "../ListFriendandGroup";
import Sider from "antd/es/layout/Sider";
export default function LayoutSocial() {
  return (
    <Layout style={{ minHeight: "100vh", background: "#fdf6ee" }}>
      {/* Nội dung sẽ thay đổi dựa trên Router */}
      <Layout style={{ padding: "20px", background: "#fdf6ee" }}>
        <Content style={{ display: "flex", justifyContent: "center" }}>
          <Outlet />
        </Content>
      </Layout>
      {/* Sidebar cố định */}
      <Sider width={250} style={{ background: "#fdf6ee", padding: "20px" }}>
        <ListFriendandGroup />
      </Sider>
    </Layout>
  );
}
