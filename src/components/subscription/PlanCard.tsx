
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

interface PlanProps {
  name: string;
  price: string | null;
  description: string;
  features: string[];
  highlight: boolean;
  isCurrentPlan: boolean;
}

const FeatureCheck = () => (
  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
);

export function PlanCard({ name, price, description, features, highlight, isCurrentPlan }: PlanProps) {
  const { t } = useLanguage();
  
  return (
    <Card className={cn(
      "relative flex flex-col",
      highlight && "border-primary shadow-lg"
    )}>
      {highlight && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit px-4 py-1 bg-primary text-primary-foreground text-sm rounded-full">
          {t('subscription.popular')}
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-xl">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
        <div className="mt-4">
          {price ? (
            <>
              <span className="text-4xl font-bold">€{price}</span>
              <span className="text-muted-foreground">{t('subscription.month')}</span>
            </>
          ) : (
            <span className="text-xl font-medium text-primary">{t('subscription.contactSales')}</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <FeatureCheck />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button 
          className="w-full" 
          variant={isCurrentPlan ? "secondary" : "default"}
        >
          {isCurrentPlan ? t('subscription.currentPlan') : (price ? t('subscription.selectPlan') : t('subscription.contactSales'))}
        </Button>
      </CardFooter>
    </Card>
  );
}
