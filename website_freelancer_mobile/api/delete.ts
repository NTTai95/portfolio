import { apiDelete } from './baseApi';
import { EndPoint } from './endpoint';
import { AxiosResponse } from 'axios';

export const apiDeleteSkill = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiDelete<void>(EndPoint.Admin.Skill.ID.replace('{id}', id.toString()));
}

export const apiDeleteMajor = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiDelete<void>(EndPoint.Admin.Major.ID.replace('{id}', id.toString()));
}

export const apiDeleteLanguage = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiDelete<void>(EndPoint.Admin.Language.ID.replace('{id}', id.toString()));
}

export const apiDeleteRole = async (id: number): Promise<AxiosResponse<void>> => {
    return await apiDelete<void>(EndPoint.Admin.Role.ID.replace('{id}', id.toString()));
}