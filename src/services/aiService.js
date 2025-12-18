import api from './api';

export const fetchChatbotConfig = async () => {
    try {
        const response = await api.get('/ai/config');
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy cấu hình chatbot:', error);
        throw error;
    }
};

export const sendMessageToChatbot = async (message) => {
    try {
        const response = await api.post('/ai/chat', { message });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gửi tin nhắn chatbot:', error);
        throw error;
    }
};
