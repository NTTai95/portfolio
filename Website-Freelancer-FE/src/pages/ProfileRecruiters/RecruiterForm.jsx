import { Form, Input, Button } from "antd";

const RecruiterForm = ({ initialValues, onFinish, onCancel }) => {
  return (
    <Form layout="vertical" initialValues={initialValues} onFinish={onFinish}>
      <Form.Item
        label="Tên công ty"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên công ty" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Giới thiệu"
        name="introduce"
        rules={[{ required: true, message: "Vui lòng nhập giới thiệu" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
        <Button style={{ marginLeft: "10px" }} onClick={onCancel}>
          Hủy
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RecruiterForm;
