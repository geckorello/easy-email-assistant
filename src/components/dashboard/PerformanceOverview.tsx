
import React from 'react';
import { Clock, DollarSign, ThumbsUp, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { useLanguage } from '@/context/LanguageContext';

interface PerformanceOverviewProps {
  hoursSaved: number;
  ratePerHour: number;
  moneySaved: number;
  satisfactionIncrease: number;
}

const PerformanceOverview: React.FC<PerformanceOverviewProps> = ({
  hoursSaved,
  ratePerHour,
  moneySaved,
  satisfactionIncrease
}) => {
  const { t, language } = useLanguage();
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('dashboard.performance')}</h2>
      <StatsCard 
        title={language === 'de' ? "Gesamte Produktivitätsauswirkung" : "Total Productivity Impact"}
        value={`€${moneySaved.toLocaleString(language === 'de' ? 'de-DE' : 'en-US')}`}
        description={
          <div className="bg-blue-50 p-4 rounded border border-blue-200 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-2 bg-white rounded-lg shadow-sm">
                <Clock className="h-6 w-6 text-blue-500 mb-1" />
                <p className="text-sm font-medium text-gray-600">{t('dashboard.hoursSaved')}</p>
                <p className="text-lg font-bold text-blue-700">{hoursSaved} {language === 'de' ? 'Stunden' : 'hours'}</p>
              </div>
              <div className="flex flex-col items-center p-2 bg-white rounded-lg shadow-sm">
                <DollarSign className="h-6 w-6 text-green-500 mb-1" />
                <p className="text-sm font-medium text-gray-600">{t('dashboard.monetaryValue')}</p>
                <p className="text-lg font-bold text-green-700">€{moneySaved.toLocaleString(language === 'de' ? 'de-DE' : 'en-US')}</p>
              </div>
              <div className="flex flex-col items-center p-2 bg-white rounded-lg shadow-sm">
                <ThumbsUp className="h-6 w-6 text-purple-500 mb-1" />
                <p className="text-sm font-medium text-gray-600">{t('dashboard.satisfactionIncrease')}</p>
                <p className="text-lg font-bold text-purple-700">{satisfactionIncrease}%</p>
              </div>
            </div>
          </div>
        }
        icon={<TrendingUp className="text-blue-500" />}
        className="w-full"
      />
    </div>
  );
};

export default PerformanceOverview;
