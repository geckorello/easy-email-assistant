import { toast } from '@/hooks/use-toast';
import axios from 'axios';

// Constants for OAuth configuration
const CLIENT_ID = import.meta.env.VITE_OUTLOOK_CLIENT_ID || ''; // Use env variable or fallback
const REDIRECT_URI = `${window.location.origin}/auth/callback`;
const AUTHORITY = import.meta.env.VITE_OUTLOOK_AUTHORITY || '';
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || '';
// const SCOPE = 'openid profile email offline_access Mail.Read Mail.Send';
const SCOPE = 'User.read Mail.ReadWrite MailboxSettings.Read Mail.send MailboxFolder.Read';

export interface OutlookAPIResponse {
  tokens: TokenResponse,
  user: User
}
// Define token interface
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  id_token: string;
}

// Define user interface
export interface User {
  id: string;
  name: string | null;
  email: string | null;
  photoUrl: string | null;
  industry?: string;
  alreadyExists: boolean;
}

// User update interface
export interface UserUpdateData {
  email?: string;
  name?: string;
  industry?: string;
}

// Storage keys
const TOKEN_STORAGE_KEY = 'outlook_tokens';
const USER_STORAGE_KEY = 'user_data';

// Get authorization URL
export function getAuthorizationUrl(): string {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPE,
    response_mode: 'query',
  });
  
  return `${AUTHORITY}/oauth2/v2.0/authorize?${params.toString()}`;
}

// Exchange authorization code for tokens
export async function exchangeCodeForTokens(code: string): Promise<OutlookAPIResponse> {
  try {
    const tokenResponse = await axios.get(
      `${BACKEND_API_URL}/auth/callback?code=${code}`,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    console.log('response', tokenResponse)

    // Save tokens securely
    saveTokens(tokenResponse.data.tokens);
    saveUser(tokenResponse.data.user);

    return tokenResponse.data;
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    throw error;
  }
}

export async function updateUserInfo(data: UserUpdateData): Promise<void> {
  try {
    const response = await axios.post(
      `${BACKEND_API_URL}/auth/update-user`,
      data,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log('response', response.data);
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
}

// Refresh tokens
export async function refreshTokens(): Promise<TokenResponse | null> {
  try {
    const tokens = getTokens();
    if (!tokens?.refresh_token) {
      throw new Error('No refresh token available');
    }
    
    // In a real app, this would be a server-side call to protect your client secret
    // Here we're simulating the response for demo purposes
    console.log('Refreshing tokens...');
    
    // Mock refreshed token response
    const expiresIn = 3600;
    const refreshedTokens: TokenResponse = {
      ...tokens,
      access_token: 'mock-refreshed-access-token',
      expires_in: expiresIn,
      expires_at: Date.now() + expiresIn * 1000,
    };
    
    saveTokens(refreshedTokens);
    return refreshedTokens;
  } catch (error) {
    console.error('Error refreshing tokens:', error);
    return null;
  }
}

// Get tokens from storage
export function getTokens(): TokenResponse | null {
  const tokensJson = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!tokensJson) return null;
  
  try {
    return JSON.parse(tokensJson) as TokenResponse;
  } catch {
    return null;
  }
}

// Save tokens to storage
export function saveTokens(tokens: TokenResponse): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
}

// Clear tokens from storage
export function clearTokens(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

// Get user from storage
export function getUser(): User | null {
  const userJson = localStorage.getItem(USER_STORAGE_KEY);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch {
    return null;
  }
}

// Save user to storage
export function saveUser(user: User): void {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

// Clear user from storage
export function clearUser(): void {
  localStorage.removeItem(USER_STORAGE_KEY);
}

// Get user info from token
export async function getUserInfoFromToken(tokens: OutlookAPIResponse): Promise<User> {
  // In a real app, you would decode the JWT or call the Microsoft Graph API
  // Here we're creating mock user data for the demo
  
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: 'user-1234',
    name: 'Demo User',
    email: 'demo.user@example.com',
    photoUrl: null,
    alreadyExists: false,
  };
}

// Login with redirect
export function loginWithRedirect(): void {
  window.location.href = getAuthorizationUrl();
}

// Logout
export function logout(): void {
  clearTokens();
  clearUser();
  
  // In a production app, you might want to redirect to Microsoft's logout URL too
  // window.location.href = `${AUTHORITY}/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(window.location.origin)}`;
}

// Check if the tokens are expired
export function isTokenExpired(): boolean {
  const tokens = getTokens();
  if (!tokens) return true;
  
  // Add a 5-minute buffer before expiration
  const expiryBuffer = 5 * 60 * 1000;
  return Date.now() + expiryBuffer >= tokens.expires_at;
}

// Get a valid access token, refreshing if necessary
export async function getValidAccessToken(): Promise<string | null> {
  try {
    let tokens = getTokens();
    
    if (!tokens) {
      return null;
    }
    
    if (isTokenExpired()) {
      tokens = await refreshTokens();
      if (!tokens) {
        throw new Error('Failed to refresh tokens');
      }
    }
    
    return tokens.access_token;
  } catch (error) {
    console.error('Error getting valid access token:', error);
    toast({
      title: "Authentication Error",
      description: "Your session has expired. Please sign in again.",
      variant: "destructive",
    });
    logout();
    return null;
  }
}
