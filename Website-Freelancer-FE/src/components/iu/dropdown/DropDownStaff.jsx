import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import scss from "./DropDownHeader.module.scss";

const DropDownLogined = ({ staff }) => {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("logined");
    navigate("/home");
    window.location.reload();
  }

  const items = [
    {
      key: '2',
      label: 'Đổi mật khẩu',
      onClick: () => navigate("/admin/changepassword")
    },
    {
      key: '3',
      label: 'Đăng xuất',
      onClick: () => handleLogout()
    }
  ];
  return (
    <Dropdown menu={{items}} trigger={["click"]}>
      <div className={"d-flex align-items-center " + scss["cursor-pointer"]}>
        <span className={scss.fullName}>{staff.fullName}</span>
        <Avatar size={40} icon={<UserOutlined />} />
      </div>
    </Dropdown>
  );
};

export default DropDownLogined;