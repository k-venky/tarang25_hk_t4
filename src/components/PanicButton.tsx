
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import { useState } from "react";

interface PanicButtonProps {
  onPress: () => void;
}

const PanicButton = ({ onPress }: PanicButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    onPress();
    
    // Reset button state after animation
    setTimeout(() => {
      setIsPressed(false);
    }, 300);
  };

  return (
    <button
      onClick={handlePress}
      className={cn(
        "panic-button",
        isPressed && "scale-95"
      )}
      aria-label="Get immediate help"
    >
      <HelpCircle className="h-6 w-6" />
      {isPressed && (
        <div className="absolute inset-0 rounded-full animate-ripple bg-destructive/40" />
      )}
    </button>
  );
};

export default PanicButton;
