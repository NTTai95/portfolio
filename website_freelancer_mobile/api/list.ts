import { ResponseList } from '@/types/respones/list';
import { apiGet } from './baseApi';
import { EndPoint } from './endpoint';
import { AxiosResponse } from 'axios';

export const apiListLanguage = async (): Promise<AxiosResponse<ResponseList.Language[]>> => {
    return await apiGet<ResponseList.Language[]>(EndPoint.List.LANGUAGE);
};

export const apiListSkill = async (): Promise<AxiosResponse<ResponseList.Skill[]>> => {
    return await apiGet<ResponseList.Skill[]>(EndPoint.List.SKILL);
};

export const apiListMajor = async (): Promise<AxiosResponse<ResponseList.Major[]>> => {
    return await apiGet<ResponseList.Major[]>(EndPoint.List.MAJOR);
};

export const apiListRole = async (): Promise<AxiosResponse<ResponseList.Role[]>> => {
    return await apiGet<ResponseList.Role[]>(EndPoint.List.ROLE);
};

export const apiListPermission = async (): Promise<AxiosResponse<ResponseList.Permission[]>> => {
    return await apiGet<ResponseList.Permission[]>(EndPoint.List.PERMISSION);
};
