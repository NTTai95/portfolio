import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:8080", //'http://localhost:8080', // URL cơ bản của backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(`Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`Error ${error.response.status}: ${error.response.data.message}`);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
