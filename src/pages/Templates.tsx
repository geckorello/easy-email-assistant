
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { IndustrySettingsCard } from '@/components/settings/IndustrySettingsCard';
import { useLanguage } from '@/context/LanguageContext';

export default function Templates() {
  const { t } = useLanguage();
  const [selectedIndustry, setSelectedIndustry] = useState('generic');

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('templates.title')}</h1>
          <p className="text-muted-foreground">
            {t('templates.description')}
          </p>
        </div>

        <div className="grid gap-6">
          <IndustrySettingsCard 
            selectedIndustry={selectedIndustry} 
            onIndustryChange={handleIndustryChange} 
          />
        </div>
      </div>
    </AppLayout>
  );
}
