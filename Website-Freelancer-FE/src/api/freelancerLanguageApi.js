import apiClient from './index';

const freelancerLanguageApi = {
    getAll: () => apiClient.get('/freelancerlanguage'),
    getById: (id) => apiClient.get(`/freelancerlanguage/${id}`),
    getByIds: (ids) => apiClient.get(`/freelancerlanguage/list`, { params: { ids: ids.join(',') } }),
    update: (id, freelancerLanguage) => apiClient.put(`/freelancerlanguage/${id}`, freelancerLanguage),
    delete: (id) => apiClient.delete(`/freelancerlanguage/${id}`),
};

export default freelancerLanguageApi;
