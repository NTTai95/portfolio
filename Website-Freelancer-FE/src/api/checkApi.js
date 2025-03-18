import apiClient from './index';

const checkApi = {
    checkEmailExists: (email) =>
        apiClient.get(`/check/exists/email/${email}`),
    checkPhoneExists: (phone) => apiClient.get(`/check/exists/phone/${phone}`),
    checkISOExists: (iso) => apiClient.get(`/check/exists/iso/${iso}`),
};


export default checkApi;