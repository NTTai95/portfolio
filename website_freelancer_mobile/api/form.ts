import { RequestForm } from "@/types/requests/form";
import { AxiosResponse } from "axios";
import { apiGet } from "./baseApi";
import { EndPoint } from "./endpoint";

export const apiSkillForm = async (id: number): Promise<AxiosResponse<RequestForm.Skill>> => {
    return await apiGet<RequestForm.Skill>(EndPoint.Admin.Skill.FORM.replace('{id}', id.toString()));
};

export const apiMajorForm = async (id: number): Promise<AxiosResponse<RequestForm.Major>> => {
    return await apiGet<RequestForm.Major>(EndPoint.Admin.Major.FORM.replace('{id}', id.toString()));
};

export const apiLanguageForm = async (id: number): Promise<AxiosResponse<RequestForm.Language>> => {
    return await apiGet<RequestForm.Language>(EndPoint.Admin.Language.FORM.replace('{id}', id.toString()));
};

export const apiRoleForm = async (id: number): Promise<AxiosResponse<RequestForm.Role>> => {
    return await apiGet<RequestForm.Role>(EndPoint.Admin.Role.FORM.replace('{id}', id.toString()));
};

export const apiStaffForm = async (id: number): Promise<AxiosResponse<RequestForm.Staff>> => {
    return await apiGet<RequestForm.Staff>(EndPoint.Admin.Staff.FORM.replace('{id}', id.toString()));
};
