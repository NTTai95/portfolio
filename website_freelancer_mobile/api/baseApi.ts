// src/api/baseApi.ts (Mobile React Native)
import { store } from '@/store';
import { clearAll, setToken } from '@/store/persistent/auth';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';

// Lấy URL từ env hoặc hard-code
const baseURL = 'https://api.bugfreezonefreelancer.id.vn';

const LOG_ERRORS = true;
const LOG_REQUESTS = false;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 30000,
});

// ===== Interceptor request =====
axiosInstance.interceptors.request.use(
  (config) => {
    if (LOG_REQUESTS) {
      console.log(`[Axios Request] ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
        headers: config.headers,
      });
    }
    return config;
  },
  (error) => {
    if (LOG_ERRORS) console.error('[Axios Request Error]', error);
    return Promise.reject(error);
  }
);

// ===== Interceptor response =====
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Nếu lỗi 401 và chưa retry thì refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log('🔄 Refresh token...');
        const refreshToken = store.getState().persistent.auth.refreshToken;

        const res = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = res.data;

        // Cập nhật Redux
        store.dispatch(setToken({ accessToken, refreshToken: newRefreshToken }));

        // Retry request cũ với token mới
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('❌ Refresh token failed:', refreshError);
        store.dispatch(clearAll());
        // Trên mobile, có thể navigate về login
        // navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      }
    }

    // Trả lỗi khác
    return Promise.reject({
      status: error.response?.status ?? null,
      data: error.response?.data,
      message: error.message,
      raw: error,
    });
  }
);

// ===== Generate request config =====
const isFormData = (data: any) => {
  if (!data) return false;
  try {
    if (typeof FormData !== 'undefined' && data instanceof FormData) return true;
  } catch (e) {
    // some envs throw on instanceof check
  }
  // React Native FormData thường có _parts
  if (typeof data === 'object' && Array.isArray(data._parts)) return true;
  return false;
};

const generateRequestConfig = (config?: AxiosRequestConfig, data?: any): AxiosRequestConfig => {
  const accessToken = store.getState().persistent.auth.accessToken;
  const form = isFormData(data);

  const headers: Record<string, any> = {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  if (!form) {
    headers['Content-Type'] = 'application/json';
  }
  // nếu là form, để axios/adapter tự set Content-Type + boundary
  return { ...config, headers };
};

// ===== Params serializer =====
const defaultParamsSerializer = (params: any) =>
  qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true });

// ===== API methods =====
export const apiGet = <T>(url: string, config?: AxiosRequestConfig) =>
  axiosInstance.get<T>(url, {
    ...generateRequestConfig(config),
    params: config?.params,
    paramsSerializer: { serialize: defaultParamsSerializer },
  });

export const apiPost = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
  axiosInstance.post<T>(url, data, generateRequestConfig(config, data));

export const apiPut = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
  axiosInstance.put<T>(url, data, generateRequestConfig(config, data));

export const apiPatch = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
  axiosInstance.patch<T>(url, data, generateRequestConfig(config, data));

export const apiDelete = <T>(url: string, config?: AxiosRequestConfig) =>
  axiosInstance.delete<T>(url, generateRequestConfig(config));
