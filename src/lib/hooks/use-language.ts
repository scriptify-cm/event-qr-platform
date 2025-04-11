import { useState, useEffect } from 'react';

type Language = 'en' | 'fr';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load language preference from local storage if available
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLanguage = navigator.language.split('-')[0].toLowerCase();
      if (browserLanguage === 'fr') {
        setLanguage('fr');
        localStorage.setItem('language', 'fr');
      } else {
        // Default to English
        setLanguage('en');
        localStorage.setItem('language', 'en');
      }
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fr' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return { language, setLanguage, toggleLanguage };
}
