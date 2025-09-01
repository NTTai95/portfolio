// api.ts
import axios from "axios";

const skillsAPI = "https://6829defaab2b5004cb350926.mockapi.io/skills"; // thay bằng URL backend của bạn

export const fetchSkill = () => axios.get(skillsAPI);
export const createSkill = (data: any) => axios.post(skillsAPI, data);
export const updateSkill = (id: string, data: any) =>
  axios.put(`${skillsAPI}/${id}`, data);
export const deleteSkill = (id: string) => axios.delete(`${skillsAPI}/${id}`);
