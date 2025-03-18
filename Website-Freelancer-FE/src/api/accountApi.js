import { changeConfirmLocale } from 'antd/es/modal/locale';
import apiClient from './index';

const accountApi = {
  getAll: () => apiClient.get('/accounts'), // Lấy danh sách user
  getById: (id) => apiClient.get(`/accounts/${id}`), // Lấy thông tin user theo ID
  create: (accountData) => apiClient.post('/accounts', accountData), // Tạo user mới
  update: (id, accountData) => apiClient.put(`/accounts/${id}`, accountData), // Cập nhật user
  delete: (id) => apiClient.delete(`/accounts/${id}`), // Xóa user
  checkPassword: (id, password) => apiClient.get(`/accounts/${id}/check/password/${password}`),

  changePassword: (id, password) => apiClient.put(`/accounts/changepassword/${id}`, password ),
  changePasswordProfile: (id, password) => apiClient.put(`/accounts/profile/changepassword/${id}`, password ),
};

export default accountApi;
