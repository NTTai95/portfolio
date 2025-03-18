
import apiClient from './index';

const forgetPasswordApi = {
    create: (email) => apiClient.get(`/forgetpassword/create/${email}`),
    changePassword: (token, password) => apiClient.post(`/forgetpassword`, { password: password, token: token }),
    getDateCreatedByToken: (token) => apiClient.get(`/forgetpassword/datecreated/${token}`),
};

export default forgetPasswordApi;
