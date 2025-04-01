
import React from 'react';
import { Clock, Phone, XCircle } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const NotificationsConnectivity: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('dashboard.notifications')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title={language === 'de' ? "Kundenantwortzeit" : "Customer Response Time"}
          value={language === 'de' ? "92% Schneller" : "92% Faster"}
          description={
            <div className="bg-purple-50 p-3 rounded border border-purple-200 mt-2">
              <p className="font-medium text-purple-800">
                {language === 'de' ? 
                  'Schnelle Antworten haben die Kundenbindung um ' : 
                  'Quick responses have improved customer retention by '}
                <span className="font-bold text-purple-700">28%</span> 
                {language === 'de' ? 
                  ' im Vergleich zum letzten Quartal verbessert!' : 
                  ' compared to last quarter!'}
              </p>
            </div>
          }
          icon={<Clock className="text-purple-500" />}
          trend={{ 
            value: language === 'de' ? '28% Verbesserung' : '28% improvement', 
            positive: true 
          }}
        />
        
        <StatsCard
          title={language === 'de' ? 'SMS-Benachrichtigungen' : 'SMS Notifications'}
          value={language === 'de' ? 'Nicht verbunden' : 'Not Connected'}
          description={
            <div className="bg-amber-50 p-3 rounded border border-amber-200 mt-2">
              <p className="font-medium text-amber-800">
                {language === 'de' ? 
                  'Durch sofortige Benachrichtigungen über dringende E-Mails ' : 
                  'By being notified about urgent emails immediately, '}
                <span className="font-bold text-amber-700">
                  {language === 'de' ? 
                    'können Sie die Kundenzufriedenheit um 50% steigern!' : 
                    'boost your customer satisfaction by 50%!'}
                </span>
              </p>
            </div>
          }
          icon={<XCircle className="text-red-500" />}
          action={
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-md"
              onClick={() => navigate('/settings#sms-notifications')}
            >
              <Phone className="h-4 w-4 mr-2 text-amber-500" />
              {t('dashboard.connect')}
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default NotificationsConnectivity;
