
import React from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function AccountInfoCard() {
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{t('settings.account.info')}</CardTitle>
        <CardDescription>
          {t('settings.account.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="animate-pulse space-y-3">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-2/5" />
              </div>
              <div className="flex justify-center mt-2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          ) : user ? (
            <div className="space-y-2 animate-content-fade">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{t('settings.account.email')}</span>
                <span className="text-sm">{user.email || t('settings.account.notConnected')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{t('settings.account.status')}</span>
                <span className="text-sm">
                  <span className="inline-flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  {t('settings.account.connected')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {t('settings.account.permissions')}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="inline h-3 w-3 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <div className="space-y-1">
                          <p className="text-xs font-medium">Mail.Read: {t('settings.account.permissionsDescription.mailRead')}</p>
                          <p className="text-xs font-medium">Mail.Send: {t('settings.account.permissionsDescription.mailSend')}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
                <span className="text-sm">
                  <span>{t('settings.account.permissions.mailRead')}</span>, <span>{t('settings.account.permissions.mailSend')}</span>
                </span>
              </div>
            </div>
          ) : (
            <div className="p-4 border border-dashed rounded-md text-center text-muted-foreground">
              <p>{t('settings.account.notSignedIn')}</p>
            </div>
          )}
          
          <div className="bg-muted/40 p-3 rounded-md">
            <p className="text-xs text-muted-foreground">
              {t('settings.account.token')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
