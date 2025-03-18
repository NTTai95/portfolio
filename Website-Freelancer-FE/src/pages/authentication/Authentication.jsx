import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  ConfigProvider,
  Checkbox,
  Form,
  message,
  Spin,
  notification,
} from "antd";
import scss from "./Authentication.module.scss";
import FlInputText from "@components/iu/input/FlInputText";
import FlInputPassword from "@components/iu/input/FlInputPassword";
import ButtonChat from "@components/iu/button/ButtonChat";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  CalendarOutlined,
  LoadingOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import authenticationApi from "@api/authenticationApi";
import FlCalendar from "@components/iu/input/FlCalendar";
import formValidator from "@utils/formValidator";

function Authentication({ isLogin }) {
  const [showLogin, setShowLogin] = useState(isLogin);
  const [text, setText] = useState("");
  const [imgGif, setImgGif] = useState("");

  const [errorPhoneLoading, setErrorPhoneLoading] = useState(false);
  const [errorEmailLoading, setErrorEmailLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const [api, contextHolder2] = notification.useNotification();

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const initialInput = () => {
    return { display: showLogin ? "block" : "none" };
  };

  const animateInput = (alwaysShow = false) => {
    return {
      display: showLogin && !alwaysShow ? "none" : "block",
      x: showLogin ? ["0%", "20%", "0%"] : ["0%", "-20%", "0%"],
    };
  };

  const transitionInput = (delay = 0) => {
    return {
      display: {
        duration: 0,
        delay: 1.05,
      },
      x: {
        duration: 1,
        delay: delay,
      },
    };
  };

  useEffect(() => {
    form.resetFields();

    const textTimeout = setTimeout(() => {
      setText(showLogin ? "Đăng nhập" : "Đăng ký");
    }, 1000);

    const gifTimeoutI = setTimeout(() => {
      setImgGif(
        showLogin
          ? "src/assets/gif/3dfreelancerEdit2.gif"
          : "src/assets/gif/3dfreelancerEdit.gif"
      );
    }, 1000);

    const gifTimeout = setTimeout(() => {
      setImgGif(
        showLogin
          ? "src/assets/gif/3dfreelancerEdit.gif"
          : "src/assets/gif/3dfreelancerEdit2.gif"
      );
    }, 4000);

    return () => {
      clearTimeout(textTimeout);
      clearTimeout(gifTimeout);
      clearTimeout(gifTimeoutI);
    };
  }, [showLogin]);

  async function onFinish(values) {
    const urlPrev = sessionStorage.getItem("urlPrev");

    if (showLogin) {
      try {
        const res = await authenticationApi.login(
          values.email,
          values.password
        );

        if (res.status == 200) {
          sessionStorage.setItem("logined", JSON.stringify(res.data));
          sessionStorage.removeItem("urlPrev");
          navigate(urlPrev || "/");
          window.location.reload();
        }
      } catch (error) {
        messageApi.open({
          type: "error",
          content: error.response.data,
        });
      }
    } else {
      if (!values.agree) {
        api.warning({
          message: "Thông báo!",
          description:
            "Vui lòng đồng ý với các điều khoản và chính sách của chúng tôi.",
          showProgress: true,
        });
        return;
      }
      authenticationApi
        .register(values)
        .then((response) => {
          if (response.status == 200) {
            sessionStorage.setItem("logined", JSON.stringify(response.data));

            navigate(urlPrev || "/profile/freelancer");
            window.location.reload();
          }
        })
        .catch((error) => {
          messageApi.open({
            type: "error",
            content: error.response.data,
          });
        });
    }
  }

  return (
    <div>
      {contextHolder}
      {contextHolder2}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Row>
          <Col span={16} offset={4}>
            <Row className={scss.card}>
              <Col
                span={12}
                style={{
                  order: showLogin ? 1 : 2,
                  zIndex: 0,
                }}
              >
                <motion.div
                  className={scss.formLogin}
                  key={showLogin ? "cardLogin" : "cardRegister"}
                  initial={{ x: showLogin ? "100%" : "-100%" }}
                  animate={{
                    x: showLogin
                      ? ["100%", "105%", "0%"]
                      : ["-100%", "-105%", "0%"],
                    transition: {
                      duration: 2,
                      ease: [0.4, 0, 0.6, 1],
                      times: [0, 0.2, 0.8],
                    },
                  }}
                >
                  <div className={scss["base"]}>
                    <div className={scss["title"]}>
                      <motion.h4
                        animate={{
                          x: showLogin
                            ? ["0%", "20%", "0%"]
                            : ["0%", "-20%", "0%"],
                        }}
                        transition={{ duration: 1 }}
                      >
                        {text.toUpperCase()}
                      </motion.h4>
                    </div>
                    <Form
                      autoComplete="off"
                      style={{ fontFamily: "rasa" }}
                      name="basic"
                      form={form}
                      onFinish={onFinish}
                    >
                      <motion.div
                        className={scss.mb15px}
                        key={showLogin ? "fullNameLogin" : "fullNameRegister"}
                        initial={initialInput}
                        animate={animateInput}
                        transition={transitionInput(0.1)}
                      >
                        <Form.Item
                          name="fullName"
                          rules={showLogin ? [] : formValidator.fullName()}
                        >
                          <FlInputText label="Họ tên" icon={<UserOutlined />} />
                        </Form.Item>
                      </motion.div>
                      <Row gutter={16}>
                        <Col span={12}>
                          <motion.div
                            className={scss.mb15px}
                            key={
                              showLogin ? "birthdayLogin" : "birthdayRegister"
                            }
                            initial={initialInput}
                            animate={animateInput}
                            transition={transitionInput(0.2)}
                          >
                            <Form.Item
                              name="birthday"
                              rules={
                                showLogin ? [] : formValidator.birthday(14)
                              }
                            >
                              <FlCalendar
                                label="Ngày sinh"
                                icon={<CalendarOutlined />}
                              />
                            </Form.Item>
                          </motion.div>
                        </Col>
                        <Col span={12}>
                          <motion.div
                            className={scss.mb15px}
                            key={showLogin ? "phoneLogin" : "phoneRegister"}
                            initial={initialInput}
                            animate={animateInput}
                            transition={transitionInput(0.2)}
                          >
                            <Form.Item
                              name="phone"
                              help={
                                errorPhoneLoading ? (
                                  <Spin
                                    indicator={<LoadingOutlined spin />}
                                    size="small"
                                  />
                                ) : null
                              }
                              rules={
                                showLogin
                                  ? []
                                  : formValidator.phone(setErrorPhoneLoading)
                              }
                            >
                              <FlInputText
                                label="Số điện thoại"
                                icon={<PhoneOutlined rotate={90} />}
                              />
                            </Form.Item>
                          </motion.div>
                        </Col>
                      </Row>
                      <motion.div
                        className={scss.mb15px}
                        key={showLogin ? "emailLogin" : "emailRegister"}
                        animate={animateInput(true)}
                        transition={transitionInput(showLogin ? 0.3 : 0.1)}
                      >
                        <Form.Item
                          name="email"
                          help={
                            errorEmailLoading ? (
                              <Spin
                                indicator={<LoadingOutlined spin />}
                                size="small"
                              />
                            ) : null
                          }
                          rules={formValidator.email(
                            setErrorEmailLoading,
                            "",
                            !showLogin
                          )}
                        >
                          <FlInputText label="Email" icon={<MailOutlined />} />
                        </Form.Item>
                      </motion.div>
                      <motion.div
                        className={scss.mb15px}
                        key={showLogin ? "passwordLogin" : "passwordRegister"}
                        animate={animateInput(true)}
                        transition={transitionInput(showLogin ? 0.4 : 0.2)}
                      >
                        <Form.Item
                          name="password"
                          rules={
                            showLogin
                              ? [
                                  {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu!",
                                  },
                                ]
                              : formValidator.password()
                          }
                        >
                          <FlInputPassword
                            label="Mật khẩu"
                            icon={<LockOutlined />}
                          />
                        </Form.Item>
                      </motion.div>
                      <motion.div
                        className={scss.mb15px}
                        key={
                          showLogin
                            ? "confirmPasswordLogin"
                            : "confirmPasswordRegister"
                        }
                        initial={initialInput}
                        animate={animateInput}
                        transition={transitionInput(0.5)}
                      >
                        <Form.Item
                          name="confirmPassword"
                          rules={
                            showLogin
                              ? []
                              : [
                                  {
                                    required: true,
                                    message: "Vui lòng xác nhận mật khẩu!",
                                  },
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (
                                        !value ||
                                        getFieldValue("password") === value
                                      ) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(
                                        new Error("Mật khẩu không khớp!")
                                      );
                                    },
                                  }),
                                ]
                          }
                        >
                          <FlInputPassword
                            label="Xác nhận mật khẩu"
                            icon={<LockOutlined />}
                          />
                        </Form.Item>
                      </motion.div>
                      <motion.div
                        className={scss["text-right"] + " " + scss.mb30px}
                        initial={{ display: showLogin ? "none" : "flex" }}
                        animate={{ display: showLogin ? "flex" : "none" }}
                        transition={{ duration: 0, delay: 1 }}
                      >
                        <a href="#" onClick={() => navigate("/forgotpassword")}>
                          Quên mật khẩu?
                        </a>
                      </motion.div>
                      <motion.div
                        className={scss.mb30px}
                        initial={{ display: showLogin ? "block" : "none" }}
                        animate={{ display: showLogin ? "none" : "block" }}
                        transition={{ duration: 0, delay: 1 }}
                      >
                        <Form.Item name="agree" valuePropName="checked">
                          <Checkbox className={scss.checkbox}>
                            Đồng ý với <a href="#">điều khoản</a> và
                            <a href="#"> chính sách</a>
                          </Checkbox>
                        </Form.Item>
                      </motion.div>
                      <ConfigProvider
                        theme={{
                          components: {
                            Button: {
                              colorPrimary: "#1493e2",
                              colorPrimaryHover: "#1493e2",
                              colorPrimaryActive: "#1493e2",
                              borderRadius: 5,
                            },
                          },
                        }}
                      >
                        <Button
                          className={scss.btnAuthentication}
                          color="Primary"
                          variant="solid"
                          htmlType="submit"
                          block
                        >
                          <b>{text}</b>
                        </Button>
                      </ConfigProvider>
                    </Form>
                  </div>
                </motion.div>
              </Col>
              <Col
                span={12}
                style={{
                  order: showLogin ? 2 : 1,
                  zIndex: 1,
                }}
              >
                <motion.div
                  className={scss.bgLogin}
                  key={showLogin ? "bannerLogin" : "bannerRegister"}
                  initial={{ x: showLogin ? "-100%" : "100%" }}
                  animate={{
                    x: showLogin
                      ? ["-100%", "-105%", "0%"]
                      : ["100%", "105%", "0%"],
                    transition: {
                      duration: 2,
                      ease: [0.4, 0, 0.6, 1],
                      times: [0, 0.2, 0.8],
                    },
                  }}
                >
                  <div className={scss.logo}>
                    <span>FREELANCER</span>
                  </div>
                  <motion.div
                    className={scss.welcome}
                    animate={{ opacity: [0, 1] }}
                    transition={{ duration: 2, delay: 0.35 }}
                  >
                    <span>
                      {showLogin
                        ? "Xin chào! Vui lòng đăng nhập để truy cập tài khoản của bạn và tiếp tục công việc."
                        : "Chào mừng bạn đến với chúng tôi! Đăng ký ngay để khám phá và tận dụng mọi cơ hội."}
                    </span>
                  </motion.div>
                  <motion.div
                    className={scss.buttonChat}
                    animate={{
                      rotateZ: 360,
                      transition: {
                        duration: 0.65,
                      },
                    }}
                  >
                    <ButtonChat
                      text={showLogin ? "Đăng ký" : "Đăng nhập"}
                      onClick={() => setShowLogin(!showLogin)}
                    ></ButtonChat>
                  </motion.div>
                  <motion.div
                    className={scss.gif}
                    initial={
                      showLogin
                        ? {
                            x: "50%",
                            opacity: 0,
                            transition: { duration: 1, delay: 0.8 },
                          }
                        : { x: "0%", opacity: 1, transition: { duration: 1 } }
                    }
                    animate={
                      showLogin
                        ? {
                            x: "0%",
                            opacity: 1,
                            transition: { duration: 1, delay: 0.8 },
                          }
                        : {
                            x: "50%",
                            opacity: 0,
                            display: "none",
                            transition: {
                              duration: 1,
                              display: {
                                delay: 1,
                              },
                            },
                          }
                    }
                  >
                    <img
                      className={scss.img1}
                      src="src/assets/gif/FreelacerEdit.gif"
                    />
                  </motion.div>
                  <motion.div
                    className={scss.gif}
                    initial={
                      showLogin ? { opacity: 1 } : { opacity: 0, x: "-50%" }
                    }
                    animate={
                      showLogin
                        ? {
                            opacity: 0,
                            x: "-50%",
                            display: "none",
                            transition: { duration: 1, display: { delay: 1 } },
                          }
                        : {
                            opacity: 1,
                            x: "0%",
                            transition: { duration: 1, delay: 0.8 },
                          }
                    }
                  >
                    <img className={scss.img2} src={imgGif} />
                  </motion.div>
                </motion.div>
              </Col>
            </Row>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
}

export default Authentication;
