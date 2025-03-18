import { Tag, Divider, Row, Col, Card, Avatar, Typography } from "antd";
import profileApi from "@api/profileApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Image } from "antd";
import RecruiterApi from "../../api/recruiterApi";
const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F3FF33",
  "#FF33A1",
  "#A133FF",
];
const randomColor = colors[Math.floor(Math.random() * colors.length)];
function Recruiter() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [recruiter, setRecruiters] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const logined = JSON.parse(sessionStorage.getItem("logined"));
    if (logined) {
      if (logined.type) {
        navigate("/404");
      } else {
        profileApi.getByRecruiterId(id).then((response) => {
          if (response.status == 200) {
            setProfile(response.data);
          }
          RecruiterApi.getById(id).then((res) => {
            if (res.status == 200) {
              setRecruiters(res.data);
            }
          });
        });
      }
    }
  }, []);
  return (
    <div className="container">
      <Row>
        <Col span={8}>
          <Card>
            <Image src={profile?.avatar} />
            <h2>{recruiter?.name}</h2>
            <p>Email: {profile?.account?.email}</p>
            <p>Số điện thoại: {profile?.phone}</p>
          </Card>
        </Col>
        <Col span={16}>
          <Card>
            <Typography.Title level={3}>Giới thiệu</Typography.Title>
            <Typography.Paragraph style={{whiteSpace: "pre-line"}}>
              {recruiter?.introduce || "Chưa có thông tin giới thiệu"}
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Recruiter;
