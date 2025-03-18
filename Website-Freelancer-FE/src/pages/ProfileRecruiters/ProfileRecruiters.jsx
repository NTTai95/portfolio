import RecruiterInfo from "./RecruitersInfo";
import RecruiterJobs from "./RecruiterJobs";
//import RecruiterHistory from "./RecruiterHistory";
import scss from "./RecruiterInfo.module.scss";
import { Tabs } from "antd";
import recruiterApi from "@api/recruiterApi";
import profileApi from "@api/profileApi";
import { useEffect, useState } from "react";
import RecruiterFormAdd from "./RecruiterFormAdd";
import RecruiterDraft from "./RecruiterDraft";
import RecruiterHistory from "./RecruiterHistory";

function ProfileRecruiters() {
  const [recruiter, setRecruiter] = useState(null);

  const checkRecruiterId = async () => {
    try {
      const logined = JSON.parse(sessionStorage.getItem("logined"));
      if (!logined) return;

      const resRecruiter = await recruiterApi.getByAccountId(logined.id);
      setRecruiter(resRecruiter?.data);
    } catch (error) {
      console.error("Error checking recruiter:", error);
    }
  };

  useEffect(() => {
    checkRecruiterId();
  }, []);

  const items = [
    {
      key: "1",
      label: "Thông tin cá nhân",
      children: <RecruiterInfo />,
    },
    {
      key: "2",
      label: "Công việc đã đăng",
      children: <RecruiterJobs recruiter={recruiter} />,
    },
    {
      key: "3",
      label: "Bản nháp",
      children: <RecruiterDraft />,
    },
    {
      key: "4",
      label: "Lịch sử làm việc",
      children: <RecruiterHistory />,
    },
  ];

  const onFinish = async (values) => {
    try {
      const logined = JSON.parse(sessionStorage.getItem("logined"));
      if (!logined) return;

      const resProfile = await profileApi.getByAccountId(logined.id);
      const recruiterDTO = {
        profileId: resProfile.data.id,
        introduce: values.introduce,
        company: values.company,
      };

      await recruiterApi.create(recruiterDTO);
      checkRecruiterId();
    } catch (error) {
      console.error("Error creating recruiter:", error);
    }
  };

  return (
    <div className={scss.container}>
      {recruiter ? (
        <Tabs className={scss.barlow} defaultActiveKey="1" items={items} />
      ) : (
        <RecruiterFormAdd onFinish={onFinish} />
      )}
    </div>
  );
}

export default ProfileRecruiters;
