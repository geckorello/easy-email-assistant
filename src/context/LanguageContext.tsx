
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isTranslationsLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const savedLanguage = localStorage.getItem('language') as Language;
  const initialLanguage = savedLanguage && ['en', 'de'].includes(savedLanguage) ? savedLanguage : 'en';
  
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isTranslationsLoaded, setIsTranslationsLoaded] = useState(false);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsTranslationsLoaded(false);
        // Load all translation modules
        const modules = ['auth', 'common', 'dashboard', 'landing', 'settings', 'subscription', 'templates'];
        const loadedTranslations: Record<string, any> = {};

        await Promise.all(
          modules.map(async (module) => {
            try {
              const moduleTranslations = await import(`../translations/${language}/${module}.json`);
              loadedTranslations[module] = moduleTranslations.default;
            } catch (error) {
              console.error(`Failed to load ${module} translations:`, error);
              // Load English as fallback
              const fallbackTranslations = await import(`../translations/en/${module}.json`);
              loadedTranslations[module] = fallbackTranslations.default;
            }
          })
        );

        setTranslations(loadedTranslations);
        setIsTranslationsLoaded(true);
      } catch (error) {
        console.error('Failed to load translations:', error);
        setIsTranslationsLoaded(true); // Set to true even on error to prevent infinite loading
      }
    };

    loadTranslations();
  }, [language]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const parts = key.split('.');
    const module = parts[0];
    const path = parts.slice(1);
    
    try {
      let result = translations[module];
      if (!result) return key; // Return key if module not found
      
      for (const part of path) {
        result = result[part];
        if (result === undefined) return key; // Return key if path not found
      }
      return result || key;
    } catch (error) {
      return key;
    }
  };

  const value = {
    language,
    setLanguage: handleLanguageChange,
    t,
    isTranslationsLoaded
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
