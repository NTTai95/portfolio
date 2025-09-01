// api.ts
import axios from "axios";

const languagesAPI = "https://6829defaab2b5004cb350926.mockapi.io/languages"; // thay bằng URL backend của bạn

export const fetchLanguages = () => axios.get(languagesAPI);
export const createLanguage = (data: any) => axios.post(languagesAPI, data);
export const updateLanguage = (id: string, data: any) =>
  axios.put(`${languagesAPI}/${id}`, data);
export const deleteLanguage = (id: string) => axios.delete(`${languagesAPI}/${id}`);
