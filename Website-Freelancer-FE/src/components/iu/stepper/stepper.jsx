import React, { useState } from "react";
import { Button, Steps, Form, message } from "antd";
import scss from "./Stepper.module.scss";
import { useEffect } from "react";

const Stepper = ({ current, setCurrent, steps, post, save, initialValues }) => {
  const isLastStep = current === steps.length - 1;
  const [form] = Form.useForm();

  const prev = () => {
    setCurrent(current - 1);
  };
  const next = () => {
    setCurrent(current + 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const onFinish = (values) => {
    const { action } = values;

    if (action === "save") {
      save(values);
    } else if (action === "saveAndPost") {
      post(values);
    } else if (action === "saveAndNext") {
      save(values);
      next();
    }
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Form form={form} onFinish={onFinish} initialValues={initialValues}>
      <Steps current={current} items={items} />
      <div className={scss.containerStepper}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        <Form.Item name="action">
          {current > 0 && (
            <Button htmlType="button" className={scss.prev} onClick={prev}>
              quay lại
            </Button>
          )}
          {isLastStep ? (
            <>
              <Button
                className={scss.next}
                type="primary"
                htmlType="submit"
                onClick={() => form.setFieldsValue({ action: "save" })}
              >
                Lưu
              </Button>
              <Button
                className={scss.next}
                type="primary"
                htmlType="submit"
                onClick={() => form.setFieldsValue({ action: "saveAndPost" })}
              >
                Lưu và đăng bài
              </Button>
            </>
          ) : (
            <Button
              className={scss.next}
              type="primary"
              htmlType="submit"
              onClick={() => form.setFieldsValue({ action: "saveAndNext" })}
            >
              Lưu và tiếp tục
            </Button>
          )}
        </Form.Item>
      </div>
    </Form>
  );
};

export default Stepper;
