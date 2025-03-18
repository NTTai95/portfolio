import { Typography, Divider, Tag } from "antd";
import { ClockCircleFilled, CreditCardFilled } from "@ant-design/icons";
import scss from "./PostDetail.module.scss";
import formater from "@utils/formater";

const { Title, Paragraph } = Typography;

function JobDescription({ jobpost, lastDatePost, skills }) {
  return (
    <>
      <Title className={scss.title} level={3}>
        {jobpost?.title}
      </Title>
      <div className={scss["info-icon"]}>
        <ClockCircleFilled className={scss.icon} />
        <span className={scss["text-grey"]}>
          Đăng cách đây {lastDatePost} trước
        </span>
      </div>
      <Divider />
      <div>
        <Title level={4}>Mô tả</Title>
        <Paragraph style={{ whiteSpace: "pre-line" }}>
          {jobpost?.description}
        </Paragraph>
      </div>
      <hr />
      <Title level={4}>Ngân sách</Title>
      <div className={scss["info-icon"]}>
        <CreditCardFilled className={scss.icon} />
        <span>{formater.formatCurrency(jobpost?.budget)}</span>
      </div>
      <Divider />
      <Title level={4}>Kỹ năng và Chuyên môn</Title>
      <div className={scss.skills}>
        {skills?.map((skill) => (
          <Tag color="purple" className={scss.tag} key={skill.id}>
            {skill.name}
          </Tag>
        ))}
      </div>
    </>
  );
}

export default JobDescription;
