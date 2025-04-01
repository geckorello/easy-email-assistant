import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { updateEmailPreferences } from '@/services/webhooks';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AccountInfoCard } from '@/components/settings/AccountInfoCard';
import { EmailProcessingCard } from '@/components/settings/EmailProcessingCard';
import { AutoReplySignaturesCard } from '@/components/settings/AutoReplySignaturesCard';
import { SmsNotificationsCard } from '@/components/settings/SmsNotificationsCard';
import { FileServerCard } from '@/components/settings/FileServerCard';
import { EmailToTaskCard } from '@/components/settings/EmailToTaskCard';
import { LlmApiKeyCard } from '@/components/settings/LlmApiKeyCard';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { getUser } from '@/services/auth';
import { SettingsPageSkeleton } from '@/components/ui/skeleton-loader';
import { Loader2 } from 'lucide-react';

interface EmailPreferences {
  processingDelay: number;
  templates: any[];
  activeSignature?: string;
  returnDate?: string;
  mobileNumber?: string;
  smsNotificationsEnabled?: boolean;
  otherSettings?: any;
  industry?: string;
}

export default function Settings() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user, isLoading: isAuthLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [industry, setIndustry] = useState(user?.industry || 'generic');
  
  const [selectedSignature, setSelectedSignature] = useState<'standard' | 'sickLeave' | 'holiday'>('standard');
  const [returnDate, setReturnDate] = useState<string>('');
  const [signatures, setSignatures] = useState([
    {
      type: 'standard',
      content: 'Thank you for your email. I will respond as soon as possible.\n\nBest regards,\n[Your Name]'
    },
    {
      type: 'sickLeave',
      content: 'Thank you for your email. I am currently on sick leave and will respond upon my return.\n\nBest regards,\n[Your Name]'
    },
    {
      type: 'holiday',
      content: 'Thank you for your email. I am currently on holiday and will return on [RETURN_DATE]. I will respond to your email after my return.\n\nBest regards,\n[Your Name]'
    }
  ]);
  
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [smsNotificationsEnabled, setSmsNotificationsEnabled] = useState(false);
  const [urgentEmailPrompt, setUrgentEmailPrompt] = useState<string>('');

  useEffect(() => {
    if (!isAuthLoading) {
      if (!user?.industry && user?.id) {
        const storedUser = getUser();
        if (storedUser?.industry) {
          setIndustry(storedUser.industry);
        }
      } else if (user?.industry) {
        setIndustry(user.industry);
      }
      
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  }, [user, isAuthLoading]);

  const handleSaveSettings = async () => {
    try {
      setIsSaving(true);
      
      let selectedSignatureContent = signatures.find(sig => sig.type === selectedSignature)?.content || '';
      
      if (selectedSignature === 'holiday' && returnDate) {
        selectedSignatureContent = selectedSignatureContent.replace('[RETURN_DATE]', returnDate);
      }
      
      const preferences: EmailPreferences = {
        processingDelay: 30,
        templates: signatures,
        activeSignature: selectedSignature,
        returnDate: selectedSignature === 'holiday' ? returnDate : undefined,
        mobileNumber: smsNotificationsEnabled ? mobileNumber : undefined,
        smsNotificationsEnabled,
        otherSettings: urgentEmailPrompt,
        industry: industry
      };
      
      await updateEmailPreferences(preferences);
      
      toast({
        title: "Settings Updated",
        description: "Your email processing settings have been updated.",
      });
    } catch (error) {
      console.error('Failed to update settings:', error);
      toast({
        title: "Update Failed",
        description: "We couldn't update your settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 transition-all duration-300" id="settings">
        {isLoading || isAuthLoading ? (
          <SettingsPageSkeleton />
        ) : (
          <div className="animate-content-fade">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t('settings.title')}</h1>
              <p className="text-muted-foreground">
                {t('settings.configure')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <AccountInfoCard />
              <div className="space-y-6">
                <SmsNotificationsCard />
                <EmailToTaskCard />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <EmailProcessingCard />
              <FileServerCard />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <LlmApiKeyCard />
              <AutoReplySignaturesCard />
            </div>

            <Button 
              onClick={handleSaveSettings} 
              disabled={isSaving}
              className="mt-6"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('common.saving')}
                </>
              ) : (
                t('settings.saveChanges')
              )}
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
