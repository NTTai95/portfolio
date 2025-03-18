import React, { useState, useEffect } from "react";
import scss from "./PostCard.module.scss";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Tag, Avatar, Button, Skeleton } from "antd";
import { UserOutlined, ClockCircleOutlined, DollarOutlined, EnvironmentOutlined } from "@ant-design/icons";


const PostCard = ({ job }) => {
  const navigate = useNavigate();
  const [recruiter, setRecruiter] = useState(null);
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecruiters = async () => {
    const id = job.recruiterId;
    try {
      const res = await recruiterApi.getById(id);
      setRecruiter(res.data);
    } catch (error) {
      console.error("Error fetching recruiters:", error);
    }
  };

  const fetchSkills = async () => {
    try {
      const res = await skillApi.getByIds(job.skillIds);
      setSkills(res.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchRecruiters(), fetchSkills()]);
      setLoading(false);
    };
    
    if (job) {
      loadData();
    }
  }, [job]);

  return (
    <>
      {loading ? (
        <div className={scss.cardSkeleton}>
          <Skeleton
            avatar
            paragraph={{
              rows: 4,
            }}
            active
          />
        </div>
      ) : (
        <div className={scss.card}>
          <div className={scss.header}>
            <div className={scss.headerLeft}>
              <Avatar
                className={scss.avatar}
                icon={<UserOutlined />}
                size={40}
                src={recruiter?.avatarUrl}
                onClick={() => navigate(`/recruiter/${recruiter?.id}`)}
              />
              <div className={scss.text}>
                <span
                  className={scss.title}
                  onClick={() => navigate(`/postdetail/${job?.id}`)}
                >
                  {job?.title}
                </span>
                <div className={scss.textMeta}>
                  <span
                    className={scss.name}
                    onClick={() => navigate(`/recruiter/${recruiter?.id}`)}
                  >
                    {recruiter?.name}
                  </span>
                  <span className={scss.dot}>•</span>
                  <span className={scss.day}>
                    {dayjs(job?.datePosted).format("HH:mm DD/MM/YYYY")}
                  </span>
                </div>
              </div>
            </div>
            <div className={scss.badge}>
              <Tag color="green">Freelance</Tag>
            </div>
          </div>

          <div className={scss.content}>
            <div className={scss.info}>
              <div className={scss.infoItem}>
                <DollarOutlined className={scss.icon} />
                <span className={scss.label}>Ngân sách: </span>
                <span className={scss.value}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(job.budget)}
                </span>
              </div>
              
              <div className={scss.infoItem}>
                <ClockCircleOutlined className={scss.icon} />
                <span className={scss.label}>Thời hạn: </span>
                <span className={scss.value}>
                  {job.deadline 
                    ? dayjs(job.deadline).format("DD/MM/YYYY")
                    : "Không có thời hạn"}
                </span>
              </div>
              
              {job.location && (
                <div className={scss.infoItem}>
                  <EnvironmentOutlined className={scss.icon} />
                  <span className={scss.label}>Địa điểm: </span>
                  <span className={scss.value}>{job.location}</span>
                </div>
              )}
            </div>
            
            <div className={scss.description}>
              <p>{job.description && job.description.length > 180
                ? `${job.description.substring(0, 180)}...`
                : job.description}
              </p>
            </div>
          </div>
          
          <div className={scss.footer}>
            <div className={scss.skills}>
              {skills ? (
                skills.map((skill) => (
                  <Tag key={skill.id} color="blue">{skill.name}</Tag>
                ))
              ) : (
                <div className={scss.skeletonTags}>
                  <Skeleton.Button active size="small" />
                  <Skeleton.Button active size="small" />
                  <Skeleton.Button active size="small" />
                </div>
              )}
            </div>
            <Button
              type="primary"
              onClick={() => navigate(`/postdetail/${job?.id}`)}
              className={scss.applyButton}
            >
              Xem chi tiết
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;