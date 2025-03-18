import React, { useEffect } from "react";
import scss from "./JobCard.module.scss";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Tag, Avatar, Button, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import recruiterApi from "@api/recruiterApi";
import skillApi from "@api/skillApi";
import Highlighter from "react-highlight-words";

const JobCard = ({ job, hightLight }) => {
  const navigate = useNavigate();
  const [recruiter, setRecruiter] = useState(null);
  const [skills, setSkills] = useState(null);

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
    fetchRecruiters();
    fetchSkills();
  }, []);

  return (
    <>
      {job && recruiter ? (
        <div className={scss.card}>
          <div className={scss.header}>
            <Avatar
              className={scss.avatar}
              icon={<UserOutlined />}
              size={40}
              onClick={() => navigate(`/recruiter/${recruiter?.id}`)}
            />
            <div className={scss.text}>
              <span
                className={scss.title}
                onClick={() => navigate(`/jobpostdetail/${job?.id}`)}
              >
                <Highlighter
                  highlightStyle={{ backgroundColor: "#94dffa", padding: 0 }}
                  searchWords={[hightLight]}
                  autoEscape
                  textToHighlight={job?.title || ""}
                ></Highlighter>
              </span>
              <div className={scss.text2}>
                <span
                  className={scss.name}
                  onClick={() => navigate(`/recruiter/${recruiter?.id}`)}
                >
                  {recruiter?.name}
                </span>
                <span className={scss.day}>
                  {dayjs(job?.datePosted).format("HH:mm DD/MM/YYYY")}
                </span>
              </div>
            </div>
          </div>

          <div className={scss.context}>
            <div className={scss.budget}>
              <span className={scss.bold}>Ngân sách: </span>
              <span className={scss.thin}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(job.budget)}
              </span>
            </div>
            <div className={scss.description}>
              <Highlighter
                className={scss.thin}
                highlightStyle={{ backgroundColor: "#94dffa", padding: 0 }}
                searchWords={[hightLight]}
                autoEscape
                textToHighlight={job?.description || ""}
              ></Highlighter>
            </div>
          </div>
          <div className={scss.footer}>
            {skills ? (
              <div>
                {skills.map((skill) => (
                  <Tag key={skill.id} color="blue">
                    <Highlighter
                      highlightStyle={{
                        backgroundColor: "#94dffa",
                        padding: 0,
                      }}
                      searchWords={[hightLight]}
                      autoEscape
                      textToHighlight={skill?.name || ""}
                    ></Highlighter>
                  </Tag>
                ))}
              </div>
            ) : (
              <div className={"d-flex gap-3"}>
                <Skeleton.Button active />
                <Skeleton.Button active />
                <Skeleton.Button active />
              </div>
            )}
            <Button
              onClick={() => navigate(`/jobpostdetail/${job?.id}`)}
              type="primary"
            >
              Ứng tuyển
            </Button>
          </div>
        </div>
      ) : (
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      )}
    </>
  );
};

export default JobCard;
