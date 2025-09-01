import { ResponseDetail } from "@/types/respones/detail";
import { AxiosResponse } from "axios";
import { apiGet, apiPatch } from "./baseApi";
import { EndPoint } from "./endpoint";

export const apiJobDetail = async (id: number): Promise<AxiosResponse<ResponseDetail.Job>> => {
  return await apiGet<ResponseDetail.Job>(EndPoint.Job.PUBLIC.replace('{id}', id.toString()));
};

export const apiJobApplies = async (jobId: number): Promise<ResponseDetail.JobApplies> => {
  const response = await apiGet<ResponseDetail.JobApplies>(`/jobs/${jobId}/applies`);
  return response.data;
};

export const apiSelectFreelancer = async (jobId: number, applyId: number): Promise<ResponseDetail.SelectFreelancerResponse> => {
  const response = await apiPatch<ResponseDetail.SelectFreelancerResponse>(`/jobs/${jobId}/select-freelancer/${applyId}`);
  return response.data;
};

export const apiRejectApply = async (jobId: number, applyId: number): Promise<void> => {
  await apiPatch(`/jobs/${jobId}/reject-apply/${applyId}`);
};

export const apiMilestoneDetail = async (jobId: number, milestoneId: number): Promise<ResponseDetail.MilestoneDetailResponse> => {
  const response = await apiGet<ResponseDetail.MilestoneDetailResponse>(`/jobs/${jobId}/milestones/${milestoneId}`);
  return response.data;
};

export const apiJobMilestones = async (jobId: number): Promise<ResponseDetail.MilestoneListResponse> => {
  const response = await apiGet<ResponseDetail.MilestoneListResponse>(`/jobs/${jobId}/milestones`);
  return response.data;
};

export const apiSearchFreelancers = async (params: {
  keyword?: string;
  skillIds?: number[];
  languageIds?: number[];
  minReputation?: number;
  maxReputation?: number;
  isMale?: boolean;
  status?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: string;
}): Promise<ResponseDetail.FreelancerSearchResponse> => {
  const response = await apiGet<ResponseDetail.FreelancerSearchResponse>(EndPoint.Freelancer.SEARCH, { params });
  return response.data;
};