import scss from "./SkillForm.module.scss";
import { Button, Form, Input, notification, Spin } from "antd";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import skillApi from "@api/skillApi";
import { useParams } from "react-router-dom";
import formValidator from "../../utils/formValidator";

function SkillForm() {
  const { mode, id } = useParams();

  const [form] = Form.useForm();

  const [messageApi, contextHolder] = notification.useNotification();
  const [callAping, setCallAping] = useState(false);

  const [initialValues, setInitialValues] = useState({
    id: "",
    name: "",
    description: "",
  });

  const fetchData = async () => {
    setCallAping(true);
    try {
      const res = await skillApi.getById(id);

      const data = res.data;

      setInitialValues(data);
      form.setFieldsValue(data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }finally {
      setCallAping(false);
    }
  };

  useEffect(() => {
    id && fetchData();
  }, [mode, id]);

  const onFinish = async (values) => {
    try {
      setCallAping(true);
  
      const skill = {
        name: values.name,
        description: values.description,
      };
  
      if (mode === "edit" && id) {
        await skillApi.update(id, skill);
        messageApi.success({ message: "Cập nhật kỹ năng thành công!", showProgress: true });
      } else {
        await skillApi.add(skill);
        messageApi.success({ message: "Thêm kỹ năng thành công!", showProgress: true });
      }
    } catch (error) {
      console.log("Error:", error);
      messageApi.error({ message: "Có lỗi xảy ra!" });
    } finally {
      setCallAping(false);
    }
  };

  function handleReset() {
    setInitialValues({
      name: "",
      description: "",
    });
  }

  return (
    <Spin spinning={callAping}>
      <motion.div
        className={scss["container-form"]}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {contextHolder}
        <Form
          layout="vertical"
          name="basic"
          autoComplete="off"
          form={form}
          onFinish={onFinish}
          initialValues={initialValues}
        >
          <Form.Item
            label={<b>Tên kỹ năng</b>}
            name="name"
            rules={formValidator.skillName()}
          >
            <Input type="text" placeholder="Tên hiển thị kỹ năng..." />
          </Form.Item>
          <Form.Item
            label={<b>Mô tả</b>}
            name="description"
            rules={formValidator.skillDescription()}
          >
            <Input.TextArea
              rows={5}
              placeholder="Mô tả chi tiết về kỹ năng..."
              showCount
              maxLength={10000}
            />
          </Form.Item>
          <Form.Item label={null} className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              {mode === "add" ? "Thêm" : "Cập nhật"} kỹ năng
            </Button>
            <Button
              className={"ms-3"}
              type="default"
              htmlType="reset"
              onClick={() => handleReset()}
            >
              đặt lại
            </Button>
          </Form.Item>
        </Form>
      </motion.div>
    </Spin>
  );
}

export default SkillForm;
