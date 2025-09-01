import { AxiosResponse } from "axios";
import { apiGet } from "./baseApi";
import { EndPoint } from "./endpoint";

export type FilterMap = Record<
  string,
  {
    value: string;
    label?: string;
    count: number;
  }[]
>;

export const apiFilterSkill = async (): Promise<AxiosResponse<FilterMap>> => {
  return await apiGet<FilterMap>(EndPoint.Admin.Skill.FILTER);
};

export const apiFilterMajor = async (): Promise<AxiosResponse<FilterMap>> => {
  return await apiGet<FilterMap>(EndPoint.Admin.Major.FILTER);
};

export const apiFilterLanguage = async (): Promise<
  AxiosResponse<FilterMap>
> => {
  return await apiGet<FilterMap>(EndPoint.Admin.Language.FILTER);
};

export const apiFilterRole = async (): Promise<AxiosResponse<FilterMap>> => {
  return await apiGet<FilterMap>(EndPoint.Admin.Role.FILTER);
};

export const apiFilterJob = async (): Promise<AxiosResponse<FilterMap>> => {
  return await apiGet<FilterMap>(EndPoint.Job.FILTER);
};

export const apiFilterClient = async (): Promise<AxiosResponse<FilterMap>> => {
    return await apiGet<FilterMap>(EndPoint.Admin.Client.FILTER);
};

export const apiFilterStaff = async (): Promise<AxiosResponse<FilterMap>> => {
    return await apiGet<FilterMap>(EndPoint.Admin.Staff.FILTER);
};
