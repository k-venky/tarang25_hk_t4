
import { useState, useEffect } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { cn } from "@/lib/utils";

// Define mood data type
interface MoodEntry {
  day: string;
  mood: number;
  moodType: "stress" | "calm" | "energy" | "balance" | "drain";
}

// Mock data
const generateMockData = (): MoodEntry[] => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const moodTypes: Array<"stress" | "calm" | "energy" | "balance" | "drain"> = [
    "stress", "calm", "energy", "balance", "drain"
  ];
  
  return days.map(day => ({
    day,
    mood: Math.floor(Math.random() * 5) + 1,
    moodType: moodTypes[Math.floor(Math.random() * moodTypes.length)]
  }));
};

const getMoodColor = (type: string) => {
  switch (type) {
    case "stress": return "#FF5555";
    case "calm": return "#87CEEB";
    case "energy": return "#FFEB3B";
    case "balance": return "#98FB98";
    case "drain": return "#36454F";
    default: return "#36454F";
  }
};

const ProgressChart = () => {
  const [data, setData] = useState<MoodEntry[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);
  
  useEffect(() => {
    // Generate mock data
    setData(generateMockData());
    
    // Set animation flag
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-md shadow-md border">
          <p className="font-medium">{label}</p>
          <div 
            className="w-full h-2 mt-1 rounded-full" 
            style={{ backgroundColor: getMoodColor(data.moodType) }}
          />
          <p className="text-sm capitalize">{data.moodType}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn(
      "h-64 w-full p-4 bg-white/80 rounded-xl shadow-md",
      isAnimating ? "opacity-0" : "opacity-100 animate-fade-in"
    )}>
      <h3 className="font-medium mb-2">Your Mood This Week</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="day" />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#333"
            strokeWidth={2}
            dot={(props) => {
              const { cx, cy, payload } = props;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={6}
                  fill={getMoodColor(payload.moodType)}
                  stroke="white"
                  strokeWidth={2}
                  className={isAnimating ? "animate-pulse-glow" : ""}
                />
              );
            }}
            activeDot={{ r: 8 }}
            className={isAnimating ? "animate-draw-line" : ""}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
