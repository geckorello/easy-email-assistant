
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const { t } = useLanguage();
  
  return (
    <section className="w-full py-16 px-4 bg-background/40">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{t('landing.faq.title')}</h2>
          <p className="text-muted-foreground">{t('landing.faq.description')}</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="privacy">
            <AccordionTrigger className="text-left">{t('landing.faq.privacy.question')}</AccordionTrigger>
            <AccordionContent>{t('landing.faq.privacy.answer')}</AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="password">
            <AccordionTrigger className="text-left">{t('landing.faq.password.question')}</AccordionTrigger>
            <AccordionContent>{t('landing.faq.password.answer')}</AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="responses">
            <AccordionTrigger className="text-left">{t('landing.faq.responses.question')}</AccordionTrigger>
            <AccordionContent>{t('landing.faq.responses.answer')}</AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="cancellation">
            <AccordionTrigger className="text-left">{t('landing.faq.cancellation.question')}</AccordionTrigger>
            <AccordionContent>{t('landing.faq.cancellation.answer')}</AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="dataStorage">
            <AccordionTrigger className="text-left">{t('landing.faq.dataStorage.question')}</AccordionTrigger>
            <AccordionContent>{t('landing.faq.dataStorage.answer')}</AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="setup">
            <AccordionTrigger className="text-left">{t('landing.faq.setup.question')}</AccordionTrigger>
            <AccordionContent>{t('landing.faq.setup.answer')}</AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="support">
            <AccordionTrigger className="text-left">{t('landing.faq.support.question')}</AccordionTrigger>
            <AccordionContent>{t('landing.faq.support.answer')}</AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="startTime">
            <AccordionTrigger className="text-left">{t('landing.faq.startTime.question')}</AccordionTrigger>
            <AccordionContent>{t('landing.faq.startTime.answer')}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
