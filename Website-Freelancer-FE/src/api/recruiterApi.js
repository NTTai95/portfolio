import apiClient from './index';

const RecruiterApi = {
    add: (recruiter) => apiClient.post('/recruiters', recruiter),
    getById: (id) => apiClient.get(`/recruiters/${id}`),
    getByAccountId: (accountId) => apiClient.get(`/recruiters/account/${accountId}`),
    update: (id, recruiter) => apiClient.put(`/recruiters/${id}`, recruiter),
    getTop10: () => apiClient.get('/recruiters/top10'),
};

export default RecruiterApi;
