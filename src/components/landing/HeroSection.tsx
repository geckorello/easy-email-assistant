
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AuthButton } from '@/components/auth/AuthButton';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t, language } = useLanguage();
  
  // Render the title differently based on language
  const renderTitle = () => {
    if (language === 'en') {
      return (
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
          {t('landing.hero.title').split('Outlook')[0]}{" "}
          <span className="text-primary">Outlook</span>
        </h1>
      );
    } else {
      return (
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
          {t('landing.hero.title')}
        </h1>
      );
    }
  };
  
  return (
    <div className="text-center max-w-4xl mx-auto mb-16">
      <div className="inline-block animate-fade-in">
        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-5">
          <span className="mr-1">✨</span> {t('landing.hero.badge')}
        </span>
      </div>
      {renderTitle()}
      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
        {t('landing.hero.description')}
      </p>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-8 max-w-xl mx-auto">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">{t('landing.hero.freeSignup')}</h3>
        <p className="text-amber-700 mb-3">{t('landing.hero.freeTrialInfo')}</p>
        {!isAuthenticated && (
          <Button 
            variant="default" 
            size="lg" 
            className="w-full sm:w-auto"
            onClick={() => navigate('/signup')}
          >
            {t('landing.hero.startSavingTime')}
          </Button>
        )}
      </div>
      
      <div className="flex flex-col items-center justify-center gap-4 animate-fade-in">
        {isAuthenticated ? (
          <Button size="lg" onClick={() => navigate('/dashboard')} className="btn-hover-effect">
            {t('landing.hero.dashboard')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Button variant="outline" size="lg" onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })} className="btn-hover-effect">
            {t('landing.hero.learnMore')}
          </Button>
        )}
      </div>
    </div>
  );
}
