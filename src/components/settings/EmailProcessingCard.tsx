
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function EmailProcessingCard() {
  const [processingDelay, setProcessingDelay] = useState<number>(30);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [autoSend, setAutoSend] = useState<boolean>(false);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState<boolean>(false);
  const { t } = useLanguage();
  
  // Convert minutes to display text
  const getDelayText = (minutes: number): string => {
    if (minutes === 0) return t('settings.email.immediately');
    if (minutes === 1) return "1 minute";
    if (minutes <= 60) return `${minutes} minutes`;
    return `${minutes / 60} ${minutes === 60 ? t('settings.email.hours').slice(0, -1) : t('settings.email.hours')}`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">{t('settings.email.processing')}</CardTitle>
          <CardDescription>
            {t('settings.email.manage')}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-sm font-medium">{t('settings.email.autoProcessing')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('settings.email.processEvery')} {getDelayText(processingDelay)}
              </p>
            </div>
            <Button 
              variant="outline"
              className="bg-white hover:bg-red-50 text-red-600 border-red-200"
              onClick={() => setIsDisabled(!isDisabled)}
            >
              {t('settings.email.disableProcessing')}
            </Button>
          </div>
          
          {showEmergencyAlert && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-3">
              <Bell className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-800">{t('settings.email.emergencyAlert')}</h4>
                <p className="text-sm text-red-700">
                  {t('settings.email.autoSendWarning')}
                </p>
              </div>
            </div>
          )}
          
          <div className="border-t pt-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">{t('settings.email.processingDelay')}</Label>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-muted-foreground mr-3 w-20">
                    {getDelayText(processingDelay)}
                  </span>
                  <div className="flex-1">
                    <Slider
                      defaultValue={[processingDelay]}
                      max={120}
                      step={1}
                      onValueChange={(value) => setProcessingDelay(value[0])}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{t('settings.email.immediately')}</span>
                  <span className="text-xs text-muted-foreground">2 {t('settings.email.hours')}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">{t('settings.email.emailAction')}</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t('settings.email.chooseAction')}
                    </p>
                  </div>
                  <Switch 
                    checked={autoSend} 
                    onCheckedChange={(checked) => {
                      setAutoSend(checked);
                      setShowEmergencyAlert(checked);
                    }}
                  />
                </div>
                <p className="text-sm mt-2">
                  {autoSend ? t('settings.email.autosend') : t('settings.email.createDrafts')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
