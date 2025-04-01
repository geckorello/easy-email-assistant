
import React, { useState } from 'react';
import { Customer } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';
import { PencilLine, X, Check } from 'lucide-react';
import { formatCurrency } from '@/utils/adminUtils';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CustomerTableProps {
  initialCustomers: Customer[];
}

export function CustomerTable({ initialCustomers }: CustomerTableProps) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);
  const { toast } = useToast();

  const startEditingCustomer = (customer: Customer) => {
    setCustomers(customers.map(c => ({...c, isEditing: c.id === customer.id})));
    setEditedCustomer({...customer});
  };

  const cancelEditingCustomer = () => {
    setCustomers(customers.map(c => ({...c, isEditing: false})));
    setEditedCustomer(null);
  };

  const saveEditedCustomer = () => {
    if (editedCustomer) {
      setCustomers(customers.map(c => 
        c.id === editedCustomer.id ? {...editedCustomer, isEditing: false} : c
      ));
      setEditedCustomer(null);
      toast({
        title: "Customer Updated",
        description: `Customer "${editedCustomer.name}" has been updated.`,
      });
    }
  };

  const handleEditInputChange = (field: keyof Customer, value: string | number) => {
    if (editedCustomer) {
      setEditedCustomer({...editedCustomer, [field]: value});
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Management</CardTitle>
        <CardDescription>
          View and edit customer information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Customer Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telephone</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Monthly Revenue</TableHead>
                <TableHead>Total Revenue</TableHead>
                <TableHead>Signup Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map(customer => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    {customer.isEditing ? (
                      <Input
                        value={editedCustomer?.name || ''}
                        onChange={(e) => handleEditInputChange('name', e.target.value)}
                        className="max-w-[150px]"
                      />
                    ) : customer.name}
                  </TableCell>
                  <TableCell>
                    {customer.isEditing ? (
                      <Input
                        value={editedCustomer?.email || ''}
                        onChange={(e) => handleEditInputChange('email', e.target.value)}
                        className="max-w-[200px]"
                      />
                    ) : customer.email}
                  </TableCell>
                  <TableCell>
                    {customer.isEditing ? (
                      <Input
                        value={editedCustomer?.tel || ''}
                        onChange={(e) => handleEditInputChange('tel', e.target.value)}
                        className="max-w-[150px]"
                      />
                    ) : customer.tel}
                  </TableCell>
                  <TableCell>
                    {customer.isEditing ? (
                      <select
                        value={editedCustomer?.subscription || ''}
                        onChange={(e) => handleEditInputChange('subscription', e.target.value)}
                        className="p-2 border rounded text-sm w-full max-w-[120px]"
                      >
                        <option value="Basic">Basic</option>
                        <option value="Professional">Professional</option>
                        <option value="Enterprise">Enterprise</option>
                      </select>
                    ) : customer.subscription}
                  </TableCell>
                  <TableCell>
                    {customer.isEditing ? (
                      <Input
                        value={editedCustomer?.revenuePerMonth || 0}
                        onChange={(e) => handleEditInputChange('revenuePerMonth', Number(e.target.value))}
                        type="number"
                        className="max-w-[120px]"
                      />
                    ) : formatCurrency(customer.revenuePerMonth)}
                  </TableCell>
                  <TableCell>
                    {customer.isEditing ? (
                      <Input
                        value={editedCustomer?.totalRevenue || 0}
                        onChange={(e) => handleEditInputChange('totalRevenue', Number(e.target.value))}
                        type="number"
                        className="max-w-[120px]"
                      />
                    ) : formatCurrency(customer.totalRevenue)}
                  </TableCell>
                  <TableCell>
                    {customer.isEditing ? (
                      <Input
                        value={editedCustomer?.signupDate || ''}
                        onChange={(e) => handleEditInputChange('signupDate', e.target.value)}
                        type="date"
                        className="max-w-[120px]"
                      />
                    ) : customer.signupDate}
                  </TableCell>
                  <TableCell className="text-right">
                    {customer.isEditing ? (
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={cancelEditingCustomer}
                          className="mr-1"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={saveEditedCustomer}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditingCustomer(customer)}
                      >
                        <PencilLine className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
