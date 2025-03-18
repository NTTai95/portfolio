import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import scss from "./DropDownHeader.module.scss";

const DropDownLogined = ({ profile }) => {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("logined");
    navigate("/home");
    window.location.reload();
  }

  const items = [
    {
      key: '1',
      label: 'Trang cá nhân',
      onClick: () => navigate("/profile")
    },
    {
      type: 'divider'
    },
    {
      key: '2',
      label: 'Freelancer',
      onClick: () => navigate("/profile/freelancer")
    },
    {
      key: '3',
      label: 'Nhà tuyển dụng',
      onClick: () => navigate("/profile/recruiters")
    },
    {
      type: 'divider'
    },
    {
      key: '4',
      label: 'Đổi mật khẩu'
    },
    {
      key: '5',
      label: 'Đăng xuất',
      onClick: () => handleLogout()
    }
  ];
  return (
    <Dropdown menu={{items}} trigger={["click"]}>
      <div className={"d-flex align-items-center " + scss["cursor-pointer"]}>
        <span className={scss.fullName}>{profile.fullName}</span>
        <Avatar size={40} icon={<UserOutlined />} />
      </div>
    </Dropdown>
  );
};

export default DropDownLogined;