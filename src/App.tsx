import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { GigProvider } from "@/contexts/GigContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import GigDetail from "./pages/GigDetail";
import CreateGig from "./pages/CreateGig";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import HoverReceiver from "@/visual-edits/VisualEditsMessenger";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <GigProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HoverReceiver />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/gigs" element={<Gigs />} />
              <Route path="/gigs/new" element={<CreateGig />} />
              <Route path="/gigs/:id" element={<GigDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </GigProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
