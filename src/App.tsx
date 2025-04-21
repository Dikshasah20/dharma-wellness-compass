
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { HealthProfileProvider } from "@/contexts/HealthProfileContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import ChatbotPage from "./pages/ChatbotPage";
import QuotesPage from "./pages/QuotesPage";
import RemindersPage from "./pages/RemindersPage";
import NotFound from "./pages/NotFound";
import { StrictMode } from "react";

const queryClient = new QueryClient();

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <HealthProfileProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/daily-routine" element={<Navigate to="/dashboard?tab=daily-routine" />} />
                <Route path="/diet-plan" element={<Navigate to="/dashboard?tab=diet-plan" />} />
                <Route path="/meditation" element={<Navigate to="/dashboard?tab=meditation" />} />
                <Route path="/yoga" element={<Navigate to="/dashboard?tab=yoga" />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/chatbot" element={<ChatbotPage />} />
                <Route path="/quotes" element={<QuotesPage />} />
                <Route path="/reminders" element={<RemindersPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </HealthProfileProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

export default App;
