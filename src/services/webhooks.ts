
import { getValidAccessToken } from './auth';
import { toast } from '@/hooks/use-toast';

// Base URL for your webhook endpoints
const WEBHOOK_BASE_URL = 'https://your-n8n-webhook-url.com';

// Authenticate a webhook request with the current auth token
async function authenticatedRequest(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST',
  body?: any
): Promise<any> {
  try {
    const accessToken = await getValidAccessToken();
    
    if (!accessToken) {
      throw new Error('No valid access token available');
    }
    
    // For demo purposes, we're just logging the request
    console.log(`Making ${method} request to ${endpoint} with token:`, accessToken);
    console.log('Request body:', body);
    
    // In a real app, you would make an actual fetch request
    // return fetch(`${WEBHOOK_BASE_URL}${endpoint}`, {
    //   method,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${accessToken}`
    //   },
    //   body: body ? JSON.stringify(body) : undefined
    // }).then(res => res.json());
    
    // Mock successful response for demo
    return { success: true, message: 'Webhook triggered successfully' };
  } catch (error) {
    console.error('Error in webhook request:', error);
    toast({
      title: "Webhook Error",
      description: "Failed to communicate with the email processing service",
      variant: "destructive",
    });
    throw error;
  }
}

// Trigger initial email processing
export async function triggerInitialProcessing(emailCount: number): Promise<void> {
  await authenticatedRequest('/initial-processing', 'POST', { emailCount });
}

// Update user email processing preferences
export async function updateEmailPreferences(preferences: {
  processingDelay: number;
  templates: any[];
  activeSignature?: string;
  returnDate?: string;
  mobileNumber?: string;
  smsNotificationsEnabled?: boolean;
  otherSettings?: any;
}): Promise<void> {
  await authenticatedRequest('/update-preferences', 'POST', preferences);
}

// Setup real-time email processing
export async function setupRealTimeProcessing(processingDelay: number = 30): Promise<void> {
  await authenticatedRequest('/setup-realtime', 'POST', { processingDelay });
}

// Disable email processing
export async function disableEmailProcessing(): Promise<void> {
  await authenticatedRequest('/disable-processing', 'POST');
}

// Get email processing status
export async function getEmailProcessingStatus(): Promise<{ active: boolean; lastRun: string | null }> {
  // Mock response for demo
  return { active: true, lastRun: new Date().toISOString() };
}

// Update customer group settings
export async function updateCustomerGroup(group: {
  id: string;
  name: string;
  prompt: string;
}): Promise<void> {
  await authenticatedRequest('/update-customer-group', 'POST', group);
}

// Delete a customer group
export async function deleteCustomerGroup(groupId: string): Promise<void> {
  await authenticatedRequest('/delete-customer-group', 'POST', { groupId });
}

// Send test SMS notification
export async function sendTestSms(phoneNumber: string): Promise<void> {
  await authenticatedRequest('/send-test-sms', 'POST', { phoneNumber });
}
