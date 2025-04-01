
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

const TrialBanner: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="bg-amber-50 border-amber-200">
      <CardContent className="py-3 px-4">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">{t('trial.account')}</span> 27 {t('trial.remaining')}
        </p>
      </CardContent>
    </Card>
  );
};

export default TrialBanner;
