import { Button, Form, Image, Input, Modal, Select, Table } from "antd";

import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../config/api";
import "./index.scss";
import { useForm } from "antd/es/form/Form";
import { showSuccessToast } from "../../config/configToast";

const ManageDiscount = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [id, setId] = useState("");
  const [form] = useForm();
  const [discountCategory, setdiscountCategory] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const fetchingdiscountCategory = async () => {
    try {
      const response = await api.get("DiscountCategory");
      //console.log(response);
      setdiscountCategory(response.data.items);
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };

  useEffect(() => {
    fetchingdiscountCategory();
  }, []);
  useEffect(() => {
    //console.log("Danh sách DiscountCategory:", discountCategory);
  }, [discountCategory]);
  const fetchingData = async () => {
    try {
      const response = await api.get("Discount");
      //console.log(response);
      setData(response.data.items);
    } catch (error) {
      toast.error("Error while fetching data");
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);
  const discountStatusOption = [
    { value: 0, label: "Valid" },
    { value: 1, label: "Expired" },
  ];
  // Hàm chuyển đổi giá trị `discountStatus` thành dạng chữ
  const getdiscountStatus = (value) => {
    const discountStatus = discountStatusOption.find(
      (item) => item.value === value
    );
    return discountStatus;
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      render: (value) => <p>{value}%</p>,
    },
    {
      title: "StartDate",
      dataIndex: "startDate",
      key: "startDate",
      render: (value) => dayjs(value).format("DD/MM/YYYY"),
    },
    {
      title: "EndDate",
      dataIndex: "endDate",
      key: "endDate",
      render: (value) => dayjs(value).format("DD/MM/YYYY"),
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Max_usage",
      dataIndex: "max_usage",
      key: "max_usage",
    },
    {
      title: "DiscountCategoryId",
      dataIndex: "discountCategoryId",
      key: "discountCategoryId",
    },
    {
      title: " Status",
      dataIndex: "discountStatus",
      key: "discountStatus",
      render: (discountStatus) => {
        const status = getdiscountStatus(discountStatus);
        const statusLabel = status ? status.label : "Unknown";
        const statusClass =
          discountStatus === 0 ? "status-valid" : "status-expired";

        return <span className={statusClass}>{statusLabel}</span>;
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, record) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <button
              onClick={() => handleOpenDeleteConfirm(id)}
              className="unblock-btn"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setOpen(true);
                form.setFieldsValue({
                  ...record, // Đảm bảo selectedRecord có giá trị
                  startDate: record?.startDate
                    ? dayjs(record.startDate).format("YYYY-MM-DD")
                    : "",
                  endDate: record?.endDate
                    ? dayjs(record.endDate).format("YYYY-MM-DD")
                    : "",
                });
              }}
              className="block-btn"
            >
              Update
            </button>
          </div>
        );
      },
    },
  ];

  const handleOpenDeleteConfirm = (id) => {
    setOpenDeleteModal(true);
    setId(id);
  };
  const handleDelete = async () => {
    try {
      await api.delete(`Discount/${id}`);
      showSuccessToast("Delete success!!");
      fetchingData();
      setOpenDeleteModal(false);
      setId("");
    } catch (error) {
      toast.error("Error while delete!!");
    }
  };
  const handleSubmit = async (values) => {
    try {
      if (values.id) {
        await api.put(`Discount/${values.id}`, values);
        showSuccessToast("Update success!!");
        form.resetFields();
        setOpen(false);
        fetchingData();
      } else {
        await api.post("Discount", values);
        showSuccessToast("Thêm thành công!!");
        form.resetFields();
        setOpen(false);
        fetchingData();
      }
    } catch (error) {
      toast.error("Error");
    }
  };
  return (
    <div className="manage-account">
      <div className="table-container">
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Tạo mới mã giảm giá
        </Button>
        <Table
          title={() => "Manage Discounts"}
          columns={columns}
          dataSource={data}
          scroll={{ x: "max-content" }}
        />
      </div>
      <Modal
        title={"Thông tin mã giảm giá"}
        footer={[
          <Button
            key="cancel"
            className="cancel-btn"
            onClick={() => {
              setOpen(false);
              form.resetFields();
            }}
          >
            ❌ Cancel
          </Button>,
          <Button
            onClick={() => {
              form.submit();
            }}
            key="submit"
            htmlType="submit"
            className="submit-btn"
            type="primary"
          >
            ✅ Submit
          </Button>,
        ]}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
      >
        <Form labelCol={{ span: 24 }} form={form} onFinish={handleSubmit}>
          <Form.Item name={"id"} hidden>
            <Input />
          </Form.Item>

          {/* Code không được chứa ký tự đặc biệt */}
          <Form.Item
            name={"code"}
            label="Enter code"
            rules={[
              { required: true, message: "Please enter code" },
              {
                pattern: /^[A-Za-z0-9]+$/,
                message: "Code chỉ chứa chữ cái và số",
              },
            ]}
          >
            <Input placeholder="Enter code" />
          </Form.Item>

          {/* Percentage phải trong khoảng 1 - 100 */}
          <Form.Item
            name={"percentage"}
            label="Percentage"
            rules={[
              {
                pattern: /^[0-9]\d*$/,
                message: "Max usage phải là số nguyên dương",
              },
              {
                type: "number",
                max: 100,
                min: 0,
                transform: (value) => Number(value), // chuyển sang number
                message: "Percentage phải nằm trong khoảng 0 - 100",
              },
              { required: true, message: "Please enter percentage" },
            ]}
          >
            <Input type="number" placeholder="Enter percentage" />
          </Form.Item>

          {/* StartDate không được là ngày trong quá khứ */}
          <Form.Item
            name={"startDate"}
            label="Start Date"
            rules={[
              { required: true, message: "Please enter startDate" },
              {
                validator: (_, value) =>
                  value && dayjs(value).isBefore(dayjs(), "day")
                    ? Promise.reject(
                        new Error("StartDate không được ở quá khứ")
                      )
                    : Promise.resolve(),
              },
            ]}
          >
            <Input type="date" placeholder="Enter startDate" />
          </Form.Item>

          {/* EndDate phải sau StartDate */}
          <Form.Item
            name={"endDate"}
            label="End Date"
            dependencies={["startDate"]}
            rules={[
              { required: true, message: "Please provide endDate" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    dayjs(value).isAfter(getFieldValue("startDate"), "day")
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("EndDate phải sau StartDate")
                  );
                },
              }),
            ]}
          >
            <Input type="date" placeholder="Provide endDate" />
          </Form.Item>

          {/* Description bắt buộc */}
          <Form.Item
            name={"description"}
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input placeholder="Enter description" />
          </Form.Item>

          {/* Max_usage phải là số nguyên dương */}
          <Form.Item
            name={"max_usage"}
            label="Max Usage"
            rules={[
              { required: true, message: "Please enter max_usage" },
              {
                pattern: /^[1-9]\d*$/,
                message: "Max usage phải là số nguyên dương",
              },
            ]}
          >
            <Input type="number" placeholder="Enter max_usage" />
          </Form.Item>
          <Form.Item
            name={"discountCategoryId"}
            label="DiscountCategory"
            rules={[
              { required: true, message: "Please enter discountCategoryId" },
            ]}
          >
            <Select>
              {discountCategory.map((item) => (
                <Select.Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        onOk={handleDelete}
        title="Confirm Delete"
        open={openDeleteModal}
        onCancel={() => {
          setOpenDeleteModal(false);
        }}
        okText="Yes, Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p style={{ textAlign: "center", fontSize: "15.5px" }}>
          Are you sure you want to delete this discount?
        </p>
      </Modal>
    </div>
  );
};

export default ManageDiscount;
