
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/LanguageContext';

type SignatureType = 'standard' | 'sickLeave' | 'holiday';

interface SignatureTemplate {
  type: SignatureType;
  content: string;
}

export function AutoReplySignaturesCard() {
  const { t } = useLanguage();
  const [selectedSignature, setSelectedSignature] = useState<SignatureType>('standard');
  const [returnDate, setReturnDate] = useState<string>('');
  const [signatures, setSignatures] = useState<SignatureTemplate[]>([
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

  const handleSignatureChange = (value: SignatureType) => {
    setSelectedSignature(value);
  };

  const updateSignatureContent = (type: SignatureType, content: string) => {
    setSignatures(prev => 
      prev.map(sig => sig.type === type ? { ...sig, content } : sig)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.autoReply.signatures')}</CardTitle>
        <CardDescription>
          {t('settings.autoReply.select')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup 
          value={selectedSignature} 
          onValueChange={(value) => handleSignatureChange(value as SignatureType)}
          className="space-y-3"
        >
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="standard" id="standard" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="standard" className="font-medium">{t('settings.autoReply.standard')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('settings.autoReply.standardSignature')}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="sickLeave" id="sickLeave" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="sickLeave" className="font-medium">{t('settings.autoReply.sickLeave')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('settings.autoReply.sickLeaveDesc')}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="holiday" id="holiday" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="holiday" className="font-medium">{t('settings.autoReply.holiday')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('settings.autoReply.holidayDesc')}
              </p>
            </div>
          </div>
        </RadioGroup>

        {selectedSignature === 'holiday' && (
          <div className="space-y-2 pt-2">
            <Label htmlFor="returnDate">{t('settings.autoReply.returnDate')}</Label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        )}

        <div className="space-y-2 pt-2">
          <Label htmlFor="signatureText">{t('settings.autoReply.signatureText')}</Label>
          <Textarea
            id="signatureText"
            value={signatures.find(sig => sig.type === selectedSignature)?.content || ''}
            onChange={(e) => updateSignatureContent(selectedSignature, e.target.value)}
            className="min-h-32"
            placeholder={t('settings.autoReply.placeholder')}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {selectedSignature === 'holiday' && t('settings.autoReply.returnDateFormat')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
