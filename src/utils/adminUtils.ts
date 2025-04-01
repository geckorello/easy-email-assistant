
import { Customer } from '@/types/admin';

export const generateExampleCustomers = (): Customer[] => {
  const subscriptions = ['Basic', 'Professional', 'Enterprise'];
  const customers: Customer[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const subscription = subscriptions[Math.floor(Math.random() * subscriptions.length)];
    const revenuePerMonth = subscription === 'Basic' ? 249 : 
                           subscription === 'Professional' ? 349 : 449;
    const monthsSubscribed = Math.floor(Math.random() * 24) + 1;
    
    // Generate random signup date from the last 2 years
    const today = new Date();
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(today.getFullYear() - 2);
    const randomDate = new Date(twoYearsAgo.getTime() + Math.random() * (today.getTime() - twoYearsAgo.getTime()));
    const signupDate = randomDate.toISOString().split('T')[0];
    
    customers.push({
      id: i,
      name: `Customer ${i}`,
      email: `customer${i}@example.com`,
      tel: `+1 555-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}-${String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0')}`,
      subscription,
      revenuePerMonth,
      totalRevenue: revenuePerMonth * monthsSubscribed,
      signupDate
    });
  }
  
  return customers;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};
