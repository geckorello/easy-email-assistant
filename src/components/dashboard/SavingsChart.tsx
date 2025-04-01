
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

interface SavingsChartProps {
  data: {
    month: string;
    monthly: number;
    cumulative: number;
  }[];
}

export function SavingsChart({ data }: SavingsChartProps) {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Savings Overview</h3>
      <div className="h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorMonthly" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} />
            <YAxis tickFormatter={(value) => `€${value}`} tick={{ fontSize: 10 }} tickLine={false} />
            <Tooltip 
              formatter={(value, name) => [`€${value}`, name === 'monthly' ? 'Monthly' : 'Cumulative']}
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
            <Area type="monotone" dataKey="monthly" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorMonthly)" name="Monthly" />
            <Area type="monotone" dataKey="cumulative" stroke="#22C55E" fillOpacity={1} fill="url(#colorCumulative)" name="Cumulative" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
