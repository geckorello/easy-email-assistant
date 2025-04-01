
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function SubscriptionManagement() {
  const { t } = useLanguage();
  
  return (
    <Card className="bg-white">
      <CardContent className="pt-6 pb-4">
        <h3 className="font-medium mb-4">{t('subscription.management')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <a href="#" className="flex items-center gap-2 text-blue-600 hover:underline text-sm">
            <FileText className="h-4 w-4" />
            <span>{t('subscription.billingHistory')}</span>
          </a>
          <a href="#" className="flex items-center gap-2 text-blue-600 hover:underline text-sm">
            <HelpCircle className="h-4 w-4" />
            <span>{t('subscription.faq')}</span>
          </a>
          <a href="#" className="flex items-center gap-2 text-red-500 hover:underline text-sm">
            <span>{t('subscription.cancel')}</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
