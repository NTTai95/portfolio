import { Col, Row, Button, Input, Select } from "antd";
import scss from "./Header.module.scss";
import DropDownHeader from "@components/iu/dropdown/DropDownHeader";
import DropDownLogined from "@components/iu/dropdown/DropDownLogined";
import DropDownStaff from "@components/iu/dropdown/DropDownStaff";
import { useNavigate } from "react-router-dom";
import FancyText from "@carefully-coded/react-text-gradient";
import { useState, useEffect } from "react";
import profileApi from "@api/profileApi";
import staffApi from "@api/staffApi";
const { Option } = Select;

function Header() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [staff, setStaff] = useState(null);

  const fetchProfile = async (id) => {
    const res = await profileApi.getByAccountId(id);
    if (res.status == 200) {
      setProfile(res.data);
    }
  };

  const fetchStaff = async (id) => {
    const res = await staffApi.getByAccountId(id);
    if (res.status == 200) {
      setStaff(res.data);
    }
  };

  useEffect(() => {
    const logined = JSON.parse(sessionStorage.getItem("logined"));
    if (logined) {
      if (logined.isStaff) {
        fetchStaff(logined.id);
      } else {
        fetchProfile(logined.id);
      }
    }
  }, []);

  const menuItemsFindWork = [
    { name: "Tìm việc", link: "/jobpost" },
    { name: "Tìm freelancer", link: "/freelancers" },
    // { name: "Công việc đã lưu", link: "/saved-jobs" },
  ];

  const menuItemsRecruitment = [
    // { name: "Freelacner", link: "/find-jobs" },
    { name: "Tạo bài tuyển dụng", link: "/jobpost/add" },
  ];

  const menuItemsHelp = [{ name: "Giới thiệu", link: "/about" }];
  const selectAfter = (
    <Select defaultValue="Tuyển dụng">
      <Option value="tuyendung">Tuyển dụng</Option>
      <Option value="freelancer">Freelancer</Option>
      <Option value="skills">Kỹ năng</Option>
    </Select>
  );

  return (
    <Row className={scss.header}>
      <Col className={scss.col1} span={5}>
        <FancyText
          className={scss.logo}
          gradient={{ from: "#cb5eee", to: "#4be1ec", type: "linear" }}
          animateTo={{ from: "#4be1ec", to: "#cb5eee" }}
          animateDuration={1700}
          onClick={() => navigate("/")}
        >
          FREELANCER
        </FancyText>
      </Col>
      <Col className={scss.col2} span={8}>
        <span className={scss.link} onClick={() => navigate("/")}>
          Trang chủ{" "}
        </span>
        <DropDownHeader menuItems={menuItemsFindWork} label="Freelancer" />
        <DropDownHeader menuItems={menuItemsRecruitment} label="Tuyển dụng" />
        <DropDownHeader menuItems={menuItemsHelp} label="Trợ giúp" />
      </Col>
      <Col className={scss.col3} span={6}>
        <Input
          className={scss.search}
          addonAfter={selectAfter}
          placeholder="Tìm kiếm..."
          size="large"
        />
      </Col>
      <Col className={scss.col4} span={5}>
        {profile && <DropDownLogined profile={profile} />}
        {staff && <DropDownStaff staff={staff} />}
        {!profile && !staff && (
          <>
            <Button
              className={scss.button}
              color="primary"
              variant="outlined"
              onClick={() => {
                sessionStorage.setItem("urlPrev", window.location.pathname);
                navigate("/login");
              }}
            >
              Đăng nhập
            </Button>
            <Button
              className={scss.button}
              color="primary"
              variant="solid"
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </Button>
          </>
        )}
      </Col>
    </Row>
  );
}

export default Header;
