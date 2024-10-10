import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor to include API Key
api.interceptors.request.use((config) => {
    const apiKey = localStorage.getItem('api_key');
    if (apiKey) {
        config.headers['api_key'] = apiKey;
    }
    return config;
});

export default api;
