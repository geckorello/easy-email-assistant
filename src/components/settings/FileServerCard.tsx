
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Server, Upload, Database, FolderArchive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

export function FileServerCard() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [serverUrl, setServerUrl] = useState<string>('');
  const [serverUsername, setServerUsername] = useState<string>('');
  const [serverPassword, setServerPassword] = useState<string>('');
  const [isConnectingServer, setIsConnectingServer] = useState(false);
  
  const handleConnectFileServer = async () => {
    try {
      setIsConnectingServer(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "File Server Connection",
        description: "Successfully connected to file server.",
      });
    } catch (error) {
      console.error('Failed to connect to file server:', error);
      toast({
        title: "Connection Failed",
        description: "We couldn't connect to your file server. Please check the credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnectingServer(false);
    }
  };
  
  return (
    <Card id="file-server">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" /> 
          {t('settings.fileServer.title')}
        </CardTitle>
        <CardDescription>
          {t('settings.fileServer.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
          <h3 className="text-amber-800 font-semibold mb-2 flex items-center gap-2">
            <Database className="h-5 w-5" /> {t('settings.fileServer.boost')}
          </h3>
          <p className="text-amber-700">
            {t('settings.fileServer.boostDesc')}
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="server-url">{t('settings.fileServer.url')}</Label>
            <Input
              id="server-url"
              placeholder="https://fileserver.example.com"
              value={serverUrl}
              onChange={(e) => setServerUrl(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="server-username">{t('settings.fileServer.username')}</Label>
            <Input
              id="server-username"
              placeholder="admin"
              value={serverUsername}
              onChange={(e) => setServerUsername(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="server-password">{t('settings.fileServer.password')}</Label>
            <Input
              id="server-password"
              type="password"
              placeholder="•••••••••"
              value={serverPassword}
              onChange={(e) => setServerPassword(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Upload className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{t('settings.fileServer.credentials')}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <div className="flex items-center text-sm text-muted-foreground">
          <FolderArchive className="h-4 w-4 mr-2" />
          {t('settings.fileServer.supports')}
        </div>
        <Button 
          onClick={handleConnectFileServer} 
          disabled={isConnectingServer || !serverUrl}
          className="gap-2"
        >
          {isConnectingServer ? 
            <React.Fragment>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> 
              {t('settings.fileServer.connecting')}
            </React.Fragment> : 
            <React.Fragment>
              <Server className="h-4 w-4" />
              {t('settings.fileServer.connect')}
            </React.Fragment>
          }
        </Button>
      </CardFooter>
    </Card>
  );
}
