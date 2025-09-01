import { ResponseRecord } from "@/types/respones/record";
import { RequestPage } from "@/types/requests/page";
import { apiGet } from "./baseApi";
import { EndPoint } from "./endpoint";
import { AxiosResponse } from "axios";

interface ResponsePage<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export const apiPageSkill = async (
  params?: RequestPage.Skill
): Promise<AxiosResponse<ResponsePage<ResponseRecord.Skill>>> => {
  return await apiGet<ResponsePage<ResponseRecord.Skill>>(
    EndPoint.Admin.Skill.BASE,
    {
      params: { ...params },
    }
  );
};

export const apiPageMajor = async (
  params?: RequestPage.Major
): Promise<AxiosResponse<ResponsePage<ResponseRecord.Major>>> => {
  return await apiGet<ResponsePage<ResponseRecord.Major>>(
    EndPoint.Admin.Major.BASE,
    {
      params: { ...params },
    }
  );
};

export const apiPageLanguage = async (
  params?: RequestPage.Language
): Promise<AxiosResponse<ResponsePage<ResponseRecord.Language>>> => {
  return await apiGet<ResponsePage<ResponseRecord.Language>>(
    EndPoint.Admin.Language.BASE,
    {
      params: { ...params },
    }
  );
};

export const apiPageRole = async (
  params?: RequestPage.Role
): Promise<AxiosResponse<ResponsePage<ResponseRecord.Role>>> => {
  return await apiGet<ResponsePage<ResponseRecord.Role>>(
    EndPoint.Admin.Role.BASE,
    {
      params: { ...params },
    }
  );
};

export const apiPageJob = async (
  params?: RequestPage.Job
): Promise<AxiosResponse<ResponsePage<ResponseRecord.Job>>> => {
  return await apiGet<ResponsePage<ResponseRecord.Job>>(EndPoint.Job.BASE, {
    params: { ...params },
  });
};

export const apiPageClient = async (params?: RequestPage.Client): Promise<AxiosResponse<ResponsePage<ResponseRecord.Client>>> => {
  return await apiGet<ResponsePage<ResponseRecord.Client>>(EndPoint.Admin.Client.BASE, {
    params: { ...params },
  });
};

export const apiPageStaff = async (params?: RequestPage.Client): Promise<AxiosResponse<ResponsePage<ResponseRecord.Staff>>> => {
  return await apiGet<ResponsePage<ResponseRecord.Staff>>(EndPoint.Admin.Staff.BASE, {
    params: { ...params },
  });
};

export const apiMePageJobsInProgress = async (param?: RequestPage.MeJobsInProgress): Promise<AxiosResponse<ResponsePage<ResponseRecord.MeJobsInProgress>>> => {
  return await apiGet<ResponsePage<ResponseRecord.MeJobsInProgress>>(EndPoint.Me.JOBS_IN_PROGRESS, {
    params: { ...param },
  });
};
