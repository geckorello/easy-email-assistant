
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AnalyticsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics & Settings</CardTitle>
        <CardDescription>
          View statistics and configure system settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-6 border rounded-md bg-muted/50 flex items-center justify-center">
            <p className="text-muted-foreground text-center">
              Analytics dashboard and additional admin settings will appear here in future updates.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
