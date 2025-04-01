
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

export function LlmApiKeyCard() {
  const [apiKey, setApiKey] = useState<string>('');
  const [provider, setProvider] = useState<string>('openai');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSaveApiKey = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "API Key Saved",
        description: "Your LLM API key has been securely stored.",
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{t('settings.llm.title')}</CardTitle>
        <CardDescription>
          {t('settings.llm.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="llm-provider">{t('settings.llm.provider')}</Label>
          <Select value={provider} onValueChange={setProvider}>
            <SelectTrigger id="llm-provider">
              <SelectValue placeholder={t('settings.llm.selectProvider')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="anthropic">Anthropic</SelectItem>
              <SelectItem value="google">Google AI</SelectItem>
              <SelectItem value="mistral">Mistral AI</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="api-key">{t('settings.llm.apiKey')}</Label>
          <Input
            id="api-key"
            type="password"
            placeholder={t('settings.llm.enterKey')}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            {t('settings.llm.secureStorage')}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSaveApiKey} 
          disabled={isLoading || !apiKey}
          className="w-full"
        >
          {isLoading ? t('settings.llm.saving') : t('settings.llm.saveKey')}
        </Button>
      </CardFooter>
    </Card>
  );
}
