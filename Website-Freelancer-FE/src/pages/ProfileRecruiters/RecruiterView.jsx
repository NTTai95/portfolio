import scss from "./RecruiterInfo.module.scss";
import { Button, Divider, Skeleton } from "antd";

const RecruiterView = ({ recruiter, setIsEditing }) => {
  const renderContent = () => (
    <div>
      <div className={scss.part}>
        <p className={scss.title}>Tên công ty</p>
        <Divider />
        <p className={scss.text}>{recruiter?.name}</p>
      </div>
      <Divider />
      <div className={scss.part}>
        <p className={scss.title}>Giới thiệu</p>
        <Divider />
        <p style={{whiteSpace: "pre-line"}} className={scss.text}>{recruiter?.introduce}</p>
      </div>
      <Divider />
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
        <p className={scss.title}>Tên công ty</p>
        <Skeleton active title={false} paragraph={{ rows: 1 }} />
      </div>
      <Divider />
      <div className={scss.part}>
        <p className={scss.title}>Giới thiệu</p>
        <Skeleton active title={false} paragraph={{ rows: 5 }} />
      </div>
      <Divider />
      <Skeleton.Button active className="ms-auto d-block" />
    </div>
  );

  return recruiter ? renderContent() : renderSkeleton();
};

export default RecruiterView;