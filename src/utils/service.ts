import axios from 'axios';

// Create a custom instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        // ADD THIS LINE: Explicitly define supported accept types
        'Accept': 'image/png, application/json'
    },
    timeout: 60000,
});

// REQUEST Interceptor: Attach Token
api.interceptors.request.use(
    (config) => {
        const token = import.meta.env.VITE_API_KEY;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// RESPONSE Interceptor: Global Error Handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check if the error is from the AI model being "cold"
        if (error.response?.status === 503) {
            console.warn("Model is loading, retrying might be needed...");
        }

        // Transform complex Axios errors into readable strings
        const message = error.response?.data?.error || error.message || "An unexpected error occurred";
        return Promise.reject(message);
    }
);

export default api;