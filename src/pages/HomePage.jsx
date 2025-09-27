import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BackgroundNoise from '../components/BackgroundNoise';
import LanguageSwitcher from '../components/LanguageSwitcher';
import siteConfig from '../config/settings';
import transcriptionsRu from '../config/transcriptions-ru';
import transcriptionsFr from '../config/transcriptions-fr';
import transcriptionsJa from '../config/transcriptions-ja';
import transcriptionsKo from '../config/transcriptions-ko';
import transcriptionsZh from '../config/transcriptions-zh';
import transcriptionsPtBr from '../config/transcriptions-pt-br';
import transcriptionsEs from '../config/transcriptions-es';
import transcriptionsIt from '../config/transcriptions-it';
import transcriptionsSr from '../config/transcriptions-sr';
import './HomePage.css';

function HomePage() {
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [currentLang, setCurrentLang] = useState(siteConfig.language.default);

  const githubAvatarUrl = `https://github.com/${siteConfig.username}.png?size=200`;
  const fallbackAvatar = '/avatar.webp';

  const getTranslation = (key) => {
    if (currentLang === 'en') {
      if (key === 'bio') return siteConfig.content.bio;
      if (key === 'commissions') return siteConfig.primaryButton.name;
      if (key === 'myPlatforms') return 'My Platforms';
    }
    
    if (currentLang === 'ru') {
      if (key === 'bio') return transcriptionsRu.bio;
      if (key === 'commissions') return transcriptionsRu.commissions;
      if (key === 'myPlatforms') return transcriptionsRu.myPlatforms;
    }
    
    if (currentLang === 'fr') {
      if (key === 'bio') return transcriptionsFr.bio;
      if (key === 'commissions') return transcriptionsFr.commissions;
      if (key === 'myPlatforms') return transcriptionsFr.myPlatforms;
    }
    
    if (currentLang === 'ja') {
      if (key === 'bio') return transcriptionsJa.bio;
      if (key === 'commissions') return transcriptionsJa.commissions;
      if (key === 'myPlatforms') return transcriptionsJa.myPlatforms;
    }
    
    if (currentLang === 'ko') {
      if (key === 'bio') return transcriptionsKo.bio;
      if (key === 'commissions') return transcriptionsKo.commissions;
      if (key === 'myPlatforms') return transcriptionsKo.myPlatforms;
    }
    
    if (currentLang === 'zh') {
      if (key === 'bio') return transcriptionsZh.bio;
      if (key === 'commissions') return transcriptionsZh.commissions;
      if (key === 'myPlatforms') return transcriptionsZh.myPlatforms;
    }
    
    if (currentLang === 'pt-br') {
      if (key === 'bio') return transcriptionsPtBr.bio;
      if (key === 'commissions') return transcriptionsPtBr.commissions;
      if (key === 'myPlatforms') return transcriptionsPtBr.myPlatforms;
    }
    
    if (currentLang === 'es') {
      if (key === 'bio') return transcriptionsEs.bio;
      if (key === 'commissions') return transcriptionsEs.commissions;
      if (key === 'myPlatforms') return transcriptionsEs.myPlatforms;
    }
    
    if (currentLang === 'it') {
      if (key === 'bio') return transcriptionsIt.bio;
      if (key === 'commissions') return transcriptionsIt.commissions;
      if (key === 'myPlatforms') return transcriptionsIt.myPlatforms;
    }
    
    if (currentLang === 'sr') {
      if (key === 'bio') return transcriptionsSr.bio;
      if (key === 'commissions') return transcriptionsSr.commissions;
      if (key === 'myPlatforms') return transcriptionsSr.myPlatforms;
    }
    
    if (key === 'bio') return siteConfig.content.bio;
    if (key === 'commissions') return siteConfig.primaryButton.name;
    return 'My Platforms';
  };

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
  };

  const handleImageLoad = () => {
    setAvatarLoaded(true);
  };

  const handleImageError = () => {
    setAvatarError(true);
    setAvatarLoaded(true);
  };

  const formatBio = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  const getPlatformDisplayName = (platform) => {
    const platformNames = {
      youtube: 'YouTube',
      soundcloud: 'SoundCloud',
      twitter: 'X / Twitter',
      tiktok: 'TikTok',
      vk: 'VK',
      deviantart: 'DeviantArt',
      artstation: 'ArtStation',
      furaffinity: 'Fur Affinity',
      github: 'GitHub',
      lavatop: 'Lava.top',
      paypal: 'PayPal',
      bluesky: 'Bluesky',
      twitch: 'Twitch',
      telegram: 'Telegram',
      pinterest: 'Pinterest',
      instagram: 'Instagram',
      facebook: 'Facebook',
      boosty: 'Boosty',
      discord: 'Discord'
    };
    
    return platformNames[platform] || platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  const renderPrimaryButton = () => {
    const { primaryButton } = siteConfig;
    const buttonText = getTranslation('commissions');
    
    if (primaryButton.type === 'external' && primaryButton.url) {
      return (
        <a href={primaryButton.url} 
           className="btn btn-primary" 
           target="_blank" 
           rel="noopener noreferrer">
          {buttonText}
        </a>
      );
    } else {
      return (
        <Link to="/commissions" className="btn btn-primary">
          {buttonText}
        </Link>
      );
    }
  };

  const renderPlatforms = () => {
    const platforms = [];
    
    Object.entries(siteConfig.platforms).forEach(([platform, value]) => {
      if (!value) return;
      
      const displayName = getPlatformDisplayName(platform);
      
      if (platform === 'discord') {
        platforms.push(
          <div key={platform} className={`platform-link ${platform}`}>
            Discord: {value}
          </div>
        );
      } else {
        platforms.push(
          <a key={platform} 
             href={value} 
             target="_blank" 
             rel="noopener noreferrer" 
             className={`platform-link ${platform}`}>
            {displayName}
          </a>
        );
      }
    });
    
    return platforms;
  };

  return (
    <div className="home-page">
      <BackgroundNoise />
      <LanguageSwitcher onLanguageChange={handleLanguageChange} />
      <div className="container">
        <div className="profile-card">
          <div className="banner-container">
            <img src="/banner.webp" alt="Banner" className="banner" />
            <div className="avatar-overlay">
              <div className="avatar-container">
                <img 
                  src={avatarError ? fallbackAvatar : githubAvatarUrl}
                  alt={siteConfig.content.name} 
                  className={`avatar ${avatarLoaded ? 'loaded' : 'loading'}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
                {!avatarLoaded && <div className="avatar-skeleton"></div>}
              </div>
            </div>
          </div>
          
          <h1 className="name">{siteConfig.content.name}</h1>
          <p className="bio">{formatBio(getTranslation('bio'))}</p>
          
          <div className="buttons-main">
            {renderPrimaryButton()}
          </div>

          <div className="buttons-row">
            {siteConfig.mainButtons.map((button, index) => (
              <a key={index}
                 href={button.url} 
                 className="btn btn-platform" 
                 target="_blank" 
                 rel="noopener noreferrer">
                {button.name}
              </a>
            ))}
          </div>
          
          <div className="platforms-section">
            <p className="platforms-title">{getTranslation('myPlatforms')}</p>
            <div className="platforms-grid">
              {renderPlatforms()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;