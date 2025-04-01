
import React from 'react';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';

export default function ImpressumPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow flex flex-col w-full py-10 px-4 md:py-20 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="prose max-w-none dark:prose-invert">
          <h1>Impressum</h1>
          
          <p>Dr. Georg Singer</p>
          <p>Hofkirchnergasse 7</p>
          <p>3400 Klosterneuburg</p>
          <p>georg.singer@gmail.com</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
