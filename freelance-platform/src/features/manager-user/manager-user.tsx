import React, { useState } from "react";
import {
  Table,
  Input,
  Tag,
  Dropdown,
  Button,
  Avatar,
  Typography,
  Card,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { MoreOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { mockData } from "./MockupData";
import type { User } from "./constants";
import { statusLabel, statusColor } from "./constants";

const { Title } = Typography;

const UserManagementPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredData = mockData.filter((user) => {
    const lower = searchText.toLowerCase();
    return (
      user.name.toLowerCase().includes(lower) ||
      user.email.toLowerCase().includes(lower) ||
      user.phone.toLowerCase().includes(lower)
    );
  });

  const columns: ColumnsType<User> = [
    {
      title: "Ảnh",
      dataIndex: "avatar",
      key: "avatar",
      render: (url) => <Avatar src={url} size={40} icon={<UserOutlined />} />,
      width: 60,
      align: "center",
      fixed: "left",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 180,
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 140,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Người làm việc", value: "Freelancer" },
        { text: "Nhà tuyển dụng", value: "Employer" },
      ],
      onFilter: (value, record) => record.role === value,
      width: 120,
      align: "center",
      render: (role: User["role"]) => (
        <Tag
          style={{
            fontSize: 14,
            padding: "2px 12px",
            minWidth: 90,
            textAlign: "center",
          }}
          color={role === "Freelancer" ? "#1d4ed8" : "#ea580c"}
        >
          {role}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Hoạt động", value: "active" },
        { text: "Tạm ngừng", value: "paused" },
        { text: "Bị vô hiệu hóa", value: "disabled" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: User["status"]) => (
        <Tag
          style={{
            fontSize: 14,
            padding: "2px 12px",
            minWidth: 110,
            textAlign: "center",
          }}
          color={statusColor[status]}
        >
          {statusLabel[status]}
        </Tag>
      ),
      width: 140,
      align: "center",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => {
        const menuItems: MenuProps["items"] = [
          {
            key: "view",
            label: "Xem chi tiết trang cá nhân",
            onClick: () => router.push(`/profile-detail/${record.id}`),
          },
          {
            key: "toggle-status",
            label:
              record.status === "disabled"
                ? "Cho phép hoạt động"
                : "Vô hiệu hóa tài khoản",
            onClick: () =>
              console.log(
                `${
                  record.status === "disabled" ? "Kích hoạt" : "Vô hiệu hóa"
                }:`,
                record.id
              ),
          },
          {
            key: "delete",
            label: "Xóa",
            onClick: () => console.log("Xóa:", record.id),
          },
        ];

        return (
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <Button icon={<MoreOutlined />} shape="circle" />
          </Dropdown>
        );
      },
      width: 60,
      align: "center",
      fixed: "right",
    },
  ];

  return (
    <Card
      style={{
        borderRadius: 16,
        boxShadow: "0 2px 8px #f0f1f2",
        border: "none",
        marginTop: 8,
      }}
      bodyStyle={{ padding: 24 }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0, color: "#1677ff", flex: 1 }}>
          Quản lý người dùng
        </Title>
      </div>
      <Input.Search
        placeholder="Tìm theo tên, email, hoặc số điện thoại"
        allowClear
        onSearch={handleSearch}
        style={{ maxWidth: 360, marginBottom: 20, float: "right" }}
        size="large"
      />
      <div style={{ clear: "both" }} />
      <Table<User>
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: 900 }}
        style={{ borderRadius: 12, background: "#fff" }}
      />
    </Card>
  );
};

export default UserManagementPage;
