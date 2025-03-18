import React, { useEffect } from "react";
import { Card, Avatar } from "antd";
import scss from "./FreelancerCard.module.scss";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const FreelancerCard = ({ profile }) => {
    const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/freelancers/${profile?.freelancer?.id}`)} hoverable className={scss.card}>
      <div className={scss.containerAvatar}>
        <Avatar className={scss.avatar} size={80} src={profile?.avatar} />
      </div>
      <p className={scss.fullName}>{profile?.fullName}</p>
      <p className={scss.birthday}>{dayjs(profile?.birthday).format("DD/MM/YYYY")}</p>
    </Card>
  );
};

export default FreelancerCard;
