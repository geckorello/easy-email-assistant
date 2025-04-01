
import React from 'react';
import { Sidebar, SidebarContent, SidebarProvider } from '@/components/ui/sidebar';
import { Navbar } from './Navbar';
import { cn } from '@/lib/utils';
import { AppSidebar } from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function AppLayout({ children, showSidebar = true }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background transition-colors duration-300 overflow-hidden">
        {showSidebar && <AppSidebar />}
        <div className="flex flex-col flex-1 bg-background">
          <Navbar />
          <main className={cn("flex-1 py-6 bg-background", {
            "px-6 md:px-10": !showSidebar,
            "px-4 md:px-8": showSidebar
          })}>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
