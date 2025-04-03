import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMood } from "@/components/MoodContext";
import { RefreshCw, Coffee, Smartphone, Droplets, Footprints, Moon, Timer, Pencil, Music } from "lucide-react";
import ExerciseCard from "@/components/ExerciseCard";
import PanicButton from "@/components/PanicButton";
import NavBar from "@/components/NavBar";
import TherapyChatbot from "@/components/TherapyChatbot";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

// Define affirmations
const affirmations = ["Rest is part of the journey.", "You are exactly where you need to be.", "Small steps still move you forward.", "Your worth isn't measured by productivity.", "It's okay to ask for help.", "Today is a new beginning.", "You don't have to do it all today.", "Your feelings are valid.", "Breathe in peace, breathe out tension."];

// Define exercise suggestions based on mood
const getExercises = (emoji: string, colorName: string) => {
  // Stressed or angry exercises
  if (emoji === "😡" || colorName === "stress") {
    return [{
      title: "5-4-3-2-1 Grounding",
      duration: "5 min",
      icon: <Timer className="h-5 w-5" />
    }, {
      title: "Angry Doodle Pad",
      duration: "Free form",
      icon: <Pencil className="h-5 w-5" />
    }, {
      title: "Release Tension Audio",
      duration: "7 min",
      icon: <Music className="h-5 w-5" />
    }];
  }

  // Sad exercises
  if (emoji === "😢") {
    return [{
      title: "Comfort Meditation",
      duration: "8 min",
      icon: <Moon className="h-5 w-5" />
    }, {
      title: "Gratitude Practice",
      duration: "3 min",
      icon: <Pencil className="h-5 w-5" />
    }, {
      title: "Gentle Movement",
      duration: "5 min",
      icon: <Footprints className="h-5 w-5" />
    }];
  }

  // Tired exercises
  if (emoji === "🥱") {
    return [{
      title: "Power Nap Audio",
      duration: "20 min",
      icon: <Moon className="h-5 w-5" />
    }, {
      title: "Energy Boosting Stretch",
      duration: "4 min",
      icon: <Footprints className="h-5 w-5" />
    }, {
      title: "Focus Breath",
      duration: "2 min",
      icon: <Timer className="h-5 w-5" />
    }];
  }

  // Default/other mood exercises
  return [{
    title: "Body Scan Relaxation",
    duration: "10 min",
    icon: <Timer className="h-5 w-5" />
  }, {
    title: "Mindful Walking",
    duration: "15 min",
    icon: <Footprints className="h-5 w-5" />
  }, {
    title: "Breathing Exercise",
    duration: "5 min",
    icon: <Music className="h-5 w-5" />
  }];
};

// Define do/avoid suggestions
const getSuggestions = (emoji: string, colorName: string) => {
  const suggestions = {
    avoid: [{
      icon: <Coffee className="h-5 w-5" />,
      text: "Caffeine"
    }, {
      icon: <Smartphone className="h-5 w-5" />,
      text: "Doomscrolling"
    }],
    do: [{
      icon: <Droplets className="h-5 w-5" />,
      text: "Drink water"
    }, {
      icon: <Footprints className="h-5 w-5" />,
      text: "10-min walk"
    }]
  };

  // Customize based on mood
  if (emoji === "😡" || colorName === "stress") {
    suggestions.avoid.push({
      icon: <Smartphone className="h-5 w-5" />,
      text: "Social media"
    });
    suggestions.do.push({
      icon: <Timer className="h-5 w-5" />,
      text: "Deep breathing"
    });
  }
  if (emoji === "🥱") {
    suggestions.avoid.push({
      icon: <Coffee className="h-5 w-5" />,
      text: "Sugar rush"
    });
    suggestions.do.push({
      icon: <Moon className="h-5 w-5" />,
      text: "20-min nap"
    });
  }
  return suggestions;
};
const Dashboard = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const {
    selectedEmoji,
    selectedEmojiLabel,
    selectedColor,
    hasCompletedCheckIn,
    resetMoodSelection
  } = useMood();
  const [showConfetti, setShowConfetti] = useState(false);
  const [affirmation, setAffirmation] = useState("");

  // Redirect if check-in not completed
  useEffect(() => {
    if (!hasCompletedCheckIn) {
      navigate("/");
    }
  }, [hasCompletedCheckIn, navigate]);

  // Set random affirmation
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setAffirmation(affirmations[randomIndex]);
  }, []);

  // Show confetti for happy + energy combination
  useEffect(() => {
    if (selectedEmoji === "😊" && selectedColor === "energy") {
      setShowConfetti(true);

      // Remove confetti after animation
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedEmoji, selectedColor]);

  // Check if it's night time for special UI touches
  const [isNightTime, setIsNightTime] = useState(false);
  useEffect(() => {
    const hours = new Date().getHours();
    setIsNightTime(hours >= 22 || hours < 6);
  }, []);
  const handlePanicButton = () => {
    toast({
      title: "Help Resources",
      description: "Campus counseling is available 24/7 at (555) 123-4567",
      variant: "destructive"
    });
  };
  const handleNewCheckIn = () => {
    resetMoodSelection();
    navigate("/");
  };
  const exercises = getExercises(selectedEmoji, selectedColor);
  const suggestions = getSuggestions(selectedEmoji, selectedColor);
  const bgClass = selectedColor ? `bg-${selectedColor}-gradient gradient-animated-bg` : "bg-background";

  // Custom styling based on mood
  const getCustomStyling = () => {
    if (selectedEmoji === "😡") {
      return "font-bold";
    }
    if (selectedEmoji === "😢") {
      return "rounded-3xl";
    }
    return "";
  };
  const customStyle = getCustomStyling();
  return <div className={cn("min-h-screen pb-20", bgClass)}>
      <PanicButton onPress={handlePanicButton} />
      
      {/* Header with mood info */}
      <header className="p-6 pt-12 flex items-center justify-between bg-slate-50">
        <div className="flex items-center">
          <span className="text-3xl mr-2">{selectedEmoji}</span>
          <div>
            <h1 className="text-xl font-semibold">Hey there!</h1>
            <p className="text-sm opacity-75">Feeling {selectedEmojiLabel.toLowerCase()}</p>
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={handleNewCheckIn} className="h-9 w-9 rounded-full hover:scale-110 transition-transform duration-300">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </header>
      
      {/* Confetti effect for happy + energy */}
      {showConfetti && <div className="fixed inset-0 pointer-events-none z-20">
          {[...Array(30)].map((_, i) => <div key={i} className="absolute h-3 w-3 rounded-full bg-yellow-400 animate-confetti-fall" style={{
        left: `${Math.random() * 100}%`,
        top: '-10px',
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 3}s`
      }} />)}
        </div>}
      
      {/* Main content */}
      <main className="px-6 space-y-6 bg-slate-50">
        {/* Chatbot section */}
        <section className="mx-[10px] my-[20px] rounded-md">
          <TherapyChatbot />
        </section>
        
        {/* Stress relief exercises */}
        <section className="mx-[10px] my-[20px] rounded-md bg-slate-50">
          <h2 className={cn("text-lg font-medium mb-3", customStyle)}>
            Stress-Relief Exercises
          </h2>
          <div className="space-y-3">
            {exercises.map((exercise, index) => <ExerciseCard key={index} title={exercise.title} duration={exercise.duration} icon={exercise.icon} onClick={() => {
            toast({
              title: exercise.title,
              description: "Exercise coming soon!"
            });
          }} />)}
          </div>
        </section>
        
        {/* Stress levels section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
          <h2 className={cn("text-lg font-medium mb-3", customStyle)}>
            Stress Levels Today
          </h2>
          
          <div>
            <h3 className="text-sm font-medium text-destructive mb-2">Avoid Today:</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              {suggestions.avoid.map((item, index) => <div key={index} className="flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1.5 rounded-full text-sm hover:scale-105 transition-transform duration-300">
                  {item.icon}
                  <span>{item.text}</span>
                </div>)}
            </div>
            
            <h3 className="text-sm font-medium text-green-600 mb-2">Do Today:</h3>
            <div className="flex flex-wrap gap-3">
              {suggestions.do.map((item, index) => <div key={index} className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm hover:scale-105 transition-transform duration-300">
                  {item.icon}
                  <span>{item.text}</span>
                </div>)}
            </div>
          </div>
        </section>
        
        {/* Daily affirmation */}
        <section className={cn("bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-md text-center hover:shadow-lg transition-all duration-300", customStyle)}>
          <h2 className="text-sm font-medium mb-2 uppercase tracking-wider opacity-60">
            Daily Affirmation
          </h2>
          <p className="text-lg font-serif italic">"{affirmation}"</p>
          
          {isNightTime && <div className="mt-3 flex justify-center">
              <span className="text-sm flex items-center gap-1 opacity-60">
                <Moon className="h-4 w-4" /> Time to rest soon
              </span>
            </div>}
        </section>
      </main>
      
      {/* Navigation */}
      <NavBar currentPath="/dashboard" />
    </div>;
};
export default Dashboard;
