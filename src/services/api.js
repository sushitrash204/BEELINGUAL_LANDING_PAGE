import axios from 'axios';

// Logic: Tự động thêm /api nếu biến môi trường thiếu, đảm bảo URL luôn đúng
const baseURL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api')
    .replace(/\/$/, '') + (import.meta.env.VITE_API_URL?.includes('/api') ? '' : '/api');

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // Để gửi kèm cookie nếu cần
});

export const fetchLandingPageContent = async () => {
    try {
        const response = await api.get('/landing-page/content');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching landing page content:', error);
        return null;
    }
};

export const fetchStatistics = async () => {
    try {
        const response = await api.get('/landing-page/statistics');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return null;
    }
};

export const fetchThemeSettings = async () => {
    try {
        const response = await api.get('/landing-page/theme');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching theme settings:', error);
        return null;
    }
};

export default api;
