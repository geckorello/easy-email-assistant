
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface UsageInfoCardProps {
  emailsProcessed: number;
  emailLimit: number;
  resetDate: string;
}

export function UsageInfoCard({ emailsProcessed, emailLimit, resetDate }: UsageInfoCardProps) {
  const usagePercentage = Math.min(Math.round((emailsProcessed / emailLimit) * 100), 100);
  const { t } = useLanguage();
  
  return (
    <Card className="bg-amber-50 border-amber-200">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800">{t('subscription.usage.title')}</h3>
            <p className="text-amber-700 mt-1">
              {t('subscription.usage.status')} {emailsProcessed} ({usagePercentage}%) {t('subscription.usage.of')} {emailLimit} {t('subscription.usage.resetDate')} {resetDate}
            </p>
            <Button variant="outline" className="mt-3 bg-white text-amber-800 hover:bg-amber-100">
              {t('subscription.usage.upgrade')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
