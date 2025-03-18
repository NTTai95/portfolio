import apiClient from './index';

const productApi = {
    getAll: () => apiClient.get('/products'),
    getById: (id) => apiClient.get(`/products/${id}`),
    getByRecruiterId: (recruiterId) => apiClient.get(`/products/recruiter/${recruiterId}`),
    create: (data) => apiClient.post('/products', data),
    update: (id, data) => apiClient.put(`/products/${id}`, data),
    delete: (id) => apiClient.delete(`/products/${id}`),
};

export default productApi;