
import React from 'react';
import { Shield, FileEdit } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function SecurityBanner() {
  const { language, t } = useLanguage();
  
  return (
    <div className="w-full bg-green-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-3 text-green-800">
          <Shield className="h-5 w-5" />
          <p className="text-sm md:text-base">
            <span className="font-semibold">
              {language === 'de' 
                ? "EmailManager erstellt nur E-Mail-Entwürfe - versendet niemals automatisch E-Mails ohne Ihre Zustimmung."
                : "EmailManager prepares email drafts only - never auto-sends emails without your approval."}
            </span> {t('landing.security.banner')}
          </p>
          <FileEdit className="h-5 w-5 hidden md:block" />
        </div>
      </div>
    </div>
  );
}
