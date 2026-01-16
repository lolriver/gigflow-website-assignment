import axios from 'axios';

// Helper to ensure base URL always ends with /api
const getBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_URL;
    if (!envUrl) return '/api'; // Local proxy
    return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
};

const api = axios.create({
    baseURL: getBaseUrl(),
    withCredentials: true,
});

export default api;
