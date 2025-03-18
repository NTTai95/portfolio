import scss from "./SkillForm.module.scss";
import {
  Button,
  Col,
  Row,
  Form,
  Input,
  Radio,
  DatePicker,
  ConfigProvider,
  Checkbox,
  notification,
  Skeleton,
  Tooltip,
  Spin,
} from "antd";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { motion } from "motion/react";
import permissionApi from "@api/permissionApi";
import staffApi from "@api/staffApi";
import { useParams } from "react-router-dom";
import utc from "dayjs/plugin/utc";
import formValidator from "@utils/formValidator";

dayjs.extend(utc);
dayjs.locale("vi");

const currentDate = new Date();
const fomatDate = "YYYY-MM-DD";
const maxDate = new Date(
  currentDate.getFullYear() - 18,
  currentDate.getMonth(),
  currentDate.getDate()
);
const minDate = new Date(
  currentDate.getFullYear() - 100,
  currentDate.getMonth(),
  currentDate.getDate()
);

function StaffForm() {
  const [form] = Form.useForm();

  const { mode, id } = useParams();

  const [messageApi, contextHolder] = notification.useNotification();

  const [errorEmailLoading, setErrorEmailLoading] = useState(false);
  const [errorPhoneLoading, setErrorPhoneLoading] = useState(false);

  const [permissions, setPermissions] = useState([]);

  const [callAping, setCallAping] = useState(false);

  const [initialValues, setInitialValues] = useState({
    fullName: "",
    birthday: null,
    email: "",
    phone: "",
    status: "working",
    permissions: [],
  });

  const fetchPermissions = async () => {
    try {
      const res = await permissionApi.getAll();

      setPermissions(res.data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };
  const fetchData = async () => {
    setCallAping(true);
    try {
      const res = await staffApi.getById(id);
      const data = res.data;

      console.log(data)

      const formatData = {
        fullName: data.fullName,
        birthday: dayjs(data.birthday),
        email: data?.email,
        password: data?.password,
        phone: data.phone,
        status: data.status == 0 ? "working" : "notWorking",
        permissions: data.permissionIds,
      };

      setInitialValues(formatData);
      form.setFieldsValue(formatData);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
    setCallAping(false);
  };

  useEffect(() => {
    fetchPermissions();
    id && fetchData();
  }, [mode, id]);

  const onFinish = async (values) => {
    try {
      setCallAping(true);

      const staffDTO = {
        fullName: values.fullName,
        birthday: values.birthday.format(fomatDate),
        phone: values.phone,
        status: values.status === "working" ? 0 : 1,
        email: values.email,
        password: values.password,
        permissionIds: values.permissions,
      };

      console.log(staffDTO);

      if (mode === "edit" && id) {
        await staffApi.update(id, staffDTO);
        messageApi.success({
          message: "Cập nhật nhân viên thành công!",
          showProgress: true,
        });
        fetchData();
      } else {
        await staffApi.add(staffDTO);
        messageApi.success({
          message: "Thêm nhân viên thành công!",
          showProgress: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      messageApi.error({ message: "Có lỗi xảy ra!" });
    } finally {
      setCallAping(false);
    }
  };

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
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={<b>Tên nhân viên</b>}
                name="fullName"
                rules={formValidator.fullName()}
              >
                <Input type="text" placeholder="VD: Nguyễn Văn A" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <ConfigProvider locale={viVN}>
                <Form.Item
                  label={<b>Ngày sinh</b>}
                  name="birthday"
                  required
                  rules={formValidator.birthday()}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format="DD/MM/YYYY"
                    placeholder="VD: 01/01/2000"
                    minDate={dayjs(minDate.toISOString(), fomatDate)}
                    maxDate={dayjs(maxDate.toISOString(), fomatDate)}
                  />
                </Form.Item>
              </ConfigProvider>
            </Col>
            <Col span={8}>
              <Form.Item
                label={<b>Số điện thoại</b>}
                name="phone"
                help={
                  errorPhoneLoading ? (
                    <Spin indicator={<LoadingOutlined spin />} size="small" />
                  ) : null
                }
                required
                rules={formValidator.phone(
                  setErrorPhoneLoading,
                  initialValues.phone
                )}
              >
                <Input type="text" placeholder="VD: 099999999" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<b>Email</b>}
                name="email"
                help={
                  errorEmailLoading ? (
                    <Spin indicator={<LoadingOutlined spin />} size="small" />
                  ) : null
                }
                rules={formValidator.email(
                  setErrorEmailLoading,
                  initialValues.email
                )}
              >
                <Input placeholder="VD: example@gmail.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<b>Mật khẩu</b>}
                name="password"
                required
                rules={formValidator.password()}
              >
                <Input.Password
                  placeholder="VD: 12345678"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label={<b>Trạng thái</b>} required name="status">
            <Radio.Group>
              <Radio value="working"> Làm việc </Radio>
              <Radio value="notWorking"> Nghĩ việc </Radio>
            </Radio.Group>
          </Form.Item>
          <Skeleton
            paragraph={{ rows: 1 }}
            active
            loading={!permissions.length != 0 || !permissions}
          >
            <Form.Item label={<b>Chức vụ</b>} name="permissions">
              <Checkbox.Group>
                {permissions.length && permissions.map((permission) => (
                  <Tooltip key={permission.id} title={permission.description}>
                    <Checkbox value={permission.id}>{permission.name}</Checkbox>
                  </Tooltip>
                ))}
              </Checkbox.Group>
            </Form.Item>
          </Skeleton>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              {mode === "edit" ? "Cập nhật" : "Thêm"} nhân viên
            </Button>
          </Form.Item>
        </Form>
      </motion.div>
    </Spin>
  );
}
export default StaffForm;
