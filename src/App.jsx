import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import StatisticsSection from './components/StatisticsSection';
import DownloadSection from './components/DownloadSection';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { fetchLandingPageContent, fetchStatistics, fetchThemeSettings } from './services/api';
import './App.css';

function App() {
  const [content, setContent] = useState({});
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();

    // Listen for messages from Admin Preview
    const handleMessage = (event) => {
      // Bảo mật: Kiểm tra nguồn gửi tin nhắn (Origin)
      const trustedOrigin = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5173';

      if (event.origin !== trustedOrigin) {
        return; // Bỏ qua nếu tin nhắn không đến từ trang Admin tin cậy
      }

      const { type, data } = event.data;

      if (type === 'BEELINGUAL_PREVIEW_UPDATE') {
        if (data.content) {
          setContent(prev => ({ ...prev, ...data.content }));
        }
        if (data.theme) {
          applyTheme(data.theme);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const loadData = async () => {
    try {
      // Fetch all data in parallel
      const [contentData, statsData, themeData] = await Promise.all([
        fetchLandingPageContent(),
        fetchStatistics(),
        fetchThemeSettings()
      ]);

      // If we are in iframe, we might receive initial data from parent
      // but we still load real data as base
      if (contentData) setContent(contentData);
      if (statsData) setStats(statsData);
      if (themeData) applyTheme(themeData);

    } catch (error) {
      console.error('Error loading landing page data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyTheme = (theme) => {
    if (!theme) return;

    const root = document.documentElement;

    // Helper to convert hex to rgb
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    };

    const setPropertyWithRgb = (name, value) => {
      root.style.setProperty(name, value);
      const rgb = hexToRgb(value);
      if (rgb) {
        root.style.setProperty(`${name}-rgb`, rgb);
      }
    };

    setPropertyWithRgb('--primary-color', theme.primaryColor);
    setPropertyWithRgb('--secondary-color', theme.secondaryColor);
    setPropertyWithRgb('--accent-color', theme.accentColor);
    setPropertyWithRgb('--background-color', theme.backgroundColor);
    setPropertyWithRgb('--text-color', theme.textColor);

    // New granular colors
    setPropertyWithRgb('--footer-color', theme.footerColor);
    setPropertyWithRgb('--hero-headline-color', theme.heroHeadlineColor);
    setPropertyWithRgb('--card-color', theme.cardColor);
    setPropertyWithRgb('--input-bg-color', theme.inputBackgroundColor);
    setPropertyWithRgb('--success-color', theme.successColor);
    setPropertyWithRgb('--error-color', theme.errorColor);

    // Chatbot specific colors
    setPropertyWithRgb('--chat-window-color', theme.chatWindowColor);
    setPropertyWithRgb('--chat-header-text-color', theme.chatHeaderTextColor);
    setPropertyWithRgb('--bot-bubble-color', theme.botBubbleColor);
    setPropertyWithRgb('--bot-text-color', theme.botTextColor);
    setPropertyWithRgb('--user-bubble-color', theme.userBubbleColor);
    setPropertyWithRgb('--user-text-color', theme.userTextColor);
    setPropertyWithRgb('--suggest-bg-color', theme.suggestedBgColor);
    setPropertyWithRgb('--suggest-text-color', theme.suggestedTextColor);

    setPropertyWithRgb('--gradient-start', theme.gradientStart);
    setPropertyWithRgb('--gradient-end', theme.gradientEnd);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading Beelingual...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <HeroSection content={content.hero} />
      <FeaturesSection content={content.features} />
      <StatisticsSection stats={stats} />
      <DownloadSection content={content.download} />
      <Footer content={content.footer} />
      <Chatbot />
    </div>
  );
}

export default App;
