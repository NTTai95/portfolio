
import apiClient from './index';

const freelancerApi = {
  getAll: () => apiClient.get('/freelancers'),
  getById: (id) => apiClient.get(`/freelancers/${id}`),
  update: (id, freelancerDTO) => apiClient.put(`/freelancers/${id}`, freelancerDTO),
  create: (freelancerDTO) => apiClient.post('/freelancers', freelancerDTO),
  delete: (id) => apiClient.delete(`/freelancers/${id}`),
  search: (search) => apiClient.get('/freelancers/search', { params: { search } }),
  getByAccountId: (accountId) => apiClient.get(`/freelancers/account/${accountId}`),
  getTop10: () => apiClient.get('/freelancers/top10'),
};

export default freelancerApi;
