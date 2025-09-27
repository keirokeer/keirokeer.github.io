import { Link } from 'react-router-dom';
import { useState } from 'react';
import BackgroundNoise from '../components/BackgroundNoise';
import siteConfig from '../config/settings';
import './HomePage.css';

function HomePage() {
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const githubAvatarUrl = `https://github.com/${siteConfig.username}.png?size=200`;
  const fallbackAvatar = '/avatar.webp';
  
  const handleImageLoad = () => {
    setAvatarLoaded(true);
  };

  const handleImageError = () => {
    setAvatarError(true);
    setAvatarLoaded(true);
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
    
    if (primaryButton.type === 'external' && primaryButton.url) {
      return (
        <a href={primaryButton.url} 
           className="btn btn-primary" 
           target="_blank" 
           rel="noopener noreferrer">
          {primaryButton.name}
        </a>
      );
    } else {
      return (
        <Link to="/commissions" className="btn btn-primary">
          {primaryButton.name}
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
          <p className="bio">{siteConfig.content.bio}</p>
          
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
            <p className="platforms-title">My Platforms</p>
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