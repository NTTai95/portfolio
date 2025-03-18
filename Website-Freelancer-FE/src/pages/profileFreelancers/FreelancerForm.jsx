import { Form, Input, Button, Spin } from "antd";
import scss from "./FreelancerInfo.module.scss";
import DebounceSelect from "@components/iu/select/DebounceSelect";

const FreelancerForm = ({
  initialValues,
  onFinish,
  onSearchSkill,
  onSearchLanguage,
  onCancel,
}) => {
  const [form] = Form.useForm();
  form.setFieldsValue(initialValues);

  const isLoading =
    initialValues.introduce === "" ||
    !initialValues?.skills ||
    !initialValues?.languages;

  return (
    <Spin spinning={isLoading}>
      <Form
        className={scss.form}
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item
          name="introduce"
          label={<p className={scss.title}>Giới thiệu</p>}
          className={scss.part}
        >
          <Input.TextArea
            size="large"
            className={scss.barlow}
            placeholder="Giới thiệu về bản thân mình..."
            rows={7}
          />
        </Form.Item>
        <Form.Item
          name="skills"
          label={<p className={scss.title}>Kỹ năng</p>}
          className={scss.part}
        >
          <DebounceSelect
            mode="multiple"
            placeholder="Tìm kiếm kỹ năng..."
            size="large"
            color="purple"
            fetchOptions={onSearchSkill}
          />
        </Form.Item>

        <Form.Item
          name="languages"
          label={<p className={scss.title}>Ngôn ngữ</p>}
          className={scss.part}
        >
          <DebounceSelect
            mode="multiple"
            placeholder="Tìm kiếm ngôn ngữ..."
            size="large"
            color="red"
            fetchOptions={onSearchLanguage}
          />
        </Form.Item>

        <div className="d-flex gap-2 justify-content-end">
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
          <Button onClick={onCancel}>Hủy</Button>
        </div>
      </Form>
    </Spin>
  );
};

export default FreelancerForm;
