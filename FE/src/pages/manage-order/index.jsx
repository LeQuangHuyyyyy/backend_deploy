import { Button, Popconfirm, Table, Tag } from "antd";

import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../config/api";
import "./index.scss";
import { formatMoneyToVND } from "../../currency/currency";

const ManageOrder = () => {
  const [data, setData] = useState([]);

  const fetchingData = async () => {
    try {
      const response = await api.get("Order/GetAllOrdersByPendingStatus");
      setData(response.data);
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const columns = [
    {
      title: "OrderID",
      dataIndex: "orderID",
      key: "orderID",
    },
    {
      title: "ApplicationUserID",
      dataIndex: "applicationUserID",
      key: "applicationUserID",
    },
    {
      title: "OrderDate",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (value) => dayjs(value).format("DD/MM/YYYY"),
    },
    {
      title: "TotalAmount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value) => formatMoneyToVND(value),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusColors = {
          pending: "warning",
          confirmed: "success",
        };

        return (
          <Tag color={statusColors[status] || "default"}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "CartId",
      dataIndex: "cartId",
      key: "cartId",
    },
    {
      title: "Action",
      dataIndex: "orderID",
      key: "orderID",
      render: (orderID, record) => {
        return record.status !== "successful" ? (
          <Popconfirm
            title="Confirm đơn hàng?"
            onConfirm={() => handleConfirmOrder(record.orderID)}
          >
            <Button type="primary">Confirm Order</Button>
          </Popconfirm>
        ) : (
          <p
            style={{
              padding: "10px 20px",
              background: "#ccc",
              fontWeight: "500",
            }}
          >
            Already confirmed
          </p>
        );
      },
    },
  ];
  const handleConfirmOrder = async (id) => {
    try {
      await api.put(`Order/ConfirmOrderStatusOrder/${id}`);
      toast.success("Confirm success!");
      fetchingData();
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="manage-account">
      <div className="table-container">
        <Table
          title={() => "Các đơn hàng đang đợi duyệt"}
          columns={columns}
          dataSource={data}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default ManageOrder;
