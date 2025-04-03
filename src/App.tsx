
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MoodProvider } from "@/components/MoodContext";
import Index from "./pages/Index";
import MoodCheckIn from "./pages/MoodCheckIn";
import MoodInsights from "./pages/MoodInsights";
import Dashboard from "./pages/Dashboard";
import Exercises from "./pages/Exercises";
import Progress from "./pages/Progress";
import Guides from "./pages/Guides";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MoodProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mood-check-in" element={<MoodCheckIn />} />
            <Route path="/insights" element={<MoodInsights />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MoodProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
