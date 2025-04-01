
import React, { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { IndustrySelect } from '@/components/ui/IndustrySelect';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { getUser, User } from '@/services/auth';

export default function SignupPage() {
  const { t } = useLanguage();
  const { isAuthenticating, updateUserOnOnBoarding } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [industry, setIndustry] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    industry: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors = {
      name: !name,
      industry: !industry
    };

    setErrors(newErrors);

    // If form is valid, proceed with signup
    if (!Object.values(newErrors).some(error => error)) {
      try {
        // Proceed with Outlook authentication
        await updateUserOnOnBoarding(email, name, industry);
      } catch (error) {
        console.error('Signup error:', error);
      }
    }
  };

    useEffect(() => {
      const storedUser = getUser();
  
      if (storedUser) {
        setName(storedUser.name);
        setEmail(storedUser.email);
      }
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <header className="w-full py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo onClick={() => navigate('/')} className="cursor-pointer" />
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {/* <Button variant="outline" onClick={() => navigate('/login')}>
              {t('header.loginToAccount')}
            </Button> */}
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            {/* <CardTitle>{t('signup.title')}</CardTitle>
            <CardDescription>{t('signup.description')}</CardDescription> */}
            <CardTitle>On Boarding</CardTitle>
            {/* <CardDescription>{t('signup.description')}</CardDescription> */}
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder={t('signup.emailPlaceholder')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{t('signup.emailRequired')}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('signup.emailLabel')}*</Label>
                <Input
                readOnly
                  id="email"
                  type="email"
                  placeholder={t('signup.emailPlaceholder')}
                  value={email}
                />
              </div>

              <IndustrySelect
                value={industry}
                onChange={setIndustry}
                error={errors.industry}
              />
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={isAuthenticating}
              >
                {isAuthenticating ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>{t('auth.connecting')}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>Update Info</span>
                    {/* <span>{t('signup.connectOutlook')}</span> */}
                  </div>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
