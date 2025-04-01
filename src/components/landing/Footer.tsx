
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const location = useLocation();
  
  // Check if we're on the waitlist page
  const isWaitlistPage = location.pathname === '/' || location.pathname === '/waitlist';
  
  // Return a simpler footer for the waitlist page
  if (isWaitlistPage) {
    return (
      <footer className="w-full py-10 px-4 border-t border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm text-muted-foreground mb-2">
              {t('common.footer.copyright').replace('{year}', currentYear.toString())}
            </p>
            <div className="flex items-center space-x-4">
              <a href="/impressum" className="text-sm text-muted-foreground hover:text-foreground">
                Impressum
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  // Return the full footer for other pages
  return (
    <footer className="w-full py-10 px-4 border-t border-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {t('common.footer.copyright').replace('{year}', currentYear.toString())}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              {t('common.footer.privacy')}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              {t('common.footer.terms')}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              {t('common.footer.contact')}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              {t('common.footer.blog')}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              {t('common.footer.cancellation')}
            </a>
            <a href="/affiliate" className="text-sm text-muted-foreground hover:text-foreground">
              {t('common.footer.affiliate')}
            </a>
            <a href="/impressum" className="text-sm text-muted-foreground hover:text-foreground">
              Impressum
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
