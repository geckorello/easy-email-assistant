
import React from 'react';
import { FileEdit } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function EmailDraftNote() {
  const { t } = useLanguage();
  
  return (
    <div className="w-full max-w-4xl mx-auto mt-16 bg-blue-50 rounded-lg p-6 border border-blue-200">
      <div className="flex items-start gap-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <FileEdit className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">{t('landing.emailDraft.title')}</h3>
          <p className="text-blue-700">
            {t('landing.emailDraft.description')}
          </p>
        </div>
      </div>
    </div>
  );
}
