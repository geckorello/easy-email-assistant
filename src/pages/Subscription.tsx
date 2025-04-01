import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Bell, Server } from 'lucide-react';
import { PlanCard } from '@/components/subscription/PlanCard';
import { UsageInfoCard } from '@/components/subscription/UsageInfoCard';
import { SecurityBanner } from '@/components/subscription/SecurityBanner';
import { AddonsSection } from '@/components/subscription/AddonsSection';
import { SubscriptionManagement } from '@/components/subscription/SubscriptionManagement';
import { useLanguage } from '@/context/LanguageContext';

export default function Subscription() {
  const { t, language } = useLanguage();
  
  const plans = [
    {
      name: t('subscription.basic'),
      price: '49',
      description: t('subscription.perfect'),
      features: [
        `100 ${t('subscription.emailsPerMonth')}`,
        t('subscription.feature.customTemplate'),
        t('subscription.feature.ai.processing'),
        t('subscription.feature.basic.analytics')
      ],
      highlight: false
    },
    {
      name: t('subscription.professional'),
      price: '99',
      description: t('subscription.popular'),
      features: [
        `500 ${t('subscription.emailsPerMonth')}`,
        t('subscription.feature.specialTemplates'),
        t('subscription.feature.ai.processing'),
        t('subscription.feature.priority.support'),
        t('subscription.feature.analytics')
      ],
      highlight: true
    },
    {
      name: t('subscription.enterprise'),
      price: null,
      description: t('subscription.large'),
      features: [
        t('subscription.feature.unlimited.responses'),
        t('subscription.feature.ai.processing'),
        t('subscription.feature.priority.support'),
        t('subscription.feature.customPrompts'),
        t('subscription.feature.specialTemplates'),
        t('subscription.feature.analytics'),
        t('subscription.feature.accountManager')
      ],
      highlight: false
    }
  ];

  const addons = [
    {
      name: t('subscription.addons.sms.name'),
      price: '99',
      description: t('subscription.addons.sms.description'),
      icon: Bell,
      features: [
        t('subscription.addons.sms.feature1'),
        t('subscription.addons.sms.feature2'),
        t('subscription.addons.sms.feature3'),
        t('subscription.addons.sms.feature4')
      ]
    },
    {
      name: t('subscription.addons.files.name'),
      price: null,
      description: t('subscription.addons.files.description'),
      icon: Server,
      features: [
        t('subscription.addons.files.feature1'),
        t('subscription.addons.files.feature2'),
        t('subscription.addons.files.feature3'),
        t('subscription.addons.files.feature4')
      ]
    }
  ];

  const currentPlan = t('subscription.basic'); // This would come from your subscription service
  const emailsProcessed = 100; // This would be fetched from an API
  const nextResetDate = new Date();
  nextResetDate.setDate(nextResetDate.getDate() + 15); // Assuming 15 days until reset
  
  const formattedResetDate = nextResetDate.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('subscription.title')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('subscription.chooseplan')}
          </p>
        </div>

        <div className="grid gap-6">
          {/* Usage Information Card */}
          <UsageInfoCard 
            emailsProcessed={emailsProcessed}
            emailLimit={100}
            resetDate={formattedResetDate}
          />

          {/* Security Banner */}
          <SecurityBanner />

          {/* Main Plans */}
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard 
                key={plan.name}
                name={plan.name}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                highlight={plan.highlight}
                isCurrentPlan={plan.name === currentPlan}
              />
            ))}
          </div>

          {/* Add-ons */}
          <AddonsSection addons={addons} />
          
          {/* Subscription Management Links */}
          <SubscriptionManagement />
        </div>
      </div>
    </AppLayout>
  );
}
