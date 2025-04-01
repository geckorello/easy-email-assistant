
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { LayoutDashboard, Settings, Shield, Tag, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Assuming admin users have an isAdmin property or similar
  // For demo, we'll show the admin link for all users, but you can add proper permission checks
  const isAdmin = true;

  const menuItems = [
    {
      title: t('dashboard.navigation.dashboard'),
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      title: t('dashboard.navigation.templates'),
      icon: FileText,
      path: '/templates',
    },
    {
      title: t('dashboard.navigation.subscription'),
      icon: Tag,
      path: '/subscription',
    },
    {
      title: t('dashboard.navigation.settings'),
      icon: Settings,
      path: '/settings',
    },
  ];

  // Add admin link if user is admin
  if (isAdmin) {
    menuItems.push({
      title: t('dashboard.navigation.admin'),
      icon: Shield,
      path: '/admin',
    });
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="pt-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} className={cn({ 'text-primary': isActive(item.path) })}>
                  <SidebarMenuButton 
                    className={cn("transition-colors", { 'bg-primary/10': isActive(item.path) })}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className={cn("mr-2 h-5 w-5", { 'text-primary': isActive(item.path) })} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <div className="rounded-lg bg-sidebar-accent p-4">
            <p className="text-sm font-medium mb-2">{t('dashboard.help.title')}</p>
            <p className="text-xs text-muted-foreground mb-3">
              {t('dashboard.help.description')}
            </p>
            <Button variant="outline" size="sm" className="w-full">
              {t('dashboard.help.contactSupport')}
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
