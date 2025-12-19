import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchChatbotConfig, sendMessageToChatbot } from '../services/aiService';
import BeeBotIcon from '../assets/BeeBot.jpg';
import './Chatbot.scss';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [config, setConfig] = useState({
        botName: '',
        suggestedQuestions: []
    });
    const [chatHistory, setChatHistory] = useState([
        { role: 'bot', text: 'Đang khởi tạo chatbot...' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const loadConfig = async () => {
        try {
            const data = await fetchChatbotConfig();
            if (data.success && data.data) {
                setConfig(data.data);
                if (data.data.welcomeMessage) {
                    setChatHistory([{ role: 'bot', text: data.data.welcomeMessage }]);
                }
            }
        } catch (error) {
            console.error("Lỗi lấy cấu hình chatbot:", error);
        }
    };

    useEffect(() => {
        loadConfig();
    }, []);

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [chatHistory, isOpen]);

    const handleSend = async (e, customMsg = null) => {
        if (e && e.preventDefault) e.preventDefault();
        const userMsg = customMsg || message.trim();
        if (!userMsg || isLoading) return;

        const newHistory = [...chatHistory, { role: 'user', text: userMsg }];
        setChatHistory(newHistory);
        setMessage('');
        setIsLoading(true);

        try {
            const data = await sendMessageToChatbot(userMsg);
            if (data.success) {
                setChatHistory([...newHistory, { role: 'bot', text: data.reply }]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            const errorMsg = error.response?.data?.message || config.errorMessage || `${config.botName} đang bận một chút, bạn quay lại sau nhé!`;
            setChatHistory([...newHistory, { role: 'bot', text: errorMsg }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            {/* Floating Button */}
            <motion.button
                className="chatbot-fab"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <img src={BeeBotIcon} alt={config.botName} />
                {!isOpen && <div className="chatbot-badge">1</div>}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot-window"
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                    >
                        <div className="chatbot-header">
                            <div className="bot-info">
                                <img src={BeeBotIcon} alt={config.botName} />
                                <div>
                                    <h6>{config.botName}</h6>
                                    <span>Trực tuyến</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="close-btn">
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>

                        <div className="chatbot-messages">
                            {chatHistory.map((msg, idx) => (
                                <div key={idx} className={`message ${msg.role}`}>
                                    <div className="message-content">
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="message bot loading">
                                    <div className="typing-indicator">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Câu hỏi gợi ý*/}
                        {!isLoading && config.suggestedQuestions?.length > 0 && (
                            <div className="suggested-questions">
                                {config.suggestedQuestions.map((q, idx) => (
                                    <motion.button
                                        key={idx}
                                        className="suggestion-btn"
                                        onClick={(e) => handleSend(e, q.text)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {q.label}
                                    </motion.button>
                                ))}
                            </div>
                        )}

                        <form className="chatbot-input" onSubmit={handleSend}>
                            <input
                                type="text"
                                placeholder={`Hỏi ${config.botName}...`}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button type="submit" disabled={!message.trim() || isLoading}>
                                <i className="bi bi-send-fill"></i>
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chatbot;
