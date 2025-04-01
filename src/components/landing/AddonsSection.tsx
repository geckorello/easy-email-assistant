
import React from 'react';
import { Bell, Server, CheckCircle2 } from 'lucide-react';
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

export function AddonsSection() {
  const { t } = useLanguage();
  
  const addons = [
    {
      name: t('landing.addons.sms.name'),
      price: "99",
      description: t('landing.addons.sms.description'),
      icon: <Bell className="h-6 w-6 text-primary" />,
      features: [
        t('landing.addons.sms.feature1'),
        t('landing.addons.sms.feature2'),
        t('landing.addons.sms.feature3'),
        t('landing.addons.sms.feature4')
      ]
    },
    {
      name: t('landing.addons.files.name'),
      price: null,
      description: t('landing.addons.files.description'),
      icon: <Server className="h-6 w-6 text-primary" />,
      features: [
        t('landing.addons.files.feature1'),
        t('landing.addons.files.feature2'),
        t('landing.addons.files.feature3'),
        t('landing.addons.files.feature4')
      ]
    }
  ];
  
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">{t('landing.addons.title')}</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          {t('landing.addons.description')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {addons.map((addon) => (
            <Card key={addon.name} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    {addon.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{addon.name}</CardTitle>
                    <CardDescription>{addon.description}</CardDescription>
                    <div className="mt-2">
                      {addon.price ? (
                        <>
                          <span className="text-2xl font-bold">€{addon.price}</span>
                          <span className="text-sm text-muted-foreground">{t('landing.pricing.month')}</span>
                        </>
                      ) : (
                        <span className="text-lg font-medium text-primary">{t('landing.pricing.contactPricing')}</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {addon.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  {addon.price ? t('landing.pricing.selectPlan') : t('landing.pricing.contactSales')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
