
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Mail, CheckSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

export function EmailToTaskCard() {
  const [isEnabled, setIsEnabled] = useState(false);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsEnabled(!isEnabled);
      toast({
        title: isEnabled ? t('settings.emailToTask.disabled') : t('settings.emailToTask.enabled'),
        description: isEnabled 
          ? "Emails will no longer be converted to tasks automatically." 
          : "Your emails will now be automatically converted to tasks.",
      });
    } catch (error) {
      toast({
        title: "Operation Failed",
        description: "We couldn't update your settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>{t('settings.emailToTask.title')}</CardTitle>
          <CardDescription>
            {t('settings.emailToTask.description')}
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {isEnabled ? t('settings.emailToTask.enabled') : t('settings.emailToTask.disabled')}
          </span>
          <Switch
            checked={isEnabled}
            onCheckedChange={handleToggle}
            disabled={isLoading}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md bg-muted p-4">
            <div className="flex items-start space-x-4">
              <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                <CheckSquare className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {t('settings.emailToTask.convert')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('settings.emailToTask.convertDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
