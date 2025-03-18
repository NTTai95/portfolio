import React from "react";
import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
import scss from "./mainLayout.module.scss";
import { FloatButton, Tooltip } from "antd";
import { RetweetOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const navgate = useNavigate();
  const logined = JSON.parse(sessionStorage.getItem("logined"));

  return (
    <div>
      <Header />
      <main className={scss["container-main"]}>{children}</main>
      <div className={scss["float-button"]}>
        {logined && logined.isStaff && (
          <Tooltip title="Chuyển sang giao diện admin">
            <FloatButton
              icon={<RetweetOutlined />}
              onClick={() => navgate("/admin/dashboard")}
            />
          </Tooltip>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
