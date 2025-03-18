import scss from "./PostDetail.module.scss";
import { Button, Form, Col, Row, Divider, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jobspostApi from "@api/jobspostApi";
import skillApi from "@api/skillApi";
import profileApi from "@api/profileApi";
import freelancerApi from "@api/freelancerApi";
import applyApi from "@api/applyApi";
import dayjs from "dayjs";
import formater from "@utils/formater";
import geminiCall from "@utils/geminiCall";

import JobDescription from "./JobDescription";
import JobActivity from "./JobActivity";
import RecruiterInfo from "./RecruiterInfo";
import ApplyForm from "./ApplyForm";

function PostDetail() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [jobpost, setJobPost] = useState(null);
  const [lastDatePost, setLastDatePost] = useState(0);
  const [skills, setSkills] = useState(null);
  const [profile, setProfile] = useState(null);
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [loadingCall, setLoadingCall] = useState(false);
  const logined = JSON.parse(sessionStorage.getItem("logined"));
  const [freelancer, setFreelancer] = useState(null);
  const [apply, setApply] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = async () => {
    try {
      const jobRes = await jobspostApi.getById(id);
      setJobPost(jobRes.data);
      setLastDatePost(
        formater.timePeriodFromNow(dayjs(jobRes.data.datePosted))
      );

      const [skillsRes, profileRes] = await Promise.all([
        skillApi.getByIds(jobRes.data.skillIds),
        profileApi.getByRecruiterId(jobRes.data.recruiterId),
      ]);

      setSkills(skillsRes.data);
      setProfile(profileRes.data);

      if (logined) {
        const resFreelancer = await freelancerApi.getByAccountId(logined.id);
        setFreelancer(resFreelancer.data);
        for (const item of resFreelancer?.data?.applies || []) {
          if (item.jobPostId == jobRes?.data?.id) {
            setApply(item);
            break;
          }
        }
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Lỗi khi tải dữ liệu",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createApply = async (formatData) => {
    try {
      const res = await applyApi.create(formatData);
      if (res) {
        setApply(res.data);
        messageApi.open({
          type: "success",
          content: "Thêm bài ứng tuyển thành công",
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Lỗi thêm bài ứng tuyển",
      });
      console.log(error);
    }
  };

  const onFinish = (values) => {
    const formatData = {
      jobPostId: jobpost?.id,
      freelancerId: freelancer?.id,
      context: values?.content,
    };

    createApply(formatData);
  };

  const genreateContent = async () => {
    setLoadingCall(true);
    const res = await geminiCall.generateContentApply(jobpost?.id, content);
    form.setFieldsValue({
      content: res,
    });
    setLoadingCall(false);
  };

  return (
    <div className="container">
      {contextHolder}
      <Row gutter={24}>
        {/* Cột trái - Thông tin công việc */}
        <Col span={16} className="border-end">
          <JobDescription jobpost={jobpost} lastDatePost={lastDatePost} skills={skills} />
          <hr />
          <JobActivity jobpost={jobpost} />
        </Col>
  
        {/* Cột phải - Thông tin nhà tuyển dụng và ứng tuyển */}
        <Col span={8}>
          <RecruiterInfo profile={profile} navigate={navigate} />
          <Divider />
          
          {freelancer?.profileId === profile?.id ? (
            <div>
              <p>Đây là bài đăng của bạn, không thể tự nộp hồ sơ.</p>
            </div>
          ) : !logined ? (
            <div>
              <p>
                <Button type="link" className="p-0" onClick={() => navigate("/login")}>
                  Đăng nhập
                </Button>{" "}
                để nộp hồ sơ ứng tuyển.
              </p>
            </div>
          ) : !freelancer ? (
            <div>
              <p>
                <Button type="link" className="p-0" onClick={() => navigate("/profile/freelancer")}>
                  Thêm hồ sơ
                </Button>{" "}
                Freelancer để có thể nộp hồ sơ.
              </p>
            </div>
          ) : (
            <ApplyForm
              form={form}
              onFinish={onFinish}
              loadingCall={loadingCall}
              genreateContent={genreateContent}
              setContent={setContent}
              apply={apply}
            />
          )}
        </Col>
      </Row>
    </div>
  );
  
}

export default PostDetail;