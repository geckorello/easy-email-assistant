
import React from 'react';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function TestimonialsSection() {
  const { t, language } = useLanguage();
  
  // Select testimonial based on language
  const testimonial = language === 'de' ? {
    quote: t('landing.testimonials.realEstateAgent.quote'),
    author: t('landing.testimonials.realEstateAgent.name'),
    company: t('landing.testimonials.realEstateAgent.title')
  } : {
    quote: t('landing.testimonials.propertyManager.quote'),
    author: t('landing.testimonials.propertyManager.name'),
    company: t('landing.testimonials.propertyManager.title')
  };
  
  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('landing.testimonials.title')}</h2>
        
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-md max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="shrink-0">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                <img 
                  src="/placeholder.svg" 
                  alt={testimonial.author} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="mb-4">
                <Quote className="h-8 w-8 text-primary opacity-50" />
              </div>
              <p className="text-lg md:text-xl font-medium mb-4 text-gray-800">
                {testimonial.quote}
              </p>
              <div className="text-sm md:text-base font-semibold text-gray-700">
                — {testimonial.author}, <span className="text-primary">{testimonial.company}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
