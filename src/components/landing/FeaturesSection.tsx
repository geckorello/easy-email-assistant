
import React from 'react';
import { Mail, Shield, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function FeaturesSection() {
  const { t } = useLanguage();
  
  const features = [
    {
      title: t('landing.features.smartEmail'),
      description: t('landing.features.smartEmailDesc'),
      icon: <Mail className="h-5 w-5" />,
    },
    {
      title: t('landing.features.secureIntegration'),
      description: t('landing.features.secureIntegrationDesc'),
      icon: <Shield className="h-5 w-5" />,
    },
    {
      title: t('landing.features.instantProcessing'),
      description: t('landing.features.instantProcessingDesc'),
      icon: <Zap className="h-5 w-5" />,
    },
  ];
  
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className="glass-card rounded-xl p-6 flex flex-col animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
