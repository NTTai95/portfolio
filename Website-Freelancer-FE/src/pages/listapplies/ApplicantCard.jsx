import React, { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import scss from "./ApplicantCard.module.scss";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import profileApi from "../../api/profileApi";


const ApplicantCard = ({ applicant }) => {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileApi.getByFreelancerId(applicant?.freelancerId);
        setProfile(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []
  )
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/jobpost/apply/${applicant?.id}`)} hoverable className={scss.card}>
      <div className={scss.containerAvatar}>
        <Avatar className={scss.avatar} size={80} src={profile?.avatar} />
      </div>
      <p className={scss.fullName}>{profile?.fullName}</p>
      <p className={scss.birthday}>{dayjs(profile?.birthday).format("DD/MM/YYYY")}</p>
    </Card>
  );
};

export default ApplicantCard;
