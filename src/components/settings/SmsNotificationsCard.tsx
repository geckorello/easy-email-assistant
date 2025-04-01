
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/LanguageContext';

export function SmsNotificationsCard() {
  const [smsNotificationsEnabled, setSmsNotificationsEnabled] = useState(false);
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [urgentEmailPrompt, setUrgentEmailPrompt] = useState<string>('');
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.smsNotifications.title')}</CardTitle>
        <CardDescription>
          {t('settings.smsNotifications.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="sms-notifications" className="flex flex-col space-y-1">
            <span>{t('settings.smsNotifications.enable')}</span>
            <span className="font-normal text-sm text-muted-foreground">
              {t('settings.smsNotifications.enableDescription')}
            </span>
          </Label>
          <Switch
            id="sms-notifications"
            checked={smsNotificationsEnabled}
            onCheckedChange={setSmsNotificationsEnabled}
          />
        </div>

        {smsNotificationsEnabled && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobile-number">{t('settings.smsNotifications.mobileNumber')}</Label>
              <Input
                id="mobile-number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t('settings.smsNotifications.mobileNumberFormat')}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgent-prompt">{t('settings.smsNotifications.urgentPrompt')}</Label>
              <Textarea
                id="urgent-prompt"
                value={urgentEmailPrompt}
                onChange={(e) => setUrgentEmailPrompt(e.target.value)}
                placeholder="Example: Check if this is an urgent email from a tenant reporting issues with essential building facilities like elevators, heating, or water supply. The email should indicate immediate attention is required due to safety concerns or significant inconvenience to residents."
                className="min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t('settings.smsNotifications.promptDescription')}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
