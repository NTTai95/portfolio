import apiClient from './index';

const jobspostApi = {
    getPage: ({ page, size, search }) => apiClient.get('/jobposts', { params: { page, size, search } }),
    getById: (id) => apiClient.get(`/jobposts/${id}`),
    getByAccountId: (accountId) => apiClient.get(`/jobposts/account/${accountId}`),
    add: (jobpost) => apiClient.post('/jobposts', jobpost),
    update: (id, staff) => apiClient.put(`/jobposts/${id}`, staff),
    delete: (id) => apiClient.delete(`/jobposts/${id}`),
    getStatusById: (id) => apiClient.get(`/jobposts/${id}/status`),
    post: (id) => apiClient.post(`/jobposts/${id}/post`),
    getActiveByAccountId: (accountId) => apiClient.get(`/jobposts/account/${accountId}/active`),
    getDraftByAccountId: (accountId) => apiClient.get(`/jobposts/account/${accountId}/draft`),
    getFinishByAccountId: (accountId) => apiClient.get(`/jobposts/account/${accountId}/finish`),
    getPageActive: ({ page, size, search }) => apiClient.get(`/jobposts/status/active`, { params: { page, size, search } }),
    countInCurrentMonth: () => apiClient.get(`/jobposts/count/current-month`),
    countFinishedInCurrentMonth: () => apiClient.get(`/jobposts/count/current-month/finished`),
    countWorkingInCurrentMonth: () => apiClient.get(`/jobposts/count/current-month/working`),
    countPendingInCurrentMonth: () => apiClient.get(`/jobposts/count/current-month/pending`),
};

export default jobspostApi;