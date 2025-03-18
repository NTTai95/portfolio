import FreelancerInfo from "./FreelancerInfo";
import FreelancerApplies from "./FreelancerApplies";
import scss from "./FreelancerInfo.module.scss";
import { Tabs, Button } from "antd";
import freelancerApi from "@api/freelancerApi";
import profileApi from "@api/profileApi";
import { useEffect, useState } from "react";
import FreelancerFormAdd from "./FreelancerFormAdd";
import FreelancerHistory from "./FreelancerHistory";

function ProfileFreelancers() {
  const [freelancer, setFreelancer] = useState(null);

  const checkFreelancerId = async () => {
    try {
      const logined = JSON.parse(sessionStorage.getItem("logined"));
      if (!logined) return;

      const resFreelancer = await freelancerApi.getByAccountId(logined.id);
      setFreelancer(resFreelancer?.data);
    } catch (error) {
      console.error("Error checking freelancer:", error);
    }
  };

  useEffect(() => {
    checkFreelancerId();
  }, []);

  const items = [
    {
      key: "1",
      label: "Thông tin cá nhân",
      children: <FreelancerInfo />,
    },
    {
      key: "2",
      label: "Danh sách ứng tuyển",
      children: <FreelancerApplies freelancer={freelancer} />,
    },
    {
      key: "3",
      label: "Lịch sử làm việc",
      children: <FreelancerHistory freelancer={freelancer} />,
    },
  ];

  const onFinish = async (values) => {
    try {
      const logined = JSON.parse(sessionStorage.getItem("logined"));
      if (!logined) return;

      const resProfile = await profileApi.getByAccountId(logined.id);

      const freelancerDTO = {
        profileId: resProfile.data.id,
        introduce: values.introduce,
        skillIds: values.skills.map((skill) => skill.value),
        freelancerLanguages: values.languages.map((language) => ({
          languageId: language.value,
          level: 1,
        })),
      };

      await freelancerApi.create(freelancerDTO);
      checkFreelancerId();
    } catch (error) {
      console.error("Error creating freelancer:", error);
    }
  };

  return (
    <div className={scss.container}>
      {freelancer ? (
        <Tabs className={scss.barlow} defaultActiveKey="1" items={items} />
      ) : (
        <FreelancerFormAdd onFinish={onFinish} />
      )}
    </div>
  );
}

export default ProfileFreelancers;
