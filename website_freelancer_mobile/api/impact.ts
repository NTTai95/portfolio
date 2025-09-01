import { ResponseImpact } from "@/types/respones/impact";
import { apiGet } from "./baseApi";
import { EndPoint } from "./endpoint";
import { AxiosResponse } from "axios";

export const apiImpactSkill = (id: number): Promise<AxiosResponse<ResponseImpact.Skill>> => {
    return apiGet<ResponseImpact.Skill>(EndPoint.Admin.Skill.IMPACT.replace("{id}", id.toString()));
};

export const apiImpactMajor = (id: number): Promise<AxiosResponse<ResponseImpact.Major>> => {
    return apiGet<ResponseImpact.Major>(EndPoint.Admin.Major.IMPACT.replace("{id}", id.toString()));
};

export const apiImpactLanguage = (id: number): Promise<AxiosResponse<ResponseImpact.Language>> => {
    return apiGet<ResponseImpact.Language>(EndPoint.Admin.Language.IMPACT.replace("{id}", id.toString()));
};