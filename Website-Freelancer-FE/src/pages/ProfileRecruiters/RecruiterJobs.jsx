import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import jobspostApi from "../../api/jobspostApi";
import recruiterApi from "../../api/recruiterApi";
const RecruiterJobs = () => {
  const [jobs, setJobs] = useState(null);
  const logined = JSON.parse(sessionStorage.getItem("logined"));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (!logined?.id) return;
        const data = await jobspostApi.getActiveByAccountId(logined.id);
        setJobs(data.data.content);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu công việc:", error);
      }
    };

    fetchJobs();
  }, [logined?.id]);

  return (
    <>
      {jobs && jobs?.length > 0 ? (
        // jobs?.map((apply) => <JobCard apply={apply} />)
        jobs?.map((job) => <JobCard key={job?.id} job={job} />)
      ) : (
        <div>Hiện tại không có công việc nào!</div>
      )}
    </>
  );
};

export default RecruiterJobs;
