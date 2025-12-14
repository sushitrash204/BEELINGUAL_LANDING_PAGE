import { useState, useEffect } from 'react';
import './StatisticsSection.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

const StatisticsSection = ({ stats }) => {
    const [counts, setCounts] = useState({
        totalUsers: 0,
        totalTopics: 0,
        totalVocabulary: 0,
        totalGrammar: 0
    });

    useEffect(() => {
        if (!stats) return;

        // Animate counters
        const duration = 2000; // 2 seconds
        const steps = 60;
        const interval = duration / steps;

        const incrementValues = {
            totalUsers: stats.totalUsers / steps,
            totalTopics: stats.totalTopics / steps,
            totalVocabulary: stats.totalVocabulary / steps,
            totalGrammar: stats.totalGrammar / steps
        };

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            if (currentStep <= steps) {
                setCounts({
                    totalUsers: Math.floor(incrementValues.totalUsers * currentStep),
                    totalTopics: Math.floor(incrementValues.totalTopics * currentStep),
                    totalVocabulary: Math.floor(incrementValues.totalVocabulary * currentStep),
                    totalGrammar: Math.floor(incrementValues.totalGrammar * currentStep)
                });
            } else {
                setCounts(stats);
                clearInterval(timer);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [stats]);

    // CHÚ Ý: Tôi đã thêm 'var(--icon-color-rgb)' vào style của icon-wrapper.
    // Nếu bạn muốn hiệu ứng Pulse hoạt động chính xác, bạn cần đảm bảo bạn
    // truyền giá trị RGB không có dấu # (ví dụ: '59, 130, 246') cho
    // biến '--icon-color-rgb' thông qua props hoặc CSS toàn cục.
    const statsData = [
        { label: 'Người Dùng', value: counts.totalUsers, icon: 'bi-people-fill', color: '#3b82f6', rgb: '59, 130, 246' },
        { label: 'Chủ đề học', value: counts.totalTopics, icon: 'bi-book-fill', color: '#8b5cf6', rgb: '139, 92, 246' },
        { label: 'Từ Vựng', value: counts.totalVocabulary, icon: 'bi-journal-text', color: '#10b981', rgb: '16, 185, 129' },
        { label: 'Ngữ Pháp', value: counts.totalGrammar, icon: 'bi-pen-fill', color: '#f59e0b', rgb: '245, 158, 11' }
    ];

    return (
        <section className="statistics-section" id="statistics">
            <div className="container">
                <div className="section-header fade-in-up">
                    <h2 className="section-title">Chúng Tôi Đang Phát Triển!</h2>
                    <p className="section-subtitle">
                        Hàng nghìn người đã tin tưởng và sử dụng Beelingual
                    </p>
                </div>

                <div className="stats-grid">
                    {statsData.map((stat, index) => (
                        <div
                            key={index}
                            className="stat-card fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Thêm các hình dạng nền trừu tượng */}
                            <div className="stat-background-shape"></div>
                            <div className="stat-background-shape"></div>
                            
                            {/* Cập nhật style để hỗ trợ biến màu RGB cho hiệu ứng Pulse/Ánh sáng */}
                            <div 
                                className="stat-icon-wrapper" 
                                style={{ 
                                    '--icon-color': stat.color,
                                    '--icon-color-rgb': stat.rgb 
                                }}
                            >
                                <i className={`bi ${stat.icon} stat-icon`}></i>
                            </div>
                            <div className="stat-number gradient-text">{stat.value.toLocaleString()}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatisticsSection;