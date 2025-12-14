import './FeaturesSection.scss';

const FeaturesSection = ({ content }) => {
    const features = Array.isArray(content) ? content : (content?.features || []);

    return (
        <section className="features-section" id="features">
            <div className="container">
                <div className="section-header fade-in-up">
                    <h2 className="section-title">Tính Năng Nổi Bật</h2>
                    <p className="section-subtitle">
                        Khám phá những tính năng giúp bạn học tiếng Anh hiệu quả hơn
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-card card fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                            {feature.imageUrl && (
                                <div className="feature-image">
                                    <img src={feature.imageUrl} alt={feature.title} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;