import { useState, useEffect } from 'react';
import './HeroSection.scss';

const HeroSection = ({ content }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleScroll = () => {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero-section" id="hero">
            <div className="hero-background"></div>
            <div className="container">
                <div className="hero-content">
                    <div className={`hero-text ${isVisible ? 'fade-in-up' : ''}`}>
                        <h1 className="hero-title">
                            {content?.heroTitle || 'Học Tiếng Anh Thông Minh Cùng Beelingual'}
                        </h1>
                        <p className="hero-subtitle gradient-text">
                            {content?.heroSubtitle || 'Nền tảng học tiếng Anh hiện đại với AI, gamification và phương pháp học tập hiệu quả nhất'}
                        </p>
                        <button className="btn btn-primary glow" onClick={handleScroll}>
                            {content?.heroCtaText || 'Khám Phá Ngay'} ✨
                        </button>
                    </div>
                    <div className={`hero-image ${isVisible ? 'fade-in-up' : ''}`}>
                        <div className="hero-illustration float">
                            <img
                                src={content?.heroImageUrl || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800'}
                                alt="Beelingual App"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
