import { useState, useEffect, useRef } from 'react';
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
import languageNames from '../config/language-names';
import LanguageIcon from '../assets/icons/language-exchange.svg';
import './LanguageSwitcher.css';

function LanguageSwitcher({ onLanguageChange }) {
  const [currentLang, setCurrentLang] = useState(siteConfig.language.default);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const isLanguageEnabled = siteConfig.language.enabled && 
                           siteConfig.language.available.length > 0;

  const detectUserLanguage = () => {
    const availableLangs = [siteConfig.language.default, ...siteConfig.language.available];
    
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && availableLangs.includes(savedLang)) {
      return savedLang;
    }
    
    const browserLang = getBrowserLanguage();
    const matchedLang = matchBrowserLanguage(browserLang, availableLangs);
    
    if (matchedLang) {
      return matchedLang;
    }
    
    return siteConfig.language.default;
  };

  const getBrowserLanguage = () => {
    if (navigator.languages && navigator.languages.length > 0) {
      return navigator.languages[0];
    }
    return navigator.language || navigator.userLanguage || siteConfig.language.default;
  };

  const matchBrowserLanguage = (browserLang, availableLangs) => {
    if (!browserLang) return null;
    
    const langCode = browserLang.toLowerCase().split('-')[0];
    
    if (availableLangs.includes(langCode)) {
      return langCode;
    }
    
    if (availableLangs.includes(browserLang.toLowerCase())) {
      return browserLang.toLowerCase();
    }
    
    for (const availableLang of availableLangs) {
      if (availableLang.split('-')[0] === langCode) {
        return availableLang;
      }
    }
    
    return null;
  };

  useEffect(() => {
    const detectedLang = detectUserLanguage();
    setCurrentLang(detectedLang);
    onLanguageChange(detectedLang);
    
    if (!localStorage.getItem('preferredLanguage')) {
      localStorage.setItem('preferredLanguage', detectedLang);
    }
  }, [onLanguageChange]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTranslation = (key, lang = currentLang) => {
    if (key === 'languages') {
      return languageNames;
    }
    
    if (lang === 'en') {
      if (key === 'changeLanguage') return 'Change language';
    }
    
    if (lang === 'ru') {
      if (key === 'changeLanguage') return transcriptionsRu.changeLanguage;
    }
    
    if (lang === 'fr') {
      if (key === 'changeLanguage') return transcriptionsFr.changeLanguage;
    }
    
    if (lang === 'ja') {
      if (key === 'changeLanguage') return transcriptionsJa.changeLanguage;
    }
    
    if (lang === 'ko') {
      if (key === 'changeLanguage') return transcriptionsKo.changeLanguage;
    }
    
    if (lang === 'zh') {
      if (key === 'changeLanguage') return transcriptionsZh.changeLanguage;
    }
    
    if (lang === 'pt-br') {
      if (key === 'changeLanguage') return transcriptionsPtBr.changeLanguage;
    }
    
    if (lang === 'es') {
      if (key === 'changeLanguage') return transcriptionsEs.changeLanguage;
    }
    
    if (lang === 'it') {
      if (key === 'changeLanguage') return transcriptionsIt.changeLanguage;
    }
    
    if (lang === 'sr') {
      if (key === 'changeLanguage') return transcriptionsSr.changeLanguage;
    }
    
    return 'Change language';
  };

  const handleLanguageSelect = (lang) => {
    setCurrentLang(lang);
    localStorage.setItem('preferredLanguage', lang);
    onLanguageChange(lang);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!isLanguageEnabled) return;
    setIsOpen(!isOpen);
  };

  const getLanguageFlag = (lang) => {
    const flags = {
      'en': '🇺🇸',
      'ru': '🇷🇺',
      'sr': '🇷🇸',
      'fr': '🇫🇷', 
      'ja': '🇯🇵',
      'ko': '🇰🇷',
      'zh': '🇨🇳',
      'pt-br': '🇧🇷',
      'es': '🇪🇸',
      'it': '🇮🇹'
    };
    return flags[lang] || '🌐';
  };

  if (!isLanguageEnabled) {
    return null;
  }

  const availableLangs = [siteConfig.language.default, ...siteConfig.language.available];
  const languages = getTranslation('languages');

  return (
    <div className="language-switcher-container" ref={dropdownRef}>
      <button 
        className={`language-switcher ${isOpen ? 'active' : ''}`}
        onClick={toggleDropdown}
        aria-label={getTranslation('changeLanguage')}
        aria-expanded={isOpen}
        title={`Current language: ${languages[currentLang]}`}
      >
        <img src={LanguageIcon} alt="Language" className="language-icon" />
        <span className="language-text">{getTranslation('changeLanguage')}</span>
        <svg 
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`} 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {availableLangs.map((lang) => (
            <button
              key={lang}
              className={`language-option ${currentLang === lang ? 'selected' : ''}`}
              onClick={() => handleLanguageSelect(lang)}
            >
              <span className="language-flag">{getLanguageFlag(lang)}</span>
              <span className="language-name">{languages[lang]}</span>
              {currentLang === lang && (
                <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;