import { Link } from 'react-router-dom';
import { useState } from 'react';
import BackgroundNoise from '../components/BackgroundNoise';
import './HomePage.css';

function HomePage() {
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const githubAvatarUrl = 'https://github.com/keirokeer.png?size=200';
  const fallbackAvatar = '/avatar.webp';
  
  const handleImageLoad = () => {
    setAvatarLoaded(true);
  };

  const handleImageError = () => {
    setAvatarError(true);
    setAvatarLoaded(true);
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
                  alt="keirokeer" 
                  className={`avatar ${avatarLoaded ? 'loaded' : 'loading'}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
                {!avatarLoaded && <div className="avatar-skeleton"></div>}
              </div>
            </div>
          </div>
          
          <h1 className="name">keirokeer</h1>
          <p className="bio">
            Audio engineer, content creator & voice synthesis enthusiast.
            Creator/voice of KEIRO and founder of LUNAI Project (DiffSinger virtual performers).
            OpenUtau contributor.
            Commissions open.
          </p>
          
          <div className="buttons-main">
            <Link to="/commissions" className="btn btn-primary">
              Commissions
            </Link>
          </div>

          <div className="buttons-row">
            <a href="https://www.mediafire.com/folder/hzd1w9m2e176q/keirokeer_USTs" 
               className="btn btn-platform" 
               target="_blank" 
               rel="noopener noreferrer">
              USTs / SVPs
            </a>
            
            <a href="https://lunaiproject.github.io/" 
               className="btn btn-platform" 
               target="_blank" 
               rel="noopener noreferrer">
              LUNAI Project
            </a>
          </div>
          
          <div className="platforms-section">
            <p className="platforms-title">My Platforms</p>
            <div className="platforms-grid">
              <a href="https://www.youtube.com/c/keirokeer" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="platform-link youtube">
                YouTube
              </a>
              <a href="https://soundcloud.com/keirokeer" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="platform-link soundcloud">
                SoundCloud
              </a>
              <a href="https://x.com/keirokeer" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="platform-link twitter">
                X (Twitter)
              </a>
              <a href="https://github.com/keirokeer" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="platform-link github">
                GitHub
              </a>
              <a href="https://boosty.to/keirokeer" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="platform-link boosty">
                Boosty
              </a>
              <div className="platform-link discord">
                Discord: keirokeer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;