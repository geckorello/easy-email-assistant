
import React, { useEffect } from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { SecurityBanner } from '@/components/landing/SecurityBanner';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { SavingsHighlightTiles } from '@/components/landing/SavingsHighlightTiles';
import { useLanguage } from '@/context/LanguageContext';

export default function WaitlistPage() {
  const { language, t } = useLanguage();
  
  // Update document language attribute to English by default
  useEffect(() => {
    document.documentElement.lang = 'en';
    // Update page title for better SEO
    document.title = "Join Our Waitlist - EmailManager.ai";
    
    // Ensure LaunchList script is loaded and initialized
    const ensureLaunchListLoaded = () => {
      if (window.launchlist) {
        window.launchlist.reset?.();
      } else {
        // If for some reason the script didn't load properly, try to load it again
        const script = document.createElement('script');
        script.src = 'https://getlaunchlist.com/js/widget.js';
        script.defer = true;
        document.head.appendChild(script);
      }
    };
    
    ensureLaunchListLoaded();
    
    // Clean up function for when component unmounts
    return () => {
      // Any cleanup if needed
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      <SecurityBanner />
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center w-full py-10 px-4 md:py-20 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="w-full max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-blue-500">
            {language === 'de' 
              ? "Erhalten Sie frühzeitigen Zugang zu EmailManager.ai" 
              : "Get Early Access to EmailManager.ai"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'de'
              ? "Gehören Sie zu den Ersten, die unseren revolutionären KI-E-Mail-Assistenten für Outlook erleben."
              : "Be among the first to experience our revolutionary AI email assistant for Outlook."}
          </p>
          <p className="mt-4 text-md text-green-700 max-w-2xl mx-auto">
            {t('landing.emailDraft.description')}
          </p>
        </div>
        
        {/* Step 2: LaunchList Widget prominently displayed */}
        <div className="w-full max-w-3xl mx-auto mb-16 text-center p-8 bg-white/80 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6">
            {language === 'de' ? "Treten Sie unserer Warteliste bei" : "Join Our Waitlist"}
          </h2>
          <div className="launchlist-widget mx-auto" data-key-id="9RvHhf" data-height="180px"></div>
        </div>
        
        <SavingsHighlightTiles />
        <FeaturesSection />
      </main>
      
      <Footer />
    </div>
  );
}
