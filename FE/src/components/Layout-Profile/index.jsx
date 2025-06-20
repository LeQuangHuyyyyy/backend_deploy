import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SidebarProflie from "../SidebarProflie";


const { Content, Sider } = Layout;

const LayoutProfile = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#fdf6ee" }}>
      {/* Sidebar cố định */}
      <Sider width={250} style={{ background: "#fdf6ee", padding: "20px" }}>
     <SidebarProflie />   
      </Sider>

      {/* Nội dung sẽ thay đổi dựa trên Router */}
      <Layout style={{ padding: "20px", background: "#fdf6ee"}}>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutProfile;
