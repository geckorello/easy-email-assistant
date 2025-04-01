
import React from 'react';
import { CheckCircle2, MessageCircle, Power, XCircle } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { disableEmailProcessing, setupRealTimeProcessing } from '@/services/webhooks';
import { useLanguage } from '@/context/LanguageContext';

interface EmailManagementProps {
  responsesGenerated: number;
  hoursSaved: number;
  averageResponseTime: string;
  processingStatus: {
    active: boolean;
    lastRun: string | null;
  };
  setProcessingStatus: React.Dispatch<React.SetStateAction<{
    active: boolean;
    lastRun: string | null;
  }>>;
}

const EmailManagement: React.FC<EmailManagementProps> = ({
  responsesGenerated,
  hoursSaved,
  averageResponseTime,
  processingStatus,
  setProcessingStatus
}) => {
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const toggleProcessing = async () => {
    try {
      if (processingStatus.active) {
        await disableEmailProcessing();
        setProcessingStatus(prev => ({ ...prev, active: false }));
        toast({
          title: language === 'de' ? "Verarbeitung deaktiviert" : "Processing Disabled",
          description: language === 'de' ? "Die E-Mail-Verarbeitung wurde ausgeschaltet." : "Email processing has been turned off.",
        });
      } else {
        await setupRealTimeProcessing(30);
        setProcessingStatus(prev => ({ ...prev, active: true }));
        toast({
          title: language === 'de' ? "Verarbeitung aktiviert" : "Processing Enabled",
          description: language === 'de' ? "Die E-Mail-Verarbeitung wurde eingeschaltet." : "Email processing has been turned on.",
        });
      }
    } catch (error) {
      console.error('Failed to toggle processing:', error);
      toast({
        title: language === 'de' ? "Aktion fehlgeschlagen" : "Action Failed",
        description: language === 'de' 
          ? "Wir konnten den Verarbeitungsstatus nicht aktualisieren. Bitte versuchen Sie es erneut."
          : "We couldn't update the processing status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return language === 'de' ? 'Nie' : 'Never';
    return new Date(dateString).toLocaleString(language === 'de' ? 'de-DE' : 'en-US');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('dashboard.emailManagement')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title={language === 'de' ? "KI-Antworten" : "AI Responses"}
          value={`${responsesGenerated}`}
          description={
            <div className="bg-green-50 p-3 rounded border border-green-200 mt-2">
              <p className="font-medium text-green-800">
                {language === 'de' 
                  ? `Durchschnittlicher manueller Aufwand pro E-Mail von `
                  : `Average manual effort per email of `}
                <span className="font-bold text-green-700">
                  {language === 'de' ? "48 Sekunden" : "48 seconds"}
                </span>
                {language === 'de'
                  ? " statt 13 Minuten, das spart"
                  : " instead of 13 minutes, saving"}
                <span className="font-bold">
                  {language === 'de' ? " 27 Stunden" : " 27 hours"}
                </span>
                {language === 'de'
                  ? " Arbeit allein in diesem Monat!"
                  : " of work only this month!"}
              </p>
            </div>
          }
          icon={<MessageCircle className="text-green-500" />}
          trend={{ 
            value: language === 'de' ? '68% diesen Monat' : '68% this month', 
            positive: true 
          }}
        />
        <StatsCard
          title={language === 'de' ? "Verarbeitungsstatus" : "Processing Status"}
          value={processingStatus.active 
            ? (language === 'de' ? 'Aktiv' : 'Active') 
            : (language === 'de' ? 'Inaktiv' : 'Inactive')}
          description={`${language === 'de' ? 'Letzte Ausführung' : 'Last run'}: ${formatDate(processingStatus.lastRun)}`}
          icon={processingStatus.active ? 
            <CheckCircle2 className="text-green-500" /> : 
            <XCircle className="text-red-500" />
          }
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={toggleProcessing}
              className="h-8 rounded-md"
            >
              <Power className={`h-4 w-4 mr-2 ${processingStatus.active ? 'text-red-500' : ''}`} />
              {processingStatus.active 
                ? (language === 'de' ? 'Ausschalten' : 'Turn Off') 
                : (language === 'de' ? 'Einschalten' : 'Turn On')}
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default EmailManagement;
