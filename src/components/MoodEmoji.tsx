
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MoodEmojiProps {
  emoji: string;
  label: string;
  onSelect: (emoji: string, label: string) => void;
  isSelected: boolean;
}

const MoodEmoji = ({ emoji, label, onSelect, isSelected }: MoodEmojiProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onSelect(emoji, label);
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "emoji-btn relative",
        isSelected && "selected",
        isAnimating && "animate-float-up"
      )}
      aria-label={`Mood: ${label}`}
    >
      <span className="text-4xl" role="img" aria-label={label}>
        {emoji}
      </span>
      {isSelected && (
        <div className="absolute inset-0 rounded-full animate-ripple bg-primary/20" />
      )}
    </button>
  );
};

export default MoodEmoji;
