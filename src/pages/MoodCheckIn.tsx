
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useMood } from "@/components/MoodContext";
import MoodEmoji from "@/components/MoodEmoji";
import ColorSwatch from "@/components/ColorSwatch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MoodCheckIn = () => {
  const navigate = useNavigate();
  const { 
    selectedEmoji, 
    selectedEmojiLabel, 
    selectedColor, 
    setSelectedEmoji, 
    setSelectedColor, 
    setHasCompletedCheckIn 
  } = useMood();
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const emojis = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😡", label: "Angry" },
    { emoji: "🥱", label: "Tired" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "🌈", label: "Hopeful" }
  ];
  
  const colorSwatches = [
    { name: "stress" as const, displayName: "Stress" },
    { name: "calm" as const, displayName: "Calm" },
    { name: "energy" as const, displayName: "Energy" },
    { name: "balance" as const, displayName: "Balance" },
    { name: "drain" as const, displayName: "Drain" }
  ];
  
  const handleEmojiSelect = (emoji: string, label: string) => {
    setSelectedEmoji(emoji, label);
  };
  
  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
  };
  
  const handleContinue = () => {
    setIsTransitioning(true);
    
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    
    // Transition after animation completes
    setTimeout(() => {
      setHasCompletedCheckIn(true);
      navigate("/insights");
    }, 800);
  };
  
  // Check time of day for midnight care feature
  const [isNightTime, setIsNightTime] = useState(false);
  
  useEffect(() => {
    const hours = new Date().getHours();
    setIsNightTime(hours >= 22 || hours < 6);
  }, []);
  
  const bgClass = selectedColor ? `bg-${selectedColor}-gradient` : "bg-background";
  
  return (
    <div className={cn(
      "min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-1000",
      bgClass,
      isTransitioning && "gradient-animated-bg"
    )}>
      <h1 className="text-2xl font-semibold mb-4 text-center">
        {isNightTime ? "How are you feeling tonight? 🌙" : "How are you feeling today?"}
      </h1>
      
      <div className="w-full max-w-md mb-8">
        <h2 className="text-lg font-medium mb-3">Choose an emoji</h2>
        <div className="emoji-grid">
          {emojis.map((item) => (
            <MoodEmoji
              key={item.emoji}
              emoji={item.emoji}
              label={item.label}
              onSelect={handleEmojiSelect}
              isSelected={selectedEmoji === item.emoji}
            />
          ))}
        </div>
      </div>
      
      <div className="w-full max-w-md mb-8">
        <h2 className="text-lg font-medium mb-3">Choose a color</h2>
        <div className="grid grid-cols-5 gap-4">
          {colorSwatches.map((swatch) => (
            <ColorSwatch
              key={swatch.name}
              colorName={swatch.name}
              displayName={swatch.displayName}
              onSelect={handleColorSelect}
              isSelected={selectedColor === swatch.name}
            />
          ))}
        </div>
      </div>
      
      {selectedEmoji && selectedColor && (
        <Button
          onClick={handleContinue}
          className="mt-4 px-6 py-6 text-lg rounded-full transition-all duration-300 animate-fade-in"
        >
          Let's Go! <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default MoodCheckIn;
