import React from "react";
import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
import { Row, Col } from "antd";
import MenuAdmin from "@components/menu/MenuAdmin";
import scss from "./AdminLayout.module.scss";
import { FloatButton, Tooltip, Breadcrumb } from "antd";
import { RetweetOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children, active, breadcrumb }) => {
  const navgate = useNavigate();
  return (
    <>
      <Header />
      <Row className={scss["container-main"]}>
        <Col className={scss["menu-admin"]} span={4}>
          <MenuAdmin active={active}></MenuAdmin>
        </Col>
        <Col className={scss.content} span={20}>
          <Breadcrumb
            className={scss.breadcrumb}
            items={[
              {
                href: "",
                title: <HomeOutlined />,
              },
              {
                href: "/admin/employee",
                title: breadcrumb,
              },
            ]}
          />
          {children}
        </Col>
      </Row>
      <div className={scss["float-button"]}>
        <Tooltip title="Chuyển đổi sang giao diện của người dùng">
          <FloatButton
            type="primary"
            icon={<RetweetOutlined />}
            onClick={() => navgate("/")}
          />
        </Tooltip>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
