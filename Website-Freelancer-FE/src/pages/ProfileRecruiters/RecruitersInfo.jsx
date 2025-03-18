import { Form } from "antd";
import { useEffect, useState } from "react";
import recruiterApi from "@api/recruiterApi";
import RecruiterView from "./RecruiterView";
import RecruiterForm from "./RecruiterForm";
import { Spin } from "antd";

function RecruiterInfo() {
  const [recruiter, setRecruiter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    introduce: "",
  });

  const fetchRecruiterData = async () => {
    setIsLoading(true);
    try {
      const logined = JSON.parse(sessionStorage.getItem("logined"));
      if (!logined) return;

      const resRecruiter = await recruiterApi.getByAccountId(logined.id);
      setRecruiter(resRecruiter.data);

      setInitialValues({
        id: resRecruiter.data.id,
        name: resRecruiter.data.name,
        introduce: resRecruiter.data.introduce,
      });
    } catch (error) {
      console.error("Error fetching recruiter data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiterData();
  }, [isEditing]);

  const onFinish = async (values) => {
    const recruiterDTO = {
      id: recruiter.id,
      name: values.name,
      introduce: values.introduce,
    };

    try {
      const res = await recruiterApi.update(recruiter.id, recruiterDTO);
      if (res.status === 200) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating recruiter:", error);
    }
  };

  const onCancel = () => {
    setIsEditing(false);
  };

  return (
    <Spin spinning={isLoading}>
      {isEditing ? (
        <RecruiterForm initialValues={initialValues} onFinish={onFinish} onCancel={onCancel} />
      ) : (
        <RecruiterView recruiter={recruiter} setIsEditing={setIsEditing} />
      )}
    </Spin>
  );
}

export default RecruiterInfo;