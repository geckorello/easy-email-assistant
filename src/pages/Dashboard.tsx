
import React, { useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getEmailProcessingStatus } from '@/services/webhooks';
import TrialBanner from '@/components/dashboard/TrialBanner';
import PerformanceOverview from '@/components/dashboard/PerformanceOverview';
import EmailManagement from '@/components/dashboard/EmailManagement';
import NotificationsConnectivity from '@/components/dashboard/NotificationsConnectivity';
import FileManagement from '@/components/dashboard/FileManagement';
import { useLanguage } from '@/context/LanguageContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [processingStatus, setProcessingStatus] = React.useState<{
    active: boolean;
    lastRun: string | null;
  }>({ active: false, lastRun: null });
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const status = await getEmailProcessingStatus();
        setProcessingStatus(status);
      } catch (error) {
        console.error('Failed to get email processing status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      loadData();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  // Static values for the dashboard
  const hoursSaved = 27;
  const ratePerHour = 50;
  const moneySaved = hoursSaved * ratePerHour;
  const satisfactionIncrease = 32;
  const responsesGenerated = 156;
  const averageResponseTime = "30 " + t('dashboard.secondst');

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h1>
            <p className="text-muted-foreground">
              {t('dashboard.welcome')}, {user?.name || 'User'}! {t('dashboard.monitor')}
            </p>
          </div>
          <div className="flex gap-4">
            <TrialBanner />
            <Button onClick={() => navigate('/settings')}>
              {t('dashboard.customize')}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Performance Overview */}
        <PerformanceOverview 
          hoursSaved={hoursSaved} 
          ratePerHour={ratePerHour} 
          moneySaved={moneySaved} 
          satisfactionIncrease={satisfactionIncrease} 
        />

        {/* Email Management */}
        <EmailManagement 
          responsesGenerated={responsesGenerated} 
          hoursSaved={hoursSaved} 
          averageResponseTime={averageResponseTime} 
          processingStatus={processingStatus} 
          setProcessingStatus={setProcessingStatus} 
        />
        
        {/* Notifications & Connectivity */}
        <NotificationsConnectivity />

        {/* File Management */}
        <FileManagement />
      </div>
    </AppLayout>
  );
}
