
import React from 'react';
import { SecurityBanner } from '@/components/landing/SecurityBanner';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, DollarSign, Users, Award } from 'lucide-react';

export default function AffiliatePage() {
  const { t, language } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      <SecurityBanner />
      <Header />
      <main className="flex-grow w-full py-16 px-4 space-y-16 max-w-7xl mx-auto">
        {/* Hero section */}
        <section className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {language === 'de' ? 'Werde ein Affiliate-Partner' : 'Become an Affiliate Partner'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'de' 
              ? 'Verdiene Geld, indem du unsere Lösung empfiehlst. Unser Affiliate-Programm bietet großzügige Provisionen und attraktive Bedingungen.' 
              : 'Earn money by recommending our solution. Our affiliate program offers generous commissions and attractive conditions.'}
          </p>
          <div className="pt-4">
            <Button size="lg" className="rounded-full">
              {language === 'de' ? 'Jetzt anmelden' : 'Sign up now'}
            </Button>
          </div>
        </section>
        
        {/* How it works */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">
            {language === 'de' ? 'So funktioniert es' : 'How it works'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6 bg-card shadow-sm hover:shadow transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {language === 'de' ? 'Registriere dich' : 'Sign up'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'de' 
                  ? 'Erstelle dein Affiliate-Konto und erhalte Zugang zu deinem persönlichen Dashboard.' 
                  : 'Create your affiliate account and get access to your personal dashboard.'}
              </p>
            </div>
            <div className="border rounded-lg p-6 bg-card shadow-sm hover:shadow transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {language === 'de' ? 'Teile deinen Link' : 'Share your link'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'de' 
                  ? 'Teile deinen einzigartigen Affiliate-Link mit deinem Netzwerk über Social Media, E-Mail oder deinen Blog.' 
                  : 'Share your unique affiliate link with your network via social media, email, or your blog.'}
              </p>
            </div>
            <div className="border rounded-lg p-6 bg-card shadow-sm hover:shadow transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {language === 'de' ? 'Verdiene Provisionen' : 'Earn commissions'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'de' 
                  ? 'Erhalte attraktive Provisionen für jeden Kunden, der über deinen Link ein Abonnement abschließt.' 
                  : 'Receive attractive commissions for every customer who subscribes through your link.'}
              </p>
            </div>
          </div>
        </section>
        
        {/* Commission plans */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">
            {language === 'de' ? 'Unsere Provisionspläne' : 'Our Commission Plans'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6 bg-card hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-semibold mb-4">
                {language === 'de' ? 'Standard-Plan' : 'Standard Plan'}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">20%</span>
                <span className="text-muted-foreground ml-2">
                  {language === 'de' ? 'Provision' : 'commission'}
                </span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                    {language === 'de' ? 'Für alle Neukunden' : 'For all new customers'}
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                    {language === 'de' ? '30-Tage Cookie-Laufzeit' : '30-day cookie duration'}
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                    {language === 'de' ? 'Monatliche Auszahlungen' : 'Monthly payouts'}
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-6 bg-card relative shadow-md hover:border-primary/50 transition-colors">
              <div className="absolute -top-3 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                {language === 'de' ? 'Beliebt' : 'Popular'}
              </div>
              <h3 className="text-xl font-semibold mb-4">
                {language === 'de' ? 'Premium-Plan' : 'Premium Plan'}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">30%</span>
                <span className="text-muted-foreground ml-2">
                  {language === 'de' ? 'Provision' : 'commission'}
                </span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                    {language === 'de' ? 'Für alle Neukunden' : 'For all new customers'}
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                    {language === 'de' ? '60-Tage Cookie-Laufzeit' : '60-day cookie duration'}
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                    {language === 'de' ? 'Monatliche Auszahlungen' : 'Monthly payouts'}
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                    {language === 'de' ? 'Prioritäts-Support' : 'Priority support'}
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-6 bg-card hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-semibold mb-4">
                {language === 'de' ? 'Partner-Plan' : 'Partner Plan'}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">40%</span>
                <span className="text-muted-foreground ml-2">
                  {language === 'de' ? 'Provision' : 'commission'}
                </span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                    {language === 'de' ? 'Für alle Neukunden' : 'For all new customers'}
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                    {language === 'de' ? '90-Tage Cookie-Laufzeit' : '90-day cookie duration'}
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                    {language === 'de' ? 'Monatliche Auszahlungen' : 'Monthly payouts'}
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                    {language === 'de' ? 'Prioritäts-Support' : 'Priority support'}
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                    {language === 'de' ? 'Personalisierte Marketingmaterialien' : 'Custom marketing materials'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">
            {language === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {language === 'de' ? 'Wer kann Affiliate werden?' : 'Who can become an affiliate?'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'de' 
                  ? 'Jeder kann sich für unser Affiliate-Programm anmelden. Es ist besonders geeignet für Blogger, Influencer, Berater und Unternehmen im Bereich Marketing, Vertrieb oder Kundenservice.' 
                  : 'Anyone can sign up for our affiliate program. It is especially suitable for bloggers, influencers, consultants, and businesses in marketing, sales, or customer service.'}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {language === 'de' ? 'Wie werde ich bezahlt?' : 'How do I get paid?'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'de' 
                  ? 'Wir zahlen Provisionen monatlich per PayPal oder Banküberweisung aus. Der Mindestauszahlungsbetrag beträgt 50€.' 
                  : 'We pay commissions monthly via PayPal or bank transfer. The minimum payout amount is €50.'}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {language === 'de' ? 'Wie lange ist die Cookie-Laufzeit?' : 'How long is the cookie duration?'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'de' 
                  ? 'Je nach gewähltem Plan beträgt die Cookie-Laufzeit zwischen 30 und 90 Tagen. Das bedeutet, dass du eine Provision erhältst, wenn ein Benutzer innerhalb dieses Zeitraums nach dem Klick auf deinen Link ein Abonnement abschließt.' 
                  : 'Depending on the plan chosen, the cookie duration is between 30 and 90 days. This means you receive a commission if a user subscribes within this period after clicking your link.'}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {language === 'de' ? 'Gibt es Materialien für meine Promotion?' : 'Are there materials for my promotion?'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'de' 
                  ? 'Ja, wir stellen dir verschiedene Marketingmaterialien wie Banner, Textvorlagen und Produktbilder zur Verfügung, die du für deine Promotion nutzen kannst.' 
                  : 'Yes, we provide various marketing materials such as banners, text templates, and product images that you can use for your promotion.'}
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="text-center bg-muted p-10 rounded-lg space-y-6">
          <h2 className="text-3xl font-bold">
            {language === 'de' ? 'Bereit, Partner zu werden?' : 'Ready to become a partner?'}
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            {language === 'de' 
              ? 'Starte heute und beginne, attraktive Provisionen zu verdienen, indem du unsere Lösung empfiehlst.' 
              : 'Start today and begin earning attractive commissions by recommending our solution.'}
          </p>
          <Button size="lg" className="rounded-full mt-4">
            {language === 'de' ? 'Jetzt als Affiliate registrieren' : 'Register as an affiliate now'}
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
