import scss from "./LanguageForm.module.scss";
import { Button, Form, Input, notification, Spin, Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import languageApi from "@api/languageApi";
import { useParams } from "react-router-dom";
import formValidator from "@utils/formValidator";

const LanguageForm = () => {
  const { mode, id } = useParams();

  const [form] = Form.useForm();

  const [messageApi, contextHolder] = notification.useNotification();
  const [callAping, setCallAping] = useState(false);
  const [errorISOLoading, setErrorISOLoading] = useState(false);

  const [initialValues, setInitialValues] = useState({
    id: "",
    name: "",
    iso: "",
  });

  const fetchData = async () => {
    setCallAping(true);
    try {
      const res = await languageApi.getById(id);

      const data = res.data;

      setInitialValues(data);
      form.setFieldsValue(data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    } finally {
      setCallAping(false);
    }
  };

  useEffect(() => {
    id && fetchData();
  }, [mode, id]);

  const onFinish = async (values) => {
    try {
      setCallAping(true);

      const language = {
        name: values.name,
        iso: values.iso,
      };

      if (mode === "edit" && id) {
        await languageApi.update(id, language);
        messageApi.success({
          message: "Cập nhật ngôn ngữ thành công!",
          showProgress: true,
        });
      } else {
        await languageApi.add(language);
        messageApi.success({
          message: "Thêm ngôn ngữ thành công!",
          showProgress: true,
        });
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
      iso: "",
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
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label={<b>Tên ngôn ngữ</b>}
                name="name"
                rules={formValidator.languageName()}
              >
                <Input type="text" placeholder="Tên ngôn ngữ..." />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<b>Mã ISO</b>}
                name="iso"
                help={
                  errorISOLoading ? (
                    <Spin indicator={<LoadingOutlined spin />} size="small" />
                  ) : null
                }
                required
                rules={formValidator.iso(setErrorISOLoading, initialValues.iso)}
              >
                <Input type="text" placeholder="Mã ISO ngôn ngữ" />
              </Form.Item>
            </Col>
            <Form.Item label={null} className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                {mode === "add" ? "Thêm" : "Cập nhật"} ngôn ngữ
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
          </Row>
        </Form>
      </motion.div>
    </Spin>
  );
};

export default LanguageForm;
