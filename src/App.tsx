
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Subscription from "./pages/Subscription";
import SignupPage from "./pages/SignupPage";
import AffiliatePage from "./pages/AffiliatePage";
import WaitlistPage from "./pages/WaitlistPage";
import Templates from "./pages/Templates";
import ImpressumPage from "./pages/ImpressumPage";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<WaitlistPage />} />
    <Route path="/landing" element={<LandingPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/templates" element={<Templates />} />
    <Route path="/subscription" element={<Subscription />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/auth/callback" element={<Auth />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/affiliate" element={<AffiliatePage />} />
    <Route path="/waitlist" element={<WaitlistPage />} />
    <Route path="/impressum" element={<ImpressumPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
