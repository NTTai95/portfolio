import { Button, Result, Spin } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import walletApi from "../../api/walletApi";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("Đang xử lý...");

  const [searchParams] = useSearchParams();

  const callBack = async () => {
    setIsLoading(true);
    try {
      const res = await walletApi.callback(searchParams);
      setIsSuccess(true);
      setMessage(res.data);
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
      setMessage(error.response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    searchParams.toString() != "" && callBack();
  }, []);

  return (
    <Spin spinning={isLoading}>
      {isSuccess ? (
        <Result
          status="success"
          title={message}
          extra={[
            <Button
              onClick={() => navigate("/profile")}
              type="primary"
              key="home"
            >
              Quay lại trang cá nhân
            </Button>,
          ]}
        />
      ) : (
        <Result
          status="error"
          title={message}
          extra={[
            <Button
              onClick={() => navigate("/profile")}
              type="primary"
              key="home"
            >
              Quay lại trang cá nhân
            </Button>,
          ]}
        />
      )}
    </Spin>
  );
}

export default PaymentSuccess;
