
export interface CustomerGroup {
  id: string;
  name: string;
  prompt: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  tel: string;
  subscription: string;
  revenuePerMonth: number;
  totalRevenue: number;
  signupDate: string;
  isEditing?: boolean;
}
