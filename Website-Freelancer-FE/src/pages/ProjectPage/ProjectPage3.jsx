import scss from "./ProjectPage3.module.scss";
import { Row, Col, Typography, Form, DatePicker } from "antd";
import dayjs from "dayjs";
import formValidator from "../../utils/formValidator";

const { Title, Paragraph, Link } = Typography;

function ProjectPage3() {
  return (
    <div className={scss.container}>
      <Row gutter={24}>
        <Col span={17} className={scss.colLeft}>
          <Title className={scss.title3} level={3}>
            Thời lượng dự án
          </Title>

          <Title className={scss.title5} level={5}>
            Ngày bắt đầu dự án
          </Title>
          <Form.Item name="startDate" rules={formValidator.startDate()}>
            <DatePicker
              format="DD/MM/YYYY"
              allowClear
              placeholder="VD: 01/01/2025"
              minDate={dayjs(new Date())}
              maxDate={dayjs(new Date()).add(1, "year")}
            />
          </Form.Item>

          <Title className={scss.title5} level={5}>
            Ngày kết thúc dự án
          </Title>
          <Form.Item name="endDate" rules={formValidator.endDate()}>
            <DatePicker
              format="DD/MM/YYYY"
              allowClear
              placeholder="VD: 04/01/2025"
              minDate={dayjs(new Date()).add(1, "day")}
            />
          </Form.Item>

          <Paragraph className={scss.text} type="secondary">
            Bài đăng của bạn đã sẵn sàng để đăng. Khi nhấn nút đăng mọi người sẽ
            nhìn thấy bài đăng của bạn
          </Paragraph>
        </Col>

        <Col span={7} className={scss.colRight}>
          <Title className={scss.title5} level={4}>
            Mẹo nếu bạn gặp khó khăn
          </Title>

          <Title className={scss.title5} level={5}>
            Ngày bắt đầu
          </Title>
          <Paragraph className={scss.text} type="secondary">
            Ngày dự kiến mà bạn phải bắt đầu dự án của mình.
          </Paragraph>

          <Title className={scss.title5} level={5}>
            Ngày kết thúc
          </Title>
          <Paragraph className={scss.text} type="secondary">
            Ngày dự kiến dự án của bạn được hoàn thành và trả tiền cho
            freelancer.
          </Paragraph>

          <Link className={scss.link} href="#" type="success">
            Video từng bước về cách tạo dự án
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default ProjectPage3;
