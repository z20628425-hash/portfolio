import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageType } from '../types';
import { t } from '../utils/i18n';

interface LanguageContextType {
  lang: LanguageType;
  setLang: (lang: LanguageType) => void;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'uz',
  setLang: () => {},
  translate: (key) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<LanguageType>(() => {
    const saved = localStorage.getItem('prep_hub_lang');
    return (saved as LanguageType) || 'uz';
  });

  useEffect(() => {
    localStorage.setItem('prep_hub_lang', lang);
  }, [lang]);

  const translate = (key: string) => t(key, lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
