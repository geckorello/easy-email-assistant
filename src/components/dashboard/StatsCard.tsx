
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export function StatsCard({ 
  title,
  value,
  description,
  icon,
  trend,
  className,
  action,
}: StatsCardProps & {
  action?: React.ReactNode;
}) {
  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center gap-2">
          {action}
          {icon && <div className="h-5 w-5 text-muted-foreground">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && typeof description === 'string' ? (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        ) : (
          description
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={cn(
                "text-xs font-medium",
                trend.positive ? "text-green-500" : "text-red-500"
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
