
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMood } from "@/components/MoodContext";
import PanicButton from "@/components/PanicButton";
import NavBar from "@/components/NavBar";
import ProgressChart from "@/components/ProgressChart";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Clock, Star, Calendar, CheckCircle2, CalendarCheck2 } from "lucide-react";

const Progress = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    selectedColor, 
    hasCompletedCheckIn 
  } = useMood();
  
  // Redirect if check-in not completed
  useEffect(() => {
    if (!hasCompletedCheckIn) {
      navigate("/");
    }
  }, [hasCompletedCheckIn, navigate]);
  
  const handlePanicButton = () => {
    toast({
      title: "Help Resources",
      description: "Campus counseling is available 24/7 at (555) 123-4567",
      variant: "destructive"
    });
  };
  
  // Mock achievements with initial empty state
  const achievements = [
    { 
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: "First Check-In",
      description: "Completed your first mood check-in",
      completed: true
    },
    { 
      icon: <Clock className="h-5 w-5" />,
      title: "Morning Routine",
      description: "Checked in 5 days in a row before 10am",
      completed: false,
      progress: 1,
      total: 5
    },
    { 
      icon: <Star className="h-5 w-5" />,
      title: "Mindfulness Maven",
      description: "Completed 10 mindfulness exercises",
      completed: false,
      progress: 0,
      total: 10
    },
    { 
      icon: <Calendar className="h-5 w-5" />,
      title: "Consistent Care",
      description: "Used the app every day for 2 weeks",
      completed: false,
      progress: 1,
      total: 14
    }
  ];
  
  const bgClass = selectedColor ? `bg-${selectedColor}-gradient gradient-animated-bg` : "bg-background";
  
  return (
    <div className={cn(
      "min-h-screen pb-20",
      bgClass
    )}>
      <PanicButton onPress={handlePanicButton} />
      
      {/* Header */}
      <header className="p-6 pt-12">
        <h1 className="text-2xl font-semibold mb-1">Your Progress</h1>
        <p className="text-sm opacity-75">Track your mood and achievements</p>
      </header>
      
      {/* Main content */}
      <main className="px-6 space-y-6">
        {/* Mood chart */}
        <section>
          <ProgressChart />
        </section>
        
        {/* Achievements */}
        <section>
          <h2 className="text-lg font-medium mb-3">Achievements</h2>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={cn(
                  "bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md",
                  "animate-fade-in-up hover:shadow-lg transition-all duration-300",
                  achievement.completed && "border-2 border-green-500"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center",
                    achievement.completed ? "bg-green-100 text-green-600" : "bg-accent text-accent-foreground"
                  )}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{achievement.title}</h3>
                      {achievement.completed && (
                        <span className="text-green-600 text-sm flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" /> Completed
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    
                    {!achievement.completed && achievement.progress !== undefined && (
                      <div className="mt-2">
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">
                            {achievement.progress}/{achievement.total}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {Math.round((achievement.progress / achievement.total) * 100)}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Streak calendar - reset to initial state */}
        <section className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md animate-fade-in-up hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-3">
            <CalendarCheck2 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium">Current Streak</h2>
          </div>
          <div className="flex justify-center items-center gap-3 py-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1</div>
              <div className="text-xs text-muted-foreground">day</div>
            </div>
            <div className="h-10 w-px bg-gray-200" />
            <div className="text-center">
              <div className="text-lg font-medium">Best</div>
              <div className="text-sm text-muted-foreground">1 day</div>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            {Array.from({ length: 7 }).map((_, i) => {
              const isActive = i === 0;
              const today = i === 0;
              
              return (
                <div 
                  key={i}
                  className="flex flex-col items-center"
                >
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-xs mb-1 transition-all duration-300 hover:scale-110",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-gray-100 text-muted-foreground",
                    today && "ring-2 ring-primary ring-offset-2"
                  )}>
                    {i + 1}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      
      {/* Navigation */}
      <NavBar currentPath="/progress" />
    </div>
  );
};

export default Progress;
