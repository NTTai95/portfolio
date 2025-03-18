import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Typography,
  Space,
  Layout,
  Form,
  Spin,
  notification,
  message,
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import formValidator from "@utils/formValidator";
import forgotPasswordApi from "@api/forgotPasswordApi";

const { Title, Text } = Typography;
const { Content } = Layout;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [notificationApi, contextNotification] = notification.useNotification();
  const [messageApi, contextMessage] = message.useMessage();
  const [Calling, setCalling] = React.useState(false);

  const onFinish = async (values) => {
    setCalling(true);
    try {
      const res = await forgotPasswordApi.create(values?.email);
      if (res.status == 200) {
        notificationApi.success({
          message: "Gửi yêu cầu thành công",
          description: (
            <>
              <p className={"m-0"}>Vui lòng kiểm tra email để đổi mật khẩu!</p>
              <p className={"text-warning"}>Yêu cầu có hiệu lực trong 15 phút.</p>
            </>
          ),
          duration: 5,
          showProgress: true,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data,
      });
    }
    setCalling(false);
  };

  return (
    <Content className="bg-light p-3 p-md-4 p-xl-5">
      {contextNotification}
      {contextMessage}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-11">
            <div className="card border-light-subtle shadow-sm">
              <div className="row g-0">
                <div className="col-6 d-flex justify-content-center">
                  <img
                    className="img-fluid rounded-start w-75"
                    loading="lazy"
                    src="src/assets/gif/forgotPassword.gif"
                    alt="Welcome back you've been missed!"
                  />
                </div>
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <div className="col-12 col-lg-11 col-xl-10">
                    <div className="card-body p-3 p-md-4 p-xl-5">
                      <Space
                        direction="vertical"
                        className="w-100"
                        size="large"
                      >
                        <div className="text-center">
                          <Title level={1}>FREELANCER</Title>
                          <Title level={4}>Quên mật khẩu!</Title>
                          <Text type="secondary">
                            Cung cấp địa chỉ email được liên kết với tài khoản
                            của bạn để khôi phục mật khẩu.
                          </Text>
                        </div>
                        <Spin spinning={Calling}>
                          <Form onFinish={onFinish}>
                            <Space
                              direction="vertical"
                              className="w-100"
                              size="middle"
                            >
                              <Form.Item
                                name="email"
                                rules={formValidator.email("", "", false)}
                              >
                                <Input
                                  size="large"
                                  placeholder="Email"
                                  prefix={<MailOutlined />}
                                />
                              </Form.Item>
                              <Button
                                type="primary"
                                size="large"
                                block
                                htmlType="submit"
                              >
                                Gửi yêu cầu
                              </Button>
                            </Space>
                          </Form>
                        </Spin>
                        <Space className="w-100 justify-content-center">
                          <Button
                            type="link"
                            onClick={() => navigate("/login")}
                          >
                            Đăng nhập
                          </Button>
                          <Button
                            type="link"
                            onClick={() => navigate("/register")}
                          >
                            Đăng ký
                          </Button>
                        </Space>
                      </Space>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default ForgotPassword;
