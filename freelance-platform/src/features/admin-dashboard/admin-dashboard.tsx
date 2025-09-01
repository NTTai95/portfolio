"use client";
import React, { useState } from "react";
import {
  Layout,
  Menu,
  ConfigProvider,
  theme as antdTheme,
  Avatar,
  Typography,
  Space,
} from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  AppstoreOutlined,
  BookOutlined,
  GlobalOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

// Import các tính năng quản lý
import UserManagementPage from "@/features/manager-user/manager-user";
import JobPostManagement from "@/features/manager-job-post/manager-job-post";
import JobPostReportTable from "@/features/job-post-report/job-post-report";
import TableSkills from "@/features/skills/table-skills";
import TableIndustries from "@/features/industries/table-industries";
import TableLanguages from "@/features/languages/table-languages";

const { Sider, Content, Header } = Layout;
const { Title, Text } = Typography;

const menuItems = [
  { key: "dashboard", icon: <DashboardOutlined />, label: "Tổng quan" },
  { key: "user", icon: <UserOutlined />, label: "Quản lý người dùng" },
  { key: "job", icon: <LaptopOutlined />, label: "Quản lý bài đăng" },
  { key: "report", icon: <NotificationOutlined />, label: "Báo cáo bài đăng" },
  { key: "skills", icon: <AppstoreOutlined />, label: "Quản lý kỹ năng" },
  { key: "industries", icon: <BookOutlined />, label: "Quản lý ngành nghề" },
  { key: "languages", icon: <GlobalOutlined />, label: "Quản lý ngôn ngữ" },
];

function DashboardOverview() {
  // Có thể thêm các widget thống kê ở đây
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Title level={3}>Chào mừng đến với trang quản trị sàn freelance!</Title>
      <Text type="secondary">
        Sử dụng menu bên trái để truy cập các chức năng quản lý người dùng, bài
        đăng, kỹ năng, ngành nghề, ngôn ngữ và báo cáo.
      </Text>
      <Space size="large" wrap>
        <div
          style={{
            background: "#e6f7ff",
            padding: 24,
            borderRadius: 12,
            minWidth: 220,
            textAlign: "center",
          }}
        >
          <Avatar
            size={48}
            style={{ background: "#1677ff" }}
            icon={<UserOutlined />}
          />
          <div style={{ marginTop: 12, fontWeight: 500 }}>Người dùng</div>
          <div style={{ fontSize: 24, color: "#1677ff" }}>+1000</div>
        </div>
        <div
          style={{
            background: "#fffbe6",
            padding: 24,
            borderRadius: 12,
            minWidth: 220,
            textAlign: "center",
          }}
        >
          <Avatar
            size={48}
            style={{ background: "#faad14" }}
            icon={<LaptopOutlined />}
          />
          <div style={{ marginTop: 12, fontWeight: 500 }}>Bài đăng</div>
          <div style={{ fontSize: 24, color: "#faad14" }}>+500</div>
        </div>
        <div
          style={{
            background: "#fff0f6",
            padding: 24,
            borderRadius: 12,
            minWidth: 220,
            textAlign: "center",
          }}
        >
          <Avatar
            size={48}
            style={{ background: "#eb2f96" }}
            icon={<NotificationOutlined />}
          />
          <div style={{ marginTop: 12, fontWeight: 500 }}>Báo cáo</div>
          <div style={{ fontSize: 24, color: "#eb2f96" }}>+20</div>
        </div>
      </Space>
    </Space>
  );
}

export default function AdminDashboard() {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const {
    token: { colorBgContainer },
  } = antdTheme.useToken();

  const renderContent = () => {
    switch (selectedKey) {
      case "user":
        return <UserManagementPage />;
      case "job":
        return <JobPostManagement />;
      case "report":
        return <JobPostReportTable />;
      case "skills":
        return <TableSkills />;
      case "industries":
        return <TableIndustries />;
      case "languages":
        return <TableLanguages />;
      case "dashboard":
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 8,
        },
      }}
      warning={{ strict: false }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{ background: "#001529" }}
          width={240}
        >
          <div
            style={{
              height: 48,
              margin: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Title level={4} style={{ color: "#fff", margin: 0 }}>
              FREELANCE ADMIN
            </Title>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => setSelectedKey(key)}
            items={menuItems}
            style={{ fontSize: 16, fontWeight: 500 }}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              background: colorBgContainer,
              padding: "0 32px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 2px 8px #f0f1f2",
              minHeight: 64,
            }}
          >
            <Title level={3} style={{ margin: 0, flex: 1, color: "#1677ff" }}>
              {menuItems.find((item) => item.key === selectedKey)?.label ||
                "Dashboard"}
            </Title>
            <Avatar style={{ background: "#1677ff" }} icon={<UserOutlined />} />
          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
                minHeight: 360,
                borderRadius: 12,
                boxShadow: "0 2px 8px #f0f1f2",
              }}
            >
              {renderContent()}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
