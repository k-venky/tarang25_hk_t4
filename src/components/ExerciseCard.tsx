
import { cn } from "@/lib/utils";
import { Play, Pause } from "lucide-react";
import { useState } from "react";

interface ExerciseCardProps {
  title: string;
  duration: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ExerciseCard = ({
  title,
  duration,
  icon,
  onClick
}: ExerciseCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div 
      onClick={onClick} 
      onMouseEnter={() => setIsHovering(true)} 
      onMouseLeave={() => setIsHovering(false)} 
      className="exercise-card animate-fade-in-up bg-slate-50 hover:scale-105 transition-all duration-300"
    >
      <div className="flex justify-between items-center bg-slate-50">
        <div className="flex items-center gap-3">
          <div className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center", 
            "bg-accent text-accent-foreground",
            isHovering && "animate-pulse-glow"
          )}>
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-zinc-950">{title}</h3>
            <p className="text-xs text-muted-foreground">{duration}</p>
          </div>
        </div>
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center", 
          "transition-all duration-300", 
          isHovering 
            ? "bg-primary text-white scale-110 animate-pulse" 
            : "bg-accent text-accent-foreground"
        )}>
          {isHovering ? <Play className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
