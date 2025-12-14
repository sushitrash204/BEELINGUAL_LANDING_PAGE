import './Footer.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = ({ content }) => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'Facebook', icon: 'bi-facebook', url: content?.socialLinks?.facebook || '#' },
        { name: 'Instagram', icon: 'bi-instagram', url: content?.socialLinks?.instagram || '#' },
        { name: 'Twitter', icon: 'bi-twitter-x', url: content?.socialLinks?.twitter || '#' },
        { name: 'YouTube', icon: 'bi-youtube', url: content?.socialLinks?.youtube || '#' }
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3 className="footer-logo gradient-text">
                            <i className="bi bi-bee"></i> Beelingual
                        </h3>
                        <p className="footer-description">
                            {content?.footerDescription || 'Nền tảng học tiếng Anh thông minh, giúp bạn chinh phục tiếng Anh một cách hiệu quả và thú vị nhất.'}
                        </p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-section">
                            <h4 className="footer-title">Liên Hệ</h4>
                            <ul className="footer-list">
                                <li>
                                    <a href={`mailto:${content?.contactEmail || 'contact@beelingual.com'}`}>
                                        <i className="bi bi-envelope"></i> {content?.contactEmail || 'contact@beelingual.com'}
                                    </a>
                                </li>
                                <li>
                                    <a href={`tel:${content?.contactPhone || '+84123456789'}`}>
                                        <i className="bi bi-telephone"></i> {content?.contactPhone || '+84 123 456 789'}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h4 className="footer-title">Theo Dõi Chúng Tôi</h4>
                            <div className="social-links">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        className="social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={social.name}
                                    >
                                        <i className={`bi ${social.icon}`}></i>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Beelingual. All rights reserved.</p>
                    <p>Made with <i className="bi bi-heart-fill"></i> for English learners</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
