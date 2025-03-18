import apiClient from './index';

const userApi = {
  getAll: () => apiClient.get('/users'), // Lấy danh sách user
  getById: (id) => apiClient.get(`/users/${id}`), // Lấy thông tin user theo ID
  create: (userData) => apiClient.post('/users', userData), // Tạo user mới
  update: (id, userData) => apiClient.put(`/users/${id}`, userData), // Cập nhật user
  delete: (id) => apiClient.delete(`/users/${id}`), // Xóa user
};

export default userApi;
