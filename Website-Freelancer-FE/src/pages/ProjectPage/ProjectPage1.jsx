import formValidator from "../../utils/formValidator";
import scss from "./ProjectPage1.module.scss";
import { Input, Row, Col, Typography, Form } from "antd";

function ProjectPage1() {
  const { Title, Paragraph, Link } = Typography;

  return (
    <div className={scss.container}>
      <Row gutter={24}>
        <Col span={17} className={scss.colLeft}>
          <Title level={3} className={scss.title3}>
            Tổng quan dự án
          </Title>
          <Title level={5} className={scss.title5}>
            Tiêu đề dự án
          </Title>
          <Form.Item name="title" rules={formValidator.title()}>
            <Input
              size="large"
              showCount
              maxLength={100}
              placeholder="VD: Xây dựng website freelancer..."
            />
          </Form.Item>
          <Title level={5} className={scss.title5}>
            Mô tả dự án
          </Title>
          <Form.Item name="description" rules={formValidator.description()}>
            <Input.TextArea
              rows={7}
              showCount
              maxLength={10000}
              className={scss.description}
              placeholder="VD: Tôi cần một freelancer giỏi về thiết kế web để giúp tôi xây dựng website bán hàng online..."
            />
          </Form.Item>
        </Col>
        <Col span={7} className={scss.colRight}>
          <Title level={4} className={scss.title5}>
            Mẹo nếu bạn gặp khó khăn
          </Title>
          <div>
            <Title level={5} className={scss.title5}>
              Yêu cầu dự án
            </Title>
            <Paragraph type="secondary" className={scss.text}>
              Ngắn gọn vấn đề, khó khăn bạn gặp phải là gì? cần được hỗ trợ
              những gì?
            </Paragraph>
            <Title level={5} className={scss.title5}>
              Mô tả dự án
            </Title>
            <Paragraph type="secondary" className={scss.text}>
              Mô tả chi tiết đầy đủ về vấn đề, khó khăn bạn gặp phải và cần được
              hỗ trợ những gì?
            </Paragraph>
            <Link href="#" type="success" className={scss.link}>
              Video từng bước về cách tạo dự án
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProjectPage1;
