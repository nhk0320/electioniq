import React, { createContext, useState, useContext, useEffect } from 'react';
import en from '../translations/en.json';
import hi from '../translations/hi.json';
import ta from '../translations/ta.json';
import te from '../translations/te.json';

const translations = { en, hi, ta, te };

export const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Helper function to get translation
  const t = (key) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
