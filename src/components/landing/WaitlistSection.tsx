
import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Clock, Users } from 'lucide-react';

export function WaitlistSection() {
  const { t } = useLanguage();
  
  // Ensure the LaunchList widget is properly initialized when the component mounts
  useEffect(() => {
    // Reinitialize the LaunchList widget when component mounts
    if (window.launchlist) {
      window.launchlist.reset?.();
    }
  }, []);
  
  return (
    <section className="w-full py-12 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-6">
          {t('landing.waitlist.title')}
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('landing.waitlist.description')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="flex flex-col items-center p-4 bg-white/70 rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="font-semibold mb-2">Early Access</h3>
            <p className="text-sm text-muted-foreground">Be the first to try our AI assistant</p>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-white/70 rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="font-semibold mb-2">Priority Support</h3>
            <p className="text-sm text-muted-foreground">Get dedicated onboarding assistance</p>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-white/70 rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-semibold mb-2">Exclusive Perks</h3>
            <p className="text-sm text-muted-foreground">Special discounts for early adopters</p>
          </div>
        </div>
        
        {/* LaunchList Widget - Prominently displayed in the center */}
        <div className="launchlist-widget mx-auto mb-8" data-key-id="9RvHhf" data-height="180px"></div>
      </div>
    </section>
  );
}
