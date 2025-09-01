// api.ts
import axios from "axios";

const industriesAPI = "https://6829defaab2b5004cb350926.mockapi.io/industries"; // thay bằng URL backend của bạn

export const fetchIndustrie = () => axios.get(industriesAPI);
export const createIndustrie = (data: any) => axios.post(industriesAPI, data);
export const updateIndustrie = (id: string, data: any) =>
  axios.put(`${industriesAPI}/${id}`, data);
export const deleteIndustrie = (id: string) => axios.delete(`${industriesAPI}/${id}`);
