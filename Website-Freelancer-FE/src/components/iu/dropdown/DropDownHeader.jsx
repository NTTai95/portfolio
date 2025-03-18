import React from "react";
import { Dropdown } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import scss from "./DropDownHeader.module.scss";

const DropDownHeader = ({ menuItems, label }) => {
  const navigate = useNavigate();

  const items = menuItems.map((item, index) => {
    return {
      key: index,
      label: item.name,
      onClick: () => navigate(item.link),
    };
  });

  return (
    <Dropdown menu={{items}} trigger={["click"]}>
      <span className={scss.title}>
        {label} <CaretDownOutlined />
      </span>
    </Dropdown>
  );
};

export default DropDownHeader;
