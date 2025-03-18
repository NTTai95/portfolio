import { Form } from "antd";
import { useEffect, useState } from "react";
import skillApi from "@api/skillApi";
import languageApi from "@api/languageApi";
import freelancerApi from "@api/freelancerApi";
import FreelancerView from "./FreelancerView";
import FreelancerForm from "./FreelancerForm";
import { Spin } from "antd";

function FreelancerInfo() {
  const [freelancer, setFreelancer] = useState(null);
  const [skills, setSkills] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState({
    introduce: "",
    skills: [],
    languages: [],
  });

  const formatDataForForm = (freelancerData, skillsData, languagesData) => {
    return {
      id: freelancerData.id,
      introduce: freelancerData.introduce,
      skills: skillsData.map((skill) => ({
        value: skill.id,
        label: skill.name,
      })),
      languages: languagesData.map((language) => ({
        value: language.id,
        label: language.name,
      })),
    };
  };

  const fetchFreelancerData = async () => {
    setIsLoading(true);
    try {
      const logined = JSON.parse(sessionStorage.getItem("logined"));
      if (!logined) return;

      const resFreelancer = await freelancerApi.getByAccountId(logined.id);
      setFreelancer(resFreelancer.data);
      console.log(resFreelancer.data);

      const resSkills = await skillApi.getByIds(resFreelancer.data.skillIds);
      setSkills(resSkills.data);

      const resLanguage = await languageApi.getByIds(
        resFreelancer.data.freelancerLanguages.map((fl) => fl.languageId)
      );
      setLanguages(resLanguage.data);

      const formattedData = formatDataForForm(
        resFreelancer.data,
        resSkills.data,
        resLanguage.data
      );
      setInitialValues(formattedData);
    } catch (error) {
      console.error("Error fetching freelancer data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFreelancerData();
  }, [isEditing]);

  const onSearchSkill = async (value) => {
    const res = await skillApi.searchByName(value);
    return res.data.map((skill) => ({
      value: skill.id,
      label: skill.name,
    }));
  };

  const onSearchLanguage = async (value) => {
    const res = await languageApi.searchByName(value);
    return res.data.map((language) => ({
      value: language.id,
      label: language.name,
    }));
  };

  const onFinish = async (values) => {
    const freelancerLanguages = values.languages.map((language) => ({
      freelancerId: freelancer.id,
      languageId: language.value,
      level: 1,
    }));

    const freelancerDTO = {
      id: freelancer.id,
      introduce: values.introduce,
      skillIds: values.skills.map((skill) => skill.value),
      freelancerLanguages,
    };

    try {
      const res = await freelancerApi.update(freelancer.id, freelancerDTO);
      if (res.status === 200) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating freelancer:", error);
    }
  };

  const onCancel = () => {
    setIsEditing(false);
  };

  return (
    <Spin spinning={isLoading}>
      {isEditing ? (
        <FreelancerForm
          initialValues={initialValues}
          onFinish={onFinish}
          onSearchSkill={onSearchSkill}
          onSearchLanguage={onSearchLanguage}
          onCancel={onCancel}
        />
      ) : (
        <FreelancerView
          freelancer={freelancer}
          skills={skills}
          languages={languages}
          setIsEditing={setIsEditing}
        />
      )}
    </Spin>
  );
}
export default FreelancerInfo;
