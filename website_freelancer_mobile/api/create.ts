// apis/createApis.ts

import { RequestForm } from "@/types/requests/form";
import { AxiosResponse } from "axios";
import { apiGet, apiPost } from "./baseApi";
import { EndPoint } from "./endpoint";

// Trả về void vì backend dùng ResponseEntity.noContent()

export const apiCreateMajor = async (data: RequestForm.Major) => {
  return await apiPost<void>(EndPoint.Admin.Major.BASE, data);
};

export const apiCreateSkill = async (
  data: RequestForm.Skill
): Promise<AxiosResponse<void>> => {
  return await apiPost<void>(EndPoint.Admin.Skill.BASE, data);
};

export const apiCreateLanguage = async (
  data: RequestForm.Language
): Promise<AxiosResponse<void>> => {
  return await apiPost<void>(EndPoint.Admin.Language.BASE, data);
};

export const apiCreateRole = async (
  data: RequestForm.Role
): Promise<AxiosResponse<void>> => {
  return await apiPost<void>(EndPoint.Admin.Role.BASE, data);
};

export const apiCreateJob = async (
  data: RequestForm.JobStep1
): Promise<AxiosResponse<number>> => {
  return await apiPost<number>(EndPoint.Job.BASE, data);
};

export const apiCreateStaff = async (
  data: RequestForm.Staff
): Promise<AxiosResponse<void>> => {
  return await apiPost<void>(EndPoint.Admin.Staff.BASE, {
    ...data,
    birthday: new Date(data.birthday).toLocaleDateString("en-GB"),
  });
};


export const apiGetRecruitingJobs = async (): Promise<AxiosResponse<{
  jobs: Array<{
    id: number;
    title: string;
    description: string;
    budget: number;
    durationHours: number;
    postedAt: string;
    closedAt: string;
    step: string;
    major: { id: number; name: string };
    skills: string[];
    languages: string[];
    totalApplies: number;
    pendingApplies: number;
  }>;
  totalJobs: number;
}>> => {
  return await apiGet(EndPoint.Employer.RECRUITING_JOBS);
};

export const apiInviteFreelancer = async (
  freelancerId: number,
  data: { jobId: number; message?: string }
): Promise<AxiosResponse<{
  message: string;
  freelancer: { id: number; fullName: string; email: string };
  job: { id: number; title: string; budget: number; durationHours: number };
  employer: { id: number; fullName: string };
  timestamp: string;
}>> => {
  return await apiPost(
    EndPoint.Employer.INVITE_FREELANCER.replace('{freelancerId}', freelancerId.toString()),
    data
  );
};