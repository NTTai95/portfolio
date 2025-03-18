import {
  UserOutlined,
  HomeOutlined,
  TagsOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

function MenuAdmin({ active }) {
  const navgate = useNavigate();

  const items = [
    {
      key: "home",
      label: "Trang chủ",
      icon: <HomeOutlined />,
      onClick: () => {
        navgate("/admin/dashboard");
      },
    },
    {
      key: "skills",
      label: "Kỹ năng",
      icon: <TagsOutlined />,
      onClick: () => {
        navgate("/admin/skills");
      },
    },
    {
      key: "staff",
      label: "Nhân viên",
      icon: <UserOutlined />,
      onClick: () => {
        navgate("/admin/staff");
      },
    },
    {
      key: "language",
      label: "Ngôn ngữ",
      icon: <FontAwesomeIcon icon={faGlobe} />,
      onClick: () => {
        navgate("/admin/languages");
      },
    },
    {
      key: "report",
      label: "Báo cáo",
      icon: <NotificationOutlined />,
      children: [
        {
          key: "freelacner",
          label: "Từ Freelancer",
          onClick: () => {
            navgate("/admin/report/freelancer");
          },
          disabled: true,
        },
        {
          key: "recruitment",
          label: "Từ nhà tuyển dụng",
          onClick: () => {
            navgate("/admin/report/recruitment");
          },
          disabled: true,
        },
      ],
    },
    {
      type: "divider",
    },
    {
      key: "changePassword",
      label: "Đổi mật khẩu",
      icon: <UserOutlined />,
      onClick: () => {
        navgate("/admin/changepassword");
      },
    },
  ];

  return <Menu defaultSelectedKeys={[active]} mode="inline" items={items} />;
}

export default MenuAdmin;
