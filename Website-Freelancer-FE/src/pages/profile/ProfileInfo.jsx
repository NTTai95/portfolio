import { Button, Input, DatePicker, Form, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import formValidator from "@utils/formValidator";
import { useEffect, useState } from "react";

const ProfileInfo = ({ isEdit, initialValues, onEdit, onFinish, form }) => {
  const [errorPhoneLoading, setErrorPhoneLoading] = useState(false);
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

console.log(initialValues);

  if (!isEdit) {
    return (
      <div>
        <h1>{initialValues?.fullName}</h1>
        <hr />
        <h5>Ngày sinh</h5>
        <span>{formatDate(initialValues?.birthday)}</span>
        <h5>Số điện thoại</h5>
        <span>{initialValues?.phone}</span>
        <hr />
        <div className="text-end">
          <Button type="primary" ghost style={{ width: "100px" }} onClick={onEdit}>
            Chỉnh sửa
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form form={form} initialValues={initialValues} onFinish={onFinish}>
      <Form.Item name="fullName" rules={formValidator.fullName()}>
        <Input />
      </Form.Item>
      <hr />
      <h5>Ngày sinh</h5>
      <Form.Item name="birthday" rules={formValidator.birthday()}>
        <DatePicker format="DD/MM/YYYY" />
      </Form.Item>
      <h5>Số điện thoại</h5>
      <Form.Item
        name="phone"
        rules={formValidator.phone(setErrorPhoneLoading, initialValues?.phone)}
        help={errorPhoneLoading && <Spin indicator={<LoadingOutlined spin />} size="small" />}
      >
        <Input />
      </Form.Item>
      <hr />
      <div className="text-end">
        <Button type="primary" ghost style={{ width: "100px" }} htmlType="submit">
          Lưu
        </Button>
      </div>
    </Form>
  );
};

export default ProfileInfo;
