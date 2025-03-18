import apiClient from './index';

const walletApi = {
    getById: (id) => apiClient.get(`/wallets/${id}`),
    getByAccountId: (id) => apiClient.get(`/wallets/account/${id}`),
    create: (wallet) => apiClient.post('/wallets', wallet),
    deposit: (id, amount) => apiClient.post(`/wallets/${id}/deposit`, amount),
    callback: (params) => apiClient.get('/wallets/callback', { params }),

};

export default walletApi;
