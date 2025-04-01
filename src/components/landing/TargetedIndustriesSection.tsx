
import React from 'react';
import { Building2, Home, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function TargetedIndustriesSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-3">
            <span className="mr-1">🎯</span> {t('landing.industries.badge')}
          </span>
          <h2 className="text-3xl font-bold mb-4">{t('landing.industries.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('landing.industries.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="bg-blue-50 p-3 rounded-full mb-4">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('landing.industries.property.title')}</h3>
            <p className="text-muted-foreground">
              {t('landing.industries.property.description')}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="bg-blue-50 p-3 rounded-full mb-4">
              <Home className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('landing.industries.realestate.title')}</h3>
            <p className="text-muted-foreground">
              {t('landing.industries.realestate.description')}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="bg-blue-50 p-3 rounded-full mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('landing.industries.highvolume.title')}</h3>
            <p className="text-muted-foreground">
              {t('landing.industries.highvolume.description')}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-10">
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-6 flex-1">
            <h3 className="text-xl font-semibold mb-2 text-blue-800">{t('landing.industries.specialization.title')}</h3>
            <p className="text-blue-700">
              {t('landing.industries.specialization.description')}
            </p>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 flex-1">
            <h3 className="text-xl font-semibold mb-2 text-amber-800">{t('landing.hero.freeSignup')}</h3>
            <p className="text-amber-700 mb-3">
              {t('landing.hero.freeTrialInfo')}
            </p>
            {!isAuthenticated && (
              <Button 
                variant="default" 
                size="sm" 
                className="w-full sm:w-auto"
                onClick={() => navigate('/signup')}
              >
                {t('landing.hero.startSavingTime')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
