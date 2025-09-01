import { AxiosResponse } from "axios";
import { apiGet } from "./baseApi";
import { EndPoint } from "./endpoint";

export interface FieldValidation {
    field: string;
    rules: {
        type: string;
        value: any;
        message: string;
    }[];
}

export const apiMetaRulesLogin = async (): Promise<AxiosResponse<FieldValidation[]>> => {
    return await apiGet<FieldValidation[]>(EndPoint.Auth.LOGIN_VALIDATION);
};

export const apiMetaRulesRegister = async (): Promise<AxiosResponse<FieldValidation[]>> => {
    return await apiGet<FieldValidation[]>(EndPoint.Auth.REGISTER_VALIDATION);
};

export const apiMetaRulesSkill = async (): Promise<AxiosResponse<FieldValidation[]>> => {
    return await apiGet<FieldValidation[]>(EndPoint.Admin.Skill.VALIDATION);
};

export const apiMetaRulesMajor = async (): Promise<AxiosResponse<FieldValidation[]>> => {
    return await apiGet<FieldValidation[]>(EndPoint.Admin.Major.VALIDATION);
};

export const apiMetaRulesLanguage = async (): Promise<AxiosResponse<FieldValidation[]>> => {
    return await apiGet<FieldValidation[]>(EndPoint.Admin.Language.VALIDATION);
};

export const apiMetaRulesRole = async (): Promise<AxiosResponse<FieldValidation[]>> => {
    return await apiGet<FieldValidation[]>(EndPoint.Admin.Role.VALIDATION);
};

export const apiMetaRulesStaff = async (): Promise<AxiosResponse<FieldValidation[]>> => {
    return await apiGet<FieldValidation[]>(EndPoint.Admin.Staff.VALIDATION);
};

export const apiUnique = async (endpoint: string, value: string): Promise<AxiosResponse<boolean>> => {
    return await apiGet<boolean>(endpoint, { params: { value } });
}

