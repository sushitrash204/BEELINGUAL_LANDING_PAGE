const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const fetchLandingPageContent = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/landing-page/content`);
        if (!response.ok) throw new Error('Failed to fetch content');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching landing page content:', error);
        return null;
    }
};

export const fetchStatistics = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/landing-page/statistics`);
        if (!response.ok) throw new Error('Failed to fetch statistics');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return null;
    }
};

export const fetchThemeSettings = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/landing-page/theme`);
        if (!response.ok) throw new Error('Failed to fetch theme');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching theme settings:', error);
        return null;
    }
};
