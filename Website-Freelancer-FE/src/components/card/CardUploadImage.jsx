import profileApi from "../../api/profileApi";
import scss from "./CardUploadImage.module.scss";
import { Card, Button, Upload, message, ConfigProvider } from "antd";
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from "react";

const CardUpLoadImage = ({ profile }) => {
  const [avatar, setAvatar] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();

  const props = {
    name: "file",
    customRequest: async ({ file, onSuccess, onError }) => {
      const formData = new FormData();
      formData.append("image", file);

      messageApi.open({
        key: "uploading",
        type: "loading",
        content: "Đang tải hình ảnh...",
        duration: 0,
      });

      const response = await profileApi.uploadImage(profile.id, formData);

      if (response.status == 200) {
        messageApi.open({
          key: "uploading",
          type: "success",
          content: "Cập nhật ảnh thành công!",
        });
        setAvatar(response.data.avatar);
      } else {
        messageApi.open({
          key: "uploading",
          type: "error",
          content: "Cập nhật hình ảnh!",
        });
      }
    },
    showUploadList: false,
  };

  useEffect(() => {
    if (profile) {
      setAvatar(profile?.avatar);
    }
  }, [profile]);

  return (
    <ConfigProvider theme={{ components: { Card: { bodyPadding: "10px" } } }}>
      <Card className={scss.card} cover={<img src={avatar} />}>
        <p className={scss.fullName}>{profile?.fullName}</p>
        {contextHolder}
        <ImgCrop rotationSlider>
          <Upload {...props} className={scss.upload}>
            <Button className={scss.button}>Thay đổi</Button>
          </Upload>
        </ImgCrop>
      </Card>
    </ConfigProvider>
  );
};

export default CardUpLoadImage;
