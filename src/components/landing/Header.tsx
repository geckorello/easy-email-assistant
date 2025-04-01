
import React from 'react';
import { Logo } from '@/components/ui/Logo';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';

export function Header() {
  const { language, t, isTranslationsLoaded } = useLanguage();
  const location = useLocation();
  
  // Check if we're on the waitlist page
  const isWaitlistPage = location.pathname === '/' || location.pathname === '/waitlist';
  
  // Get login button text with proper fallback
  const getLoginText = () => {
    // If translations are loading, show language-specific default
    if (!isTranslationsLoaded) {
      return language === 'de' ? 'Bei Ihrem Konto anmelden' : 'Login to your account';
    }
    
    // Try to get translation, with fallback
    const translatedText = t('header.loginToAccount');
    if (translatedText === 'header.loginToAccount') {
      return language === 'de' ? 'Bei Ihrem Konto anmelden' : 'Login to your account';
    }
    
    return translatedText;
  };
  
  return (
    <header className="relative w-full py-6 px-4 md:py-10 md:px-10 lg:px-20 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          {!isWaitlistPage && (
            <Link to="/login">
              <Button variant="outline">
                {getLoginText()}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
