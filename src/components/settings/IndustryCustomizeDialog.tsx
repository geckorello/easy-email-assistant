import React, { useState } from 'react';
import { Sliders } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card } from '@/components/ui/card';

interface IndustryCustomizeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIndustry: string;
  onIndustryChange: (industry: string) => void;
  prompt: string;
  onPromptChange: (prompt: string) => void;
  formalStyle: boolean;
  onFormalStyleChange: (checked: boolean) => void;
  friendlyStyle: boolean;
  onFriendlyStyleChange: (checked: boolean) => void;
  conciseStyle: boolean;
  onConciseStyleChange: (checked: boolean) => void;
  detailedStyle: boolean;
  onDetailedStyleChange: (checked: boolean) => void;
  onSave: () => void;
}

export function IndustryCustomizeDialog({
  open,
  onOpenChange,
  selectedIndustry,
  onIndustryChange,
  prompt,
  onPromptChange,
  formalStyle,
  onFormalStyleChange,
  friendlyStyle,
  onFriendlyStyleChange,
  conciseStyle,
  onConciseStyleChange,
  detailedStyle,
  onDetailedStyleChange,
  onSave
}: IndustryCustomizeDialogProps) {
  const { t } = useLanguage();
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="relative">
        <Popover open={showPrompt} onOpenChange={setShowPrompt}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-1/2"
              onClick={() => setShowPrompt(true)}
            >
              <Sliders className="h-4 w-4 mr-2" />
              {t('settings.industry.customize')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <Card className="p-4">
              <h4 className="font-medium mb-2">{t('settings.industry.currentPrompt')}</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{prompt}</p>
            </Card>
          </PopoverContent>
        </Popover>
        
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="w-1/2 ml-2"
            onClick={() => setShowPrompt(false)}
          >
            <Sliders className="h-4 w-4 mr-2" />
            {t('settings.industry.edit')}
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t('settings.industry.customize')}</DialogTitle>
          <DialogDescription>
            {t('settings.industry.promptHelp')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Industry Selection within Dialog */}
          <div className="space-y-2">
            <Label htmlFor="dialog-industry">{t('settings.industry.selected')}</Label>
            <Select value={selectedIndustry} onValueChange={onIndustryChange}>
              <SelectTrigger id="dialog-industry">
                <SelectValue placeholder={t('settings.industry.selected')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="property-managers">{t('settings.industry.propertyManagers')}</SelectItem>
                <SelectItem value="real-estate">{t('settings.industry.realEstate')}</SelectItem>
                <SelectItem value="generic">{t('settings.industry.generic')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prompt">{t('settings.industry.prompt')}</Label>
            <Textarea 
              id="prompt"
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              rows={8}
              placeholder={t('settings.industry.customPrompt')}
              className="min-h-[160px]"
            />
            <p className="text-xs text-muted-foreground">
              {t('settings.industry.promptHelp')}
            </p>
          </div>
          
          <LanguageStyleOptions
            formalStyle={formalStyle}
            onFormalStyleChange={onFormalStyleChange}
            friendlyStyle={friendlyStyle}
            onFriendlyStyleChange={onFriendlyStyleChange}
            conciseStyle={conciseStyle}
            onConciseStyleChange={onConciseStyleChange}
            detailedStyle={detailedStyle}
            onDetailedStyleChange={onDetailedStyleChange}
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={onSave}>{t('settings.saveChanges')}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface LanguageStyleOptionsProps {
  formalStyle: boolean;
  onFormalStyleChange: (checked: boolean) => void;
  friendlyStyle: boolean;
  onFriendlyStyleChange: (checked: boolean) => void;
  conciseStyle: boolean;
  onConciseStyleChange: (checked: boolean) => void;
  detailedStyle: boolean;
  onDetailedStyleChange: (checked: boolean) => void;
}

function LanguageStyleOptions({
  formalStyle,
  onFormalStyleChange,
  friendlyStyle,
  onFriendlyStyleChange,
  conciseStyle,
  onConciseStyleChange,
  detailedStyle,
  onDetailedStyleChange
}: LanguageStyleOptionsProps) {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-2">
      <Label>{t('settings.industry.languageStyle')}</Label>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="formal"
            checked={formalStyle}
            onCheckedChange={(checked) => onFormalStyleChange(checked === true)}
          />
          <Label htmlFor="formal" className="cursor-pointer">{t('settings.industry.formal')}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="friendly" 
            checked={friendlyStyle}
            onCheckedChange={(checked) => onFriendlyStyleChange(checked === true)}
          />
          <Label htmlFor="friendly" className="cursor-pointer">{t('settings.industry.friendly')}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="concise" 
            checked={conciseStyle}
            onCheckedChange={(checked) => onConciseStyleChange(checked === true)}
          />
          <Label htmlFor="concise" className="cursor-pointer">{t('settings.industry.concise')}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="detailed" 
            checked={detailedStyle}
            onCheckedChange={(checked) => onDetailedStyleChange(checked === true)}
          />
          <Label htmlFor="detailed" className="cursor-pointer">{t('settings.industry.detailed')}</Label>
        </div>
      </div>
    </div>
  );
}
