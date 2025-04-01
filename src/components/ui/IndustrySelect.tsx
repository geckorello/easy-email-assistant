
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/context/LanguageContext';

export interface Industry {
  value: string;
  labelKey: string;
}

interface IndustrySelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  hideLabel?: boolean;
}

export function IndustrySelect({ value, onChange, error, hideLabel = false }: IndustrySelectProps) {
  const { t } = useLanguage();
  
  const industries: Industry[] = [
    { value: "property-managers", labelKey: "settings.industry.propertyManagers" },
    { value: "real-estate", labelKey: "settings.industry.realEstate" },
    { value: "generic", labelKey: "settings.industry.generic" }
  ];
  
  return (
    <div className="space-y-2">
      {!hideLabel && <Label htmlFor="industry">{t('settings.industry.title')}*</Label>}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="industry" className={error ? "border-destructive" : ""}>
          <SelectValue placeholder={t('settings.industry.selected')} />
        </SelectTrigger>
        <SelectContent>
          {industries.map((industry) => (
            <SelectItem key={industry.value} value={industry.value}>
              {t(industry.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-xs text-destructive">{t('settings.industry.title')} {t('common.required')}</p>
      )}
    </div>
  );
}
