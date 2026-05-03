import React, { createContext, useState, useContext, useEffect } from 'react';
import en from '../translations/en.json';
import hi from '../translations/hi.json';
import ta from '../translations/ta.json';
import te from '../translations/te.json';
import bn from '../translations/bn.json';
import mr from '../translations/mr.json';
import gu from '../translations/gu.json';
import kn from '../translations/kn.json';
import ml from '../translations/ml.json';
import or from '../translations/or.json';

const translations = { en, hi, ta, te, bn, mr, gu, kn, ml, or };

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
