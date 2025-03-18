import { useState, useEffect } from "react";
import skillApi from "@api/skillApi";
import languageApi from "@api/languageApi";
import freelancerApi from "@api/freelancerApi";
import profileApi from "@api/profileApi";
import scss from "./Freelancer.module.scss";
import { Row, Col, Image, Typography, List, Card, Tooltip, Tag } from "antd";
import { useParams } from "react-router-dom";
import formater from "@utils/formater";

const colors = [
  "#FF5733",
  "#40bf42",
  "#3357FF",
  "#fcb900",
  "#FF33A1",
  "#A133FF",
];

const randomColor = colors[Math.floor(Math.random() * colors.length)];

const Freelancer = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Get profile data
      const profileRes = await profileApi.getByAccountId(id);
      if (profileRes.status === 200) {
        setProfile(profileRes.data);
      }

      // Get skills data
      const skillsRes = await skillApi.getByIds(
        profileRes?.data?.freelancer?.skillIds
      );
      if (skillsRes.status === 200) {
        setSkills(skillsRes.data);
      }

      // Get languages data
      const languagesRes = await languageApi.getByIds(
        profileRes?.data?.freelancer?.freelancerLanguages?.map(
          (language) => language.languageId
        )
      );
      if (languagesRes.status === 200) {
        setLanguages(languagesRes.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={"container"}>
      <div className={scss.info} style={{ background: randomColor }}>
        <Image className={scss.avatar} src={profile?.avatar} />
        <div>
          <h4 className={"mb-4"}>{profile?.fullName}</h4>
          <p className={scss.text}>
            <span className={scss.bold}>Ngày tham gia:</span>{" "}
            {formater.formatDate(profile?.joinDate)}
          </p>
          <p className={scss.text}>
            <span className={scss.bold}>Năm sinh:</span>{" "}
            {formater.formatDate(profile?.birthday)}
          </p>
          <p className={scss.text}>
            <span className={scss.bold}>Số điện thoại:</span> {profile?.phone}
          </p>
          <p className={scss.text}>
            <span className={scss.bold}>Email:</span>{" "}
            {profile?.account?.email?.length < 26 ? (
              profile?.account?.email
            ) : (
              <Tooltip title={profile?.account?.email}>
                {profile?.account?.email}
              </Tooltip>
            )}
          </p>
        </div>
      </div>
      <div>
        <Typography.Title level={4}>Giới thiệu</Typography.Title>
        <Typography.Paragraph style={{ whiteSpace: "pre-line" }}>
          {profile?.freelancer?.introduce}
        </Typography.Paragraph>

        <Typography.Title level={4}>Kĩ năng</Typography.Title>
        <div className={scss.cardTag}>
          {skills?.map((skill) => (
            <Tag color={randomColor} className={scss.tag} key={skill?.id}>
              {skill?.name}
            </Tag>
          ))}
        </div>
        <br />
        <Typography.Title level={4}>Ngôn ngữ</Typography.Title>
        <div className={scss.cardTag}>
          {languages?.map((language) => (
            <Tag color={randomColor} className={scss.tag} key={language?.id}>
              {language?.name}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Freelancer;
