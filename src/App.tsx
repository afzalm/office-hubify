
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Timesheet from "./pages/Timesheet";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import AIAssistant from "./pages/AIAssistant";
import DocumentManager from "./pages/DocumentManager";
import HandyTools from "./pages/HandyTools";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import MailBox from "./pages/MailBox";
import Directory from "./pages/Directory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Dashboard routes - wrapped in AppLayout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/timesheet" element={<Timesheet />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/document-manager" element={<DocumentManager />} />
            <Route path="/handy-tools" element={<HandyTools />} />
            <Route path="/hr" element={<Index />} />
            <Route path="/mailbox" element={<MailBox />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/referrals" element={<Index />} />
            <Route path="/benefits" element={<Index />} />
            <Route path="/settings" element={<Index />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
