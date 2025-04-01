
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

interface AuthButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export function AuthButton({ className, variant = 'default', size = 'default' }: AuthButtonProps) {
  const { loginWithOutlook, isAuthenticating } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [clientIdConfigured, setClientIdConfigured] = useState(true);
  const { t } = useLanguage();
  
  useEffect(() => {
    // Check if a real client ID is configured
    const hasClientId = import.meta.env.VITE_OUTLOOK_CLIENT_ID && 
      import.meta.env.VITE_OUTLOOK_CLIENT_ID !== 'your-outlook-client-id';
    setClientIdConfigured(!!hasClientId);
  }, []);

  const handleAuth = async () => {
    // if (!clientIdConfigured) {
    //   // For demonstration, navigate to dashboard instead of showing error
    //   navigate('/dashboard');
    //   return;
    // }
    
    // Navigate to the signup page
    navigate('/signup');
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleAuth}
      disabled={isAuthenticating}
      className={cn("relative overflow-hidden transition-all duration-300", className)}
    >
      {isAuthenticating ? (
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>{t('auth.connecting')}</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          {!clientIdConfigured ? <Zap className="h-4 w-4 text-yellow-500" /> : <Mail className="h-5 w-5" />}
          <span>{t('hero.startSavingTime')}</span>
        </div>
      )}
    </Button>
  );
}
