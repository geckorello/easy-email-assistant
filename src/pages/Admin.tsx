
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CustomerTable } from '@/components/admin/CustomerTable';
import { CustomerGroups } from '@/components/admin/CustomerGroups';
import { AnalyticsCard } from '@/components/admin/AnalyticsCard';
import { generateExampleCustomers } from '@/utils/adminUtils';
import { CustomerGroup } from '@/types/admin';

const DEFAULT_CUSTOMER_GROUPS: CustomerGroup[] = [
  { id: '1', name: 'Real estate agents', prompt: 'These are real estate agents who help clients buy, sell, or rent properties. Provide detailed information about properties, emphasize market trends, and respond quickly to inquiries.' },
  { id: '2', name: 'Property managers', prompt: 'These are property managers who oversee residential or commercial properties. Address maintenance requests promptly, provide clear timelines for repairs, and offer detailed explanations about property policies.' },
  { id: '3', name: 'Travel agents', prompt: 'These are travel agents booking vacations and business trips. Highlight amenities, respond with comprehensive itinerary options, and ensure all booking details are accurate and clearly communicated.' },
];

export default function Admin() {
  const exampleCustomers = generateExampleCustomers();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage customer groups, customer data, and AI behavior
          </p>
        </div>

        <CustomerTable initialCustomers={exampleCustomers} />

        <div className="grid md:grid-cols-2 gap-6">
          <CustomerGroups initialGroups={DEFAULT_CUSTOMER_GROUPS} />
          <AnalyticsCard />
        </div>
      </div>
    </AppLayout>
  );
}
