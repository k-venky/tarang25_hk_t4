
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MoodInsightCardProps {
  title: string;
  description: string;
  onSelect: () => void;
  isSelected: boolean;
}

const MoodInsightCard = ({ 
  title, 
  description, 
  onSelect, 
  isSelected 
}: MoodInsightCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const handleClick = () => {
    setExpanded(!expanded);
    onSelect();
  };

  return (
    <div 
      className={cn(
        "mood-insight-card", 
        isSelected && "selected",
        "animate-fade-in-up"
      )}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg">{title}</h3>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
      
      <div className={cn(
        "expandable-card overflow-hidden transition-all duration-300",
        expanded ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"
      )}>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default MoodInsightCard;
