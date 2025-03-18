import scss from "./FreelancerInfo.module.scss";
import { Button, Divider, Tag, Skeleton, Space, Typography } from "antd";

const { Paragraph } = Typography;

const FreelancerView = ({ freelancer, skills, languages, setIsEditing }) => {
  const renderContent = () => (
    <div>
      <div className={scss.part}>
        <p className={scss.title}>Giới thiệu</p>
        <Divider />
        <Paragraph style={{ whiteSpace: "pre-line" }} className={scss.text}>
          {freelancer?.introduce}
        </Paragraph>
        <Divider />
      </div>
      <div className={scss.part}>
        <p className={scss.title}>Kỹ năng</p>
        {skills?.map((s) => (
          <Tag key={s.id} color="purple" className={scss.tag}>
            {s.name}
          </Tag>
        ))}
      </div>
      <Divider />
      <div className={scss.part}>
        <p className={scss.title}>Ngôn ngữ</p>
        {languages?.map((l) => (
          <Tag key={l.id} color="red" className={scss.tag}>
            {l.name}
          </Tag>
        ))}
      </div>
      <Button
        className="ms-auto d-block"
        type="primary"
        onClick={() => setIsEditing(true)}
      >
        Chỉnh sửa
      </Button>
    </div>
  );

  const renderSkeleton = () => (
    <div>
      <div className={scss.part}>
        <p className={scss.title}>Giới thiệu</p>
        <Skeleton active title={false} paragraph={{ rows: 5 }} />
      </div>
      <Divider />
      <div className={scss.part}>
        <p className={scss.title}>Kỹ năng</p>
        <Space>
          <Skeleton.Button active />
          <Skeleton.Button active />
          <Skeleton.Button active />
        </Space>
      </div>
      <Divider />
      <div className={scss.part}>
        <p className={scss.title}>Ngôn ngữ</p>
        <Space>
          <Skeleton.Button active />
          <Skeleton.Button active />
          <Skeleton.Button active />
        </Space>
      </div>
      <Skeleton.Button active className="ms-auto d-block" />
    </div>
  );

  return freelancer && skills && languages ? renderContent() : renderSkeleton();
};

export default FreelancerView;
