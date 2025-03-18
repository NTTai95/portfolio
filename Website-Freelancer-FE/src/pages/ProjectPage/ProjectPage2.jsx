import scss from "./ProjectPage2.module.scss";
import { InputNumber, Form, Row, Col, Typography, Checkbox } from "antd";
import { useEffect, useState } from "react";
import skillApi from "@api/skillApi";

function ProjectPage2() {
  const { Title, Paragraph, Link } = Typography;
  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    try {
      const res = await skillApi.getAll();
      setSkills(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className={scss.container}>
      <Row gutter={24}>
        <Col span={17} className={scss.colLeft}>
          <Title level={3} className={scss.title3}>
            Ngân sách và lĩnh vực
          </Title>
          <Title level={5} className={scss.title5}>
            Ngân sách dự án
          </Title>
          <Form.Item name="budget">
            <InputNumber
              addonAfter="₫"
              placeholder="VD: 100.000"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          </Form.Item>
          <Title level={5} className={scss.title5}>
            Lĩnh vực tuyển dụng
          </Title>
          <Form.Item name="skillIds">
            <Checkbox.Group style={{ width: "100%" }}>
              <Row>
                {skills.map((skill) => (
                  <Col span={6} key={skill.id}>
                    <Checkbox value={skill.id} className={scss.Checkbox}>
                      {skill.name}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Col>
        <Col span={7} className={scss.colRight}>
          <Title level={4} className={scss.title5}>
            Mẹo nếu bạn gặp khó khăn
          </Title>
          <Title level={5} className={scss.title5}>
            Ngân sách dự án
          </Title>
          <Paragraph className={scss.text} type="secondary">
            Khoản chi phí bạn sẽ chi trả cho freelancer làm dự án này.
          </Paragraph>
          <Paragraph className={scss.waring} type="secondary">
            Bạn sẽ phải thanh toán toàn bộ chi phí trước khi bạn đăng bài tuyển dụng này.
          </Paragraph>
          <Title level={5} className={scss.title5}>
            Lĩnh vực tuyển dụng
          </Title>
          <Paragraph className={scss.text} type="secondary">
            Các lĩnh vực yêu cầu freelancer phải đáp ứng được.
          </Paragraph>
          <Link className={scss.link} href="#" type="success">
            Video từng bước về cách tạo dự án
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default ProjectPage2;
