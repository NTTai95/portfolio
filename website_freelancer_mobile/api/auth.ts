import { apiPost, apiGet } from "@/api/baseApi";
import { EndPoint } from "@/api/endpoint";
import { RequestForm } from "@/types/requests/form";
import { ResponseDetail } from "@/types/respones/detail";
import { AxiosResponse } from "axios";

export const apiLogin = async (data: RequestForm.Login): Promise<AxiosResponse<string>> => {
    return await apiPost<string>(EndPoint.Auth.LOGIN, data);
};

export const apiRegister = async (data: RequestForm.Register, role: "FREELANCER" | "NHA_TUYEN_DUNG"): Promise<AxiosResponse<string>> => {
    return await apiPost<string>(EndPoint.Auth.REGISTER.replace("{role}", role), { ...data, birthday: new Date(data.birthday).toLocaleDateString('en-GB') });
};
export const apiMeAdmin = async (): Promise<AxiosResponse<ResponseDetail.MeAdmin>> => {
    return await apiGet<ResponseDetail.MeAdmin>(EndPoint.Admin.ME);
};

export const apiMeClient = async (): Promise<AxiosResponse<ResponseDetail.MeClient>> => {
    return await apiGet<ResponseDetail.MeClient>(EndPoint.Me.BASE);
};

export const apiMeFreelancerProfile = async (): Promise<AxiosResponse<ResponseDetail.Freelancer>> => {
    return await apiGet<ResponseDetail.Freelancer>(EndPoint.Me.FULL_INFO);
};

export const apiMeEmployerProfile = async (): Promise<AxiosResponse<ResponseDetail.EmployerProfile>> => {
    return await apiGet<ResponseDetail.EmployerProfile>(EndPoint.Me.FULL_INFO);
};