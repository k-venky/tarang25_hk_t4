
import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  colorName: "stress" | "calm" | "energy" | "balance" | "drain";
  displayName: string;
  onSelect: (colorName: string) => void;
  isSelected: boolean;
}

const ColorSwatch = ({ 
  colorName, 
  displayName, 
  onSelect, 
  isSelected 
}: ColorSwatchProps) => {
  const gradientClass = `bg-${colorName}-gradient`;
  
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => onSelect(colorName)}
        className={cn(
          "color-swatch",
          gradientClass,
          isSelected && "selected"
        )}
        aria-label={`Color mood: ${displayName}`}
      />
      <span className="text-sm font-medium">{displayName}</span>
    </div>
  );
};

export default ColorSwatch;
