
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function SecurityBanner() {
  const { t } = useLanguage();
  
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Shield className="h-6 w-6 text-blue-600" />
          <p className="text-blue-800">
            {t('subscription.securityNotice')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
