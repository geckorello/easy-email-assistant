
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { IndustrySelect } from '@/components/ui/IndustrySelect';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { IndustryCustomizeDialog } from './IndustryCustomizeDialog';
import { IndustryStatusDisplay } from './IndustryStatusDisplay';

interface PromptTemplates {
  [key: string]: string;
}

const PROMPT_TEMPLATES: PromptTemplates = {
  'property-managers': 'Check if this is an email from a tenant reporting an issue with their property. If so, prioritize maintenance requests related to essential services like heating, water, or security. For non-urgent matters, suggest scheduling a visit. Always maintain a professional and helpful tone with property-related matters.',
  'real-estate': 'Check if this is an inquiry about property listings, viewings, or purchase information. Respond with accurate details about the property, including size, price, and availability. For viewing requests, suggest available time slots. Maintain a sales-oriented yet professional tone, highlighting key selling points.',
  'generic': 'Analyze this email and provide a concise, helpful response that addresses the key points raised by the sender. Maintain a professional tone while being personable. If there are any specific questions, make sure to answer them directly and provide any necessary information or next steps.'
};

interface IndustrySettingsCardProps {
  selectedIndustry: string;
  onIndustryChange: (industry: string) => void;
}

export function IndustrySettingsCard({ selectedIndustry, onIndustryChange }: IndustrySettingsCardProps) {
  const { t } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogIndustry, setDialogIndustry] = useState(selectedIndustry);
  const [prompt, setPrompt] = useState(PROMPT_TEMPLATES[selectedIndustry] || PROMPT_TEMPLATES['generic']);
  const [formalStyle, setFormalStyle] = useState(true);
  const [friendlyStyle, setFriendlyStyle] = useState(false);
  const [conciseStyle, setConciseStyle] = useState(true);
  const [detailedStyle, setDetailedStyle] = useState(false);

  const handleIndustryChange = (value: string) => {
    onIndustryChange(value);
    setPrompt(PROMPT_TEMPLATES[value] || PROMPT_TEMPLATES['generic']);
  };

  const handleDialogIndustryChange = (value: string) => {
    setDialogIndustry(value);
    setPrompt(PROMPT_TEMPLATES[value] || PROMPT_TEMPLATES['generic']);
  };

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    // Reset dialog state when opening
    if (open) {
      setDialogIndustry(selectedIndustry);
      setPrompt(PROMPT_TEMPLATES[selectedIndustry] || PROMPT_TEMPLATES['generic']);
    }
  };

  const handleSavePrompt = () => {
    // Save selected industry and prompt
    onIndustryChange(dialogIndustry);
    setDialogOpen(false);
  };

  const getIndustryDisplayName = () => {
    switch(selectedIndustry) {
      case 'property-managers':
        return t('settings.industry.propertyManagers');
      case 'real-estate':
        return t('settings.industry.realEstate');
      case 'generic':
      default:
        return t('settings.industry.generic');
    }
  };

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>{t('settings.industry.title')}</CardTitle>
        <Badge 
          variant="secondary" 
          className="absolute top-4 right-4 px-6 py-2.5 text-lg bg-primary/10 text-primary font-medium"
        >
          {getIndustryDisplayName()}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="mb-2">
            <p className="text-sm font-medium mb-2">{t('settings.industry.selected')}</p>
            <IndustrySelect 
              value={selectedIndustry} 
              onChange={handleIndustryChange}
            />
          </div>
          
          {/* Current Prompt Card */}
          <Card className="border-dashed border-gray-300 bg-gray-50/50">
            <CardContent className="p-4">
              <h3 className="text-md font-medium mb-2">{t('templates.currentPrompt')}</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{prompt}</p>
            </CardContent>
          </Card>
          
          <div className="w-full pt-2">
            <IndustryCustomizeDialog
              open={dialogOpen}
              onOpenChange={handleOpenChange}
              selectedIndustry={dialogIndustry}
              onIndustryChange={handleDialogIndustryChange}
              prompt={prompt}
              onPromptChange={setPrompt}
              formalStyle={formalStyle}
              onFormalStyleChange={setFormalStyle}
              friendlyStyle={friendlyStyle}
              onFriendlyStyleChange={setFriendlyStyle}
              conciseStyle={conciseStyle}
              onConciseStyleChange={setConciseStyle}
              detailedStyle={detailedStyle}
              onDetailedStyleChange={setDetailedStyle}
              onSave={handleSavePrompt}
            />
          </div>
        </div>

        <IndustryStatusDisplay selectedIndustry={selectedIndustry} />
      </CardContent>
    </Card>
  );
}
