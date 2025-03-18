import { Form, Input, Button, Alert } from "antd";
import scss from "./FreelancerInfo.module.scss";
import DebounceSelect from "@components/iu/select/DebounceSelect";
import skillApi from "@api/skillApi";
import languageApi from "@api/languageApi";
import formValidator from "../../utils/formValidator";

const FreelancerFormAdd = ({ onFinish }) => {
  const [form] = Form.useForm();

  const onSearchSkill = async (value) => {
    const res = await skillApi.searchByName(value);
    return res.data.map((skill) => ({
      key: skill.id,
      value: skill.id,
      label: skill.name,
    }));
  };

  const onSearchLanguage = async (value) => {
    const res = await languageApi.searchByName(value);
    return res.data.map((language) => ({
      key: language.id,
      value: language.id,
      label: language.name,
    }));
  };

  return (
    <div>
      <Alert
        message="Thêm thông tin"
        description="Hãy thêm thông tin freelancer để bất đầu làm việc"
        type="info"
        showIcon
      />
      <Form
        className={scss.form}
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="introduce"
          label={<p className={scss.title}>Giới thiệu</p>}
          className={scss.part}
          rules={formValidator.introduce()}
        >
          <Input.TextArea
            size="large"
            className={scss.barlow}
            placeholder="Giới thiệu về bản thân mình..."
            rows={7}
            showCount
            maxLength={10000}
          />
        </Form.Item>
        <Form.Item
          name="skills"
          label={<p className={scss.title}>Kỹ năng</p>}
          className={scss.part}
          rules={formValidator.skills()}
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
          rules={formValidator.languages()}
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
            Lưu thông tin
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FreelancerFormAdd;
