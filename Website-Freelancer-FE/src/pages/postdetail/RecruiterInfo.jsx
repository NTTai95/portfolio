import { Typography, Avatar, Divider } from "antd";
import { ContainerFilled, PhoneFilled, MailFilled } from "@ant-design/icons";
import scss from "./PostDetail.module.scss";
import formater from "@utils/formater";

const { Title } = Typography;

function RecruiterInfo({ profile, navigate }) {
  return (
    <div>
      <Title level={3}>Nhà tuyển dụng</Title>
      <Divider />
      <Title level={4}>Đại diện</Title>
      <div className={scss.info}>
        <Avatar
          onClick={() => navigate(`/recruiter/${profile?.id}`)}
          className={scss.avatar}
          src={profile?.avatar}
        />
        <div className={scss.text}>
          <span
            onClick={() => navigate(`/recruiter/${profile?.id}`)}
            className={scss.fullName}
          >
            {profile?.fullName}
          </span>
          <span>{formater.formatDate(profile?.birthday)}</span>
        </div>
      </div>
      <Divider />
      <Title level={4}>Liên hệ</Title>
      <div className={scss["info-icon-small"]}>
        <ContainerFilled className={scss.icon} />
        <span>{profile?.recruiter?.name}</span>
      </div>
      <div className={scss["info-icon-small"]}>
        <PhoneFilled className={scss.icon} />
        <span>{profile?.phone}</span>
      </div>
      <div className={scss["info-icon-small"]}>
        <MailFilled className={scss.icon} />
        <span>{profile?.account?.email}</span>
      </div>
    </div>
  );
}

export default RecruiterInfo;
