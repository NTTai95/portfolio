import { useState } from "react";
import { Button, Input, notification } from "antd";
import accountApi from "@api/accountApi";
import scss from "./ChangePassword.module.scss";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginedUser = JSON.parse(sessionStorage.getItem("logined"));
  const userId = loginedUser ? loginedUser.id : null;

  const handleChangePassword = async () => {
    if (!userId) {
      notification.error({
        message: "Lỗi",
        description: "Không tìm thấy ID tài khoản!",
        placement: "topRight",
      });
      return;
    }

    if (!currentPassword.trim()) {
      notification.warning({
        message: "Lỗi",
        description: "Vui lòng nhập mật khẩu hiện tại!",
        placement: "topRight",
      });
      return;
    }

    if (newPassword.length < 6) {
      notification.warning({
        message: "Lỗi",
        description: "Mật khẩu mới phải có ít nhất 6 ký tự!",
        placement: "topRight",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      notification.warning({
        message: "Lỗi",
        description: "Mật khẩu mới và xác nhận mật khẩu không khớp!",
        placement: "topRight",
      });
      return;
    }

    try {
      setLoading(true);

      
      const checkRes = await accountApi.checkPassword(userId, currentPassword);
      if (!checkRes.data) {
        notification.error({
          message: "Lỗi",
          description: "Mật khẩu hiện tại không đúng!",
          placement: "topRight",
        });
        setLoading(false);
        return;
      }
      console.log("Dữ liệu gửi đi:", { password: newPassword });
      
      await accountApi.changePasswordProfile(userId, { password: newPassword });

      notification.success({
        message: "Thành công",
        description: "Đổi mật khẩu thành công!",
        placement: "topRight",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: error.response?.data?.message || "Đổi mật khẩu thất bại!",
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={scss.container}>
      <h2 className={scss.title}>Đổi mật khẩu</h2>
      <div className={scss.inputGroup}>
        <label className={scss.label}>Mật khẩu hiện tại</label>
        <Input.Password
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className={scss.input}
        />
      </div>
      <div className={scss.inputGroup}>
        <label className={scss.label}>Mật khẩu mới</label>
        <Input.Password
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={scss.input}
        />
      </div>
      <div className={scss.inputGroup}>
        <label className={scss.label}>Xác nhận mật khẩu mới</label>
        <Input.Password
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={scss.input}
        />
      </div>
      <Button
        type="primary"
        onClick={handleChangePassword}
        className={scss.button}
        loading={loading}
        disabled={loading}
      >
        Đổi mật khẩu
      </Button>
    </div>
  );
};

export default ChangePassword;
