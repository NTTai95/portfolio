
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function Page404() {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Rất tiếc, trang bạn đã truy cập không tồn tại."
      extra={<Button type="primary">Về trang chủ</Button>}
    />
  );
}

export default Page404;
