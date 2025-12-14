import './DownloadSection.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

const DownloadSection = ({ content }) => {
    const downloadLinks = [
        {
            platform: 'iOS',
            icon: 'bi-apple',
            url: content?.iosLink || '#',
            label: 'App Store'
        },
        {
            platform: 'Android',
            icon: 'bi-google-play',
            url: content?.androidLink || '#',
            label: 'Google Play'
        },
        {
            platform: 'APK',
            icon: 'bi-download',
            url: content?.apkLink || '#',
            label: 'Download APK'
        }
    ];

    return (
        <section className="download-section" id="download">
            <div className="container">
                <div className="download-content">
                    <div className="download-text fade-in-up">
                        <h2 className="section-title">
                            {content?.downloadTitle || 'Tải Beelingual Ngay Hôm Nay'}
                        </h2>
                        <p className="section-subtitle">
                            {content?.downloadDescription || 'Có mặt trên iOS, Android và APK. Bắt đầu hành trình học tiếng Anh của bạn ngay bây giờ!'}
                        </p>
                    </div>

                    <div className="download-buttons">
                        {downloadLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                className="download-btn fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className={`bi ${link.icon} download-icon`}></i>
                                <div className="download-info">
                                    <span className="download-platform">{link.platform}</span>
                                    <span className="download-label">{link.label}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DownloadSection;
