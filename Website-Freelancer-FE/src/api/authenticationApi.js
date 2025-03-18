import apiClient from './index';

const loginApi = {
    login: (email, password) =>
        apiClient.post('/login', { email, password }),
    register: (values) => apiClient.post('/register', values),
};


export default loginApi;