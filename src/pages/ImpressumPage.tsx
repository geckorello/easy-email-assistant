
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
          
          <h2>Company Information</h2>
          <p>EmailManager GmbH<br />
          Example Street 123<br />
          10115 Berlin<br />
          Germany</p>
          
          <h2>Contact</h2>
          <p>Phone: +49 123 4567890<br />
          Email: contact@emailmanager.example</p>
          
          <h2>Legal Representatives</h2>
          <p>John Doe, CEO</p>
          
          <h2>Registration</h2>
          <p>Commercial Register: Amtsgericht Berlin-Charlottenburg<br />
          Registration Number: HRB 123456</p>
          
          <h2>VAT ID</h2>
          <p>VAT ID: DE123456789</p>
          
          <h2>Responsible for Content</h2>
          <p>John Doe (Address as above)</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
