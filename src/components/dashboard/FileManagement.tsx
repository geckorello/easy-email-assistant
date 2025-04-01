
import React from 'react';
import { AlertTriangle, Server, XCircle } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const FileManagement: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('dashboard.fileManagement')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title={language === 'de' ? 'KI-Dokumentenanalyse' : 'AI Document Analysis'}
          value={language === 'de' ? 'Demnächst verfügbar' : 'Coming Soon'}
          description={
            <div className="bg-blue-50 p-3 rounded border border-blue-200 mt-2">
              <p className="font-medium text-blue-800">
                {language === 'de' ? 
                  'Analysieren Sie Anhänge automatisch, um wichtige Informationen zu extrahieren und ' : 
                  'Auto-analyze attachments to extract key information and '}
                <span className="font-bold text-blue-700">
                  {language === 'de' ? 
                    'sparen Sie mehr als 15 Stunden' : 
                    'save 15+ hours'}
                </span>
                {language === 'de' ? 
                  ' pro Woche bei der Dokumentenverarbeitung!' : 
                  ' per week on document processing!'}
              </p>
            </div>
          }
          icon={<AlertTriangle className="text-amber-500" />}
          trend={{ 
            value: language === 'de' ? 'In Entwicklung' : 'In development', 
            positive: true 
          }}
        />
        
        <StatsCard
          title={language === 'de' ? 'Dateiserver' : 'Files Server'}
          value={language === 'de' ? 'Nicht verbunden' : 'Not Connected'}
          description={
            <div className="bg-amber-50 p-3 rounded border border-amber-200 mt-2">
              <p className="font-medium text-amber-800">
                {language === 'de' ? 
                  'Durch die Verbindung mit Ihrem Dateiserver könnten Sie ' : 
                  'By connecting your file server, you could '}
                <span className="font-bold text-amber-700">
                  {language === 'de' ? 
                    'jährlich Tausende Euro sparen' : 
                    'save thousands of euros annually'}
                </span>
                {language === 'de' ? 
                  ' und ' : 
                  ' and '}
                <span className="font-bold">
                  {language === 'de' ? 
                    'die Arbeitsbelastung um bis zu 40% reduzieren' : 
                    'reduce workload by up to 40%'}
                </span>. 
                <span className="block mt-1 font-bold text-amber-900">
                  {language === 'de' ? 
                    'Beginnen Sie noch heute, Geld zu sparen!' : 
                    'Start saving money today!'}
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
              onClick={() => navigate('/settings#file-server')}
            >
              <Server className="h-4 w-4 mr-2 text-amber-500" />
              {t('dashboard.connect')}
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default FileManagement;
