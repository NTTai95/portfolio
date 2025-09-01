import { store } from "@/store";
import { RequestForm } from "@/types/requests/form";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { apiPut } from "./baseApi";
import { EndPoint } from "./endpoint";

export const apiUpdateSkill = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.Skill;
}): Promise<AxiosResponse<void>> => {
  return await apiPut<void>(
    EndPoint.Admin.Skill.ID.replace("{id}", id.toString()),
    data
  );
};

export const apiUpdateMajor = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.Major;
}): Promise<AxiosResponse<void>> => {
  return await apiPut<void>(
    EndPoint.Admin.Major.ID.replace("{id}", id.toString()),
    data
  );
};

export const apiUpdateLanguage = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.Language;
}): Promise<AxiosResponse<void>> => {
  return await apiPut<void>(
    EndPoint.Admin.Language.ID.replace("{id}", id.toString()),
    data
  );
};

export const apiUpdateRole = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.Role;
}): Promise<AxiosResponse<void>> => {
  return await apiPut<void>(
    EndPoint.Admin.Role.ID.replace("{id}", id.toString()),
    data
  );
};

export const apiUpdateJobStep1 = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.JobStep1;
}): Promise<AxiosResponse<void>> => {
  return await apiPut<void>(
    EndPoint.Job.Step1.ID.replace("{id}", id.toString()),
    data
  );
};

export const apiUpdateJobStep2 = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.JobStep2;
}): Promise<AxiosResponse<void>> => {
  return await apiPut<void>(
    EndPoint.Job.Step2.ID.replace("{id}", id.toString()),
    data
  );
};

export const apiUpdateJobStep3 = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.JobStep3;
}): Promise<AxiosResponse<void>> => {
  return await apiPut<void>(
    EndPoint.Job.Step3.ID.replace("{id}", id.toString()),
    { ...data, closedAt: dayjs(data.closedAt).format("DD/MM/YYYY HH:mm:ss") }
  );
};

export const apiUpdateJobStep4 = async ({
  id,
  data,
}: {
  id: number;
  data: FormData;
}): Promise<{ success: boolean; message?: string }> => {
  const token = store.getState().persistent.auth.accessToken;

  try {
    const response = await fetch(
      `https://api.bugfreezonefreelancer.id.vn/${EndPoint.Job.Step4.ID.replace("{id}", id.toString())}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => null);
      const errorMessage = errorResponse?.message || `HTTP error! status: ${response.status}`;
      return { success: false, message: errorMessage };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error updating job step 4:', error);
    return { success: false, message: error.message || 'Có lỗi xảy ra khi kết nối đến máy chủ' };
  }
};

export const apiUpdateStaff = async ({
  id,
  data,
}: {
  id: number;
  data: RequestForm.Staff;
}): Promise<AxiosResponse<void>> => {
  return await apiPut<void>(
    EndPoint.Admin.Staff.ID.replace("{id}", id.toString()),
    { ...data, birthday: new Date(data.birthday).toLocaleDateString("en-GB") }
  );
};
