import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useMood } from "@/components/MoodContext";

const Index = () => {
  const { hasCompletedCheckIn } = useMood();
  
  // Check if user has completed check-in
  if (hasCompletedCheckIn) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Otherwise, redirect to mood check-in
  return <Navigate to="/mood-check-in" replace />;
};

export default Index;
