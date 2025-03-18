import React, { useState, useEffect } from "react";
import { Row, Col, Menu, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import profileApi from "@api/profileApi";
import {
  UserOutlined,
  ApartmentOutlined,
  BarChartOutlined,
  RetweetOutlined,
  LogoutOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import MenuItem from "antd/es/menu/MenuItem";
import CardUpLoadImage from "@components/card/CardUploadImage";

const ProfileLayout = ({ children, active }) => {
  const [profile, setProfile] = useState(null);
  const nagivate = useNavigate();

  useEffect(() => {
    const logined = JSON.parse(sessionStorage.getItem("logined"));
    if (logined) {
      if (logined.type) {
        nagivate("/404");
      } else {
        profileApi.getByAccountId(logined.id).then((response) => {
          if (response.status == 200) {
            setProfile(response.data);
          }
        });
      }
    }
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("logined");
    nagivate("/home");
    window.location.reload();
  }

  const menuItems = [
    {
      key: "profile",
      icon: <IdcardOutlined />,
      label: "Thông tin",
      onClick: () => nagivate("/profile")
    },
    {
      key: "freelancer",
      icon: <UserOutlined />,
      label: "Freelancer",
      onClick: () => nagivate("/profile/freelancer")
    },
    {
      key: "recruiters",
      icon: <ApartmentOutlined />,
      label: "Nhà tuyển dụng",
      onClick: () => nagivate("/profile/recruiters")
    },
    {
      key: "statistic",
      icon: <BarChartOutlined />,
      label: "Thống kê",
      onClick: () => nagivate("/profile/statistic")
    },
    {
      type: "divider"
    },
    {
      key: "changePassword",
      icon: <RetweetOutlined />,
      label: "Đổi mật khẩu",
      onClick: () => nagivate("/changePassword")
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: () => handleLogout()
    }
  ];

  return (
    <div>
      <Row>
        <Col span={6} className={"container border-end"}>
          {profile ? (
            <CardUpLoadImage profile={profile}></CardUpLoadImage>
          ) : (
            <Skeleton.Image
              className={"w-100"}
              style={{ height: "250px" }}
            ></Skeleton.Image>
          )}

          <Menu
            mode="inline"
            selectedKeys={[active]}
            style={{ height: "100%", borderRight: 0, marginTop: "20px" }}
            items={menuItems}
          />
        </Col>
        <Col span={18} className={"container"}>
          {children}
        </Col>
      </Row>
    </div>
  );
};


export default ProfileLayout;