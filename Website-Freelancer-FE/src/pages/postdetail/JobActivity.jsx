import { Typography } from "antd";
import { CalendarFilled } from "@ant-design/icons";
import scss from "./PostDetail.module.scss";
import formater from "@utils/formater";

const { Title, Text } = Typography;

function JobActivity({ jobpost }) {
  return (
    <div className={scss.activity}>
      <Title level={4}>Hoạt động trong công việc này</Title>
      <Title level={5}>Thời gian bắt đầu</Title>
      <div className={scss["info-icon-small"]}>
        <CalendarFilled className={scss.icon} />
        <Text>{formater.formatDate(jobpost?.startDate)}</Text>
      </div>
      <br />
      <Title level={5}>Thời gian kết thúc</Title>
      <div className={scss["info-icon-small"]}>
        <CalendarFilled className={scss.icon} />
        <Text>{formater.formatDate(jobpost?.startEnd)}</Text>
      </div>
    </div>
  );
}

export default JobActivity;
