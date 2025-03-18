import apiClient from './index';

const permissionApi = {
  getAll: () => apiClient.get('/permissions/all'),
};

export default permissionApi;