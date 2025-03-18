import { Form, notification } from "antd";
import scss from "./Profile.module.scss";
import React, { useEffect, useState } from "react";
import profileApi from "@api/profileApi";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ProfileInfo from "./ProfileInfo";
import WalletCard from "./WalletCard";
import SummaryCard from "./SummaryCard";

dayjs.extend(utc);
dayjs.locale("vi");

function Profile() {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [messageApi, contextHolder] = notification.useNotification();
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    birthday: "",
    phone: "",
    wallet: "",
  });

  const formatProfileData = (data) => ({
    id: data.id,
    fullName: data.fullName,
    birthday: dayjs(data.birthday),
    email: data.account.email,
    phone: data.phone,
    wallet: data.wallet,
  });

  const updateFormData = (data) => {
    const formattedData = formatProfileData(data);
    setInitialValues(formattedData);
    form.setFieldsValue(formattedData);
  };

  async function getProfile() {
    try {
      const logined = JSON.parse(sessionStorage.getItem("logined"));
      const { data } = await profileApi.getByAccountId(logined.id);
      updateFormData(data);
    } catch (error) {
      console.error(error);
    }
  }

  const onFinish = async (values) => {
    try {
      const { data } = await profileApi.update(initialValues.id, values);
      updateFormData(data);
      messageApi.success({
        message: "Cập nhật hồ sơ thành công!",
        showProgress: true,
      });
      setIsEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="container">
      {contextHolder}
      <div className="row">
        <div className="col-8">
          <ProfileInfo
            isEdit={isEdit}
            initialValues={initialValues}
            onEdit={() => setIsEdit(true)}
            onFinish={onFinish}
            form={form}
          />
        </div>
        <div className={`col-4 ${scss.col3}`}>
          <WalletCard wallet={initialValues?.wallet} />
          <SummaryCard />
        </div>
      </div>
    </div>
  );
}

export default Profile;