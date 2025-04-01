
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

export function PricingSection() {
  const { t } = useLanguage();
  
  const pricingPlans = [
    {
      name: t('landing.pricing.basic'),
      price: "49",
      emails: "100",
      features: [
        t('landing.pricing.feature.basic.autoResponses'), 
        t('landing.pricing.feature.customTemplate'),
        t('landing.pricing.feature.aiProcessing')
      ]
    },
    {
      name: t('landing.pricing.professional'),
      price: "99",
      emails: "500",
      features: [
        t('landing.pricing.feature.professional.autoResponses'), 
        t('landing.pricing.feature.specialTemplates'),
        t('landing.pricing.feature.aiProcessing'), 
        t('landing.pricing.feature.analytics'),
        t('landing.pricing.feature.prioritySupport')
      ]
    },
    {
      name: t('landing.pricing.enterprise'),
      price: null,
      emails: "5000+",
      features: [
        t('landing.pricing.feature.unlimitedResponses'), 
        t('landing.pricing.feature.aiProcessing'), 
        t('landing.pricing.feature.prioritySupport'), 
        t('landing.pricing.feature.customPrompts'), 
        t('landing.pricing.feature.specialTemplates'),
        t('landing.pricing.feature.analytics'),
        t('landing.pricing.feature.accountManager')
      ]
    }
  ];
  
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{t('landing.pricing.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className="relative hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  {plan.price ? (
                    <>
                      <span className="text-3xl font-bold">€{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{t('landing.pricing.month')}</span>
                    </>
                  ) : (
                    <span className="text-lg font-medium text-primary">{t('landing.pricing.contactPricing')}</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full">{plan.price ? t('landing.pricing.selectPlan') : t('landing.pricing.contactSales')}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
