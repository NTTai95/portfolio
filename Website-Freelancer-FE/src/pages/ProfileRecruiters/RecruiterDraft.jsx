
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import jobspostApi from "../../api/jobspostApi";

const RecruiterDraft = () => {
  const [jobs, setJobs] = useState(null);
  const logined = JSON.parse(sessionStorage.getItem("logined"));

  useEffect(() => {
    const fetchDraftJobs = async () => {
      try {
        if (!logined?.id) return;
        const data = await jobspostApi.getDraftByAccountId(logined.id);
        setJobs(data.data.content);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bài đăng nháp:", error);
      }
    };

    fetchDraftJobs();
  }, [logined?.id]);

  return (
    <>
      {jobs && jobs?.length > 0 ? (
        jobs?.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <div>Hiện tại không có bài đăng nháp nào!</div>
      )}
    </>
  );
};

export default RecruiterDraft;
