
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { useLanguage } from '@/context/LanguageContext';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const { handleAuthCallback, isAuthenticating } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    
    if (error) {
      console.error('OAuth error:', error);
      navigate('/', { replace: true });
      return;
    }
    
    if (!code) {
      navigate('/', { replace: true });
      return;
    }
    
    const processAuth = async () => {
      try {
        await handleAuthCallback(code);
      } catch (err) {
        console.error('Error processing authentication:', err);
        navigate('/', { replace: true });
      }
    };
    
    processAuth();
  }, [searchParams, navigate]);
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-md p-8 space-y-8 text-center">
        <Logo className="mx-auto" />
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{t('auth.authenticating')}</h2>
          <p className="text-muted-foreground">
            {t('auth.wait')}
          </p>
          
          <div className="flex justify-center my-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
