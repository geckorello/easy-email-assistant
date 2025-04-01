
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AddonProps {
  name: string;
  price: string | null;
  description: string;
  icon: LucideIcon;
  features: string[];
}

const FeatureCheck = () => (
  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
);

export function AddonsSection({ addons }: { addons: AddonProps[] }) {
  const { t } = useLanguage();
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t('subscription.addons.title')}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {addons.map((addon) => (
          <Card key={addon.name}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <addon.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">{addon.name}</h3>
                    <p className="text-sm text-muted-foreground">{addon.description}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                {addon.price ? (
                  <>
                    <span className="text-3xl font-bold">€{addon.price}</span>
                    <span className="text-muted-foreground">{t('subscription.month')}</span>
                  </>
                ) : (
                  <span className="text-lg font-medium text-primary">{t('subscription.contactSales')}</span>
                )}
              </div>
              <ul className="space-y-3">
                {addon.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <FeatureCheck />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                {addon.price ? t('subscription.addons.addToPlan') : t('subscription.contactSales')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
