
import React, { useEffect } from 'react';
import { SecurityBanner } from '@/components/landing/SecurityBanner';
import { Header } from '@/components/landing/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { TargetedIndustriesSection } from '@/components/landing/TargetedIndustriesSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { EmailDraftNote } from '@/components/landing/EmailDraftNote';
import { VideoSection } from '@/components/landing/VideoSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { AddonsSection } from '@/components/landing/AddonsSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { Footer } from '@/components/landing/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { SavingsHighlightTiles } from '@/components/landing/SavingsHighlightTiles';

export default function LandingPage() {
  const { language } = useLanguage();

  // Update document language attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      <SecurityBanner />
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center w-full py-10 px-4 md:py-20 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <SavingsHighlightTiles />
        <HeroSection />
        <TargetedIndustriesSection />
        <FeaturesSection />
        <EmailDraftNote />
      </main>
      
      <VideoSection />
      <TestimonialsSection />
      <PricingSection />
      <AddonsSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
