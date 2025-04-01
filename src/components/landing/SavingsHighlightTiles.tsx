
import React from 'react';
import { Clock, DollarSign } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function SavingsHighlightTiles() {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex flex-col items-center text-left">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-800">{t('landing.hero.timeSavings')}</h3>
        </div>
        <p className="text-blue-700 text-sm" dangerouslySetInnerHTML={{ __html: t('landing.hero.timeSavingsDesc').replace(/(\d+-\d+|\d+)/g, '<strong>$1</strong>') }}></p>
      </div>
      <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex flex-col items-center text-left">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-green-800">{t('landing.hero.costImpact')}</h3>
        </div>
        <p className="text-green-700 text-sm" dangerouslySetInnerHTML={{ __html: t('landing.hero.costImpactDesc').replace(/€\d+\+/g, '<strong>$&</strong>') }}></p>
      </div>
    </div>
  );
}
