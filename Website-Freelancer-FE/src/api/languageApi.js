import apiClient from './index';

const languageApi = {
  getAll: ({ page, size, name, iso }) => apiClient.get('/languages', { params: { page, size, search: `name,${name || ""},iso,${iso || ""}` } }),
  getById: (id) => apiClient.get(`/languages/${id}`),
  getByIds: (ids) => apiClient.get(`/languages/list`, { params: { ids: ids.join(',') } }),
  add: (language) => apiClient.post('/languages', language),
  update: (id, language) => apiClient.put(`/languages/${id}`, language),
  delete: (id) => apiClient.delete(`/languages/${id}`),
  searchByName: (name) => apiClient.get(`/languages/search/name/${name}`),
};

export default languageApi;