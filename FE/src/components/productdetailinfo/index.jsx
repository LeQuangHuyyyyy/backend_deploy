import React from "react";
import { Card, Typography, Row, Col, Tabs, Table, Alert } from "antd";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const ProductDetailInfo = ({
  productDescription,
  ingredient,
  effect,
  howToUse,
  sideEffect,
  note,
  preserve,
}) => {
  // Tách thành mảng
  const ingredientList = ingredient.split(",");

  // Chuẩn bị dữ liệu cho Table
  const dataSource = ingredientList.map((item, index) => ({
    key: index, // key để React render
    name: item.trim(), // Tên thành phần
    // dosage: "", // Hiện chưa có, để trống hoặc "Đang cập nhật"
  }));
  const columns = [
    {
      title: "Thông tin thành phần",
      dataIndex: "name",
      key: "name",
      // Nếu muốn tùy chỉnh style cột, bạn có thể thêm width, render, v.v.
    },
    // {
    //   title: "Hàm lượng",
    //   dataIndex: "dosage",
    //   key: "dosage",
    // },
  ];
  const lines = productDescription.split("\n");
  return (
    <Card
      title="Thông tin sản phẩm"
      bordered={false}
      style={{
        width: "100%",
        padding: "0 9% 0 9%",
        borderRadius: 10,
        border: "",
      }}
    >
      <Tabs defaultActiveKey="1" tabPosition="left" style={{ display: "flex" }}>
        <TabPane tab="Mô tả sản phẩm" key="1">
          <Text style={{ whiteSpace: "pre-line" }}>
            {productDescription?.replace(/\\n/g, "\n")}{" "}
            {/*\\n (dạng escape), .replace(/\\n/g, "\n") để chuyển nó thành xuống dòng thật. */}
          </Text>
        </TabPane>
        <TabPane tab="Thành phần" key="2">
          {/* 4. Hiển thị bảng thành phần */}
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            style={{ width: "100%" }}
          />
        </TabPane>
        <TabPane tab="Công dụng" key="3">
          <Text>{effect}</Text>
        </TabPane>
        <TabPane tab="Cách dùng" key="4">
          <Text>{howToUse}</Text>
        </TabPane>
        <TabPane tab="Tác dụng phụ" key="5">
          <Text>{sideEffect}</Text>
        </TabPane>
        <TabPane tab="Lưu ý" key="6">
          <Alert
            message="Lưu ý"
            description={note}
            type="warning"
            showIcon
            style={{
              backgroundColor: "#fff3e1",
              color: "#fab760",
              border: "none", // Ẩn border mặc định
            }}
          />
        </TabPane>
        <TabPane tab="Bảo quản" key="7">
          <Text>{preserve}</Text>
        </TabPane>
      </Tabs>
    </Card>
  );
};
export default ProductDetailInfo;
