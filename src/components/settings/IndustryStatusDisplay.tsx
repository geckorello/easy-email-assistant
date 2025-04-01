
import React from 'react';
import { Settings2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface IndustryStatusDisplayProps {
  selectedIndustry: string;
}

export function IndustryStatusDisplay({ selectedIndustry }: IndustryStatusDisplayProps) {
  const { t } = useLanguage();

  return (
    <div className="rounded-md bg-muted p-4">
      <div className="flex items-start space-x-4">
        <div className="mt-0.5 rounded-full bg-primary/10 p-1">
          <Settings2 className="h-4 w-4 text-primary" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">
            {t('settings.industry.title')}
          </p>
          <p className="text-sm text-muted-foreground">
            {selectedIndustry === 'property-managers' && t('settings.industry.propertyManagers')}
            {selectedIndustry === 'real-estate' && t('settings.industry.realEstate')}
            {selectedIndustry === 'generic' && t('settings.industry.generic')}
          </p>
        </div>
      </div>
    </div>
  );
}
