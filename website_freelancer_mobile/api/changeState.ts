import { AxiosResponse } from "axios";
import { apiPatch } from "./baseApi";
import { EndPoint } from "./endpoint";

export const apiActiveSkill = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Skill.ACTIVE.replace('{id}', id.toString()));
}

export const apiActiveMajor = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Major.ACTIVE.replace('{id}', id.toString()));
}

export const apiActiveLanguage = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Language.ACTIVE.replace('{id}', id.toString()));
}

export const apiActiveStaff = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Staff.ACTIVE.replace('{id}', id.toString()));
}

export const apiPostPublicJob = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Job.POST_PUBLIC.replace('{id}', id.toString()));
}

export const apiPostPrivateJob = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Job.POST_PRIVATE.replace('{id}', id.toString()));
}

export const apiInvalidSkill = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Skill.INVALID.replace('{id}', id.toString()));
};

export const apiInvalidMajor = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Major.INVALID.replace('{id}', id.toString()));
};

export const apiInvalidLanguage = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Language.INVALID.replace('{id}', id.toString()));
};

export const apiInvalidStaff = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiPatch<void>(EndPoint.Admin.Staff.INVALID.replace('{id}', id.toString()));
};
