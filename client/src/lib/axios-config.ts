import axios from "axios";

// Create axios instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use((config) => {
    const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

    if (token && config.headers) {
        // Add Bearer token to Authorization header
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Example usage
export async function makeAuthenticatedRequest(endpoint: string) {
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
}

export default api;
