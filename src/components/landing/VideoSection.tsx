
import React from 'react';
import { PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export function VideoSection() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{t('landing.video.title')}</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('landing.video.description')}
        </p>
        
        <div className="relative bg-black aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="lg" className="rounded-full p-8 bg-white/10 backdrop-blur-sm hover:bg-white/20">
              <PlayCircle className="h-12 w-12 text-white" />
            </Button>
          </div>
          <img 
            src="/placeholder.svg"
            alt="Video thumbnail showing MailAssist setup process"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{t('landing.video.step1')}</h3>
            <p className="text-muted-foreground">{t('landing.video.step1Desc')}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{t('landing.video.step2')}</h3>
            <p className="text-muted-foreground">{t('landing.video.step2Desc')}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{t('landing.video.step3')}</h3>
            <p className="text-muted-foreground">{t('landing.video.step3Desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
