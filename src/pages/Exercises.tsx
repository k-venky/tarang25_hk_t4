import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMood } from "@/components/MoodContext";
import ExerciseCard from "@/components/ExerciseCard";
import PanicButton from "@/components/PanicButton";
import NavBar from "@/components/NavBar";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Timer, Pencil, Music, Moon, Footprints, Clock, Brain, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// All exercises with content
const allExercises = [
  {
    title: "5-4-3-2-1 Grounding",
    duration: "5 min",
    category: "quick",
    mood: ["stress", "angry"],
    icon: <Timer className="h-5 w-5" />,
    content: "This exercise helps anchor you to the present when you're feeling overwhelmed:\n\n5: Acknowledge FIVE things you see around you\n4: Acknowledge FOUR things you can touch around you\n3: Acknowledge THREE things you hear\n2: Acknowledge TWO things you can smell\n1: Acknowledge ONE thing you can taste\n\nTake deep breaths between each step."
  },
  {
    title: "Angry Doodle Pad",
    duration: "Free form",
    category: "creative",
    mood: ["stress", "angry"],
    icon: <Pencil className="h-5 w-5" />,
    content: "Grab a piece of paper and just scribble! Let your hand move however it wants to. The goal isn't to create art but to release tension physically. Try drawing how your anger feels or scribbling with the amount of pressure that matches your emotions."
  },
  {
    title: "Release Tension Audio",
    duration: "7 min",
    category: "audio",
    mood: ["stress", "angry"],
    icon: <Music className="h-5 w-5" />,
    content: "Find a comfortable position. Close your eyes if you wish. Imagine the tension in your body as a color. Breathe in deeply for 4 counts, hold for 2, then exhale for 6 counts, visualizing the colored tension leaving your body with each exhale. Continue for 7 minutes, focusing on different areas of tension."
  },
  {
    title: "Comfort Meditation",
    duration: "8 min",
    category: "meditation",
    mood: ["sad"],
    icon: <Moon className="h-5 w-5" />,
    content: "Settle into a comfortable position, either sitting or lying down. Close your eyes gently. Imagine a warm, comforting light surrounding you, melting away any tension or sadness. Focus on your breath, allowing each inhale to bring peace and each exhale to release sorrow. Continue for 8 minutes, letting the comforting light fill you."
  },
  {
    title: "Gratitude Practice",
    duration: "3 min",
    category: "quick",
    mood: ["sad", "neutral"],
    icon: <Pencil className="h-5 w-5" />,
    content: "Take a moment to list three things you're grateful for today. They can be big or small, like a sunny day, a kind word, or a warm meal. Reflect on why these things bring you joy or comfort. Write them down or simply think about them, allowing gratitude to shift your perspective."
  },
  {
    title: "Gentle Movement",
    duration: "5 min",
    category: "physical",
    mood: ["sad", "tired"],
    icon: <Footprints className="h-5 w-5" />,
    content: "Engage in light, gentle movements to ease tension and boost circulation. Try a slow walk, stretching, or yoga. Pay attention to how your body feels, and move in ways that feel good. Gentle movement can help lift your mood and reduce fatigue."
  },
  {
    title: "Power Nap Audio",
    duration: "20 min",
    category: "audio",
    mood: ["tired"],
    icon: <Moon className="h-5 w-5" />,
    content: "Find a quiet, dark place to lie down. Close your eyes and focus on your breath. Listen to a guided power nap audio to help you relax and drift off to sleep. A 20-minute nap can significantly improve alertness and energy levels."
  },
  {
    title: "Energy Boosting Stretch",
    duration: "4 min",
    category: "physical",
    mood: ["tired", "neutral"],
    icon: <Footprints className="h-5 w-5" />,
    content: "Perform a series of stretches to invigorate your body and mind. Focus on stretching your arms, legs, and back. Deep breathing during stretching can enhance the energy-boosting effects. This practice can help combat fatigue and improve focus."
  },
  {
    title: "Focus Breath",
    duration: "2 min",
    category: "quick",
    mood: ["tired", "stress"],
    icon: <Timer className="h-5 w-5" />,
    content: "Use this breathing technique to sharpen focus and reduce stress:\n\n1. Inhale deeply through your nose for 4 counts\n2. Hold your breath for 6 counts\n3. Exhale slowly through your mouth for 8 counts\n\nRepeat for 2 minutes, concentrating on the rhythm of your breath."
  },
  {
    title: "Body Scan Relaxation",
    duration: "10 min",
    category: "meditation",
    mood: ["neutral", "happy"],
    icon: <Heart className="h-5 w-5" />,
    content: "Lie down comfortably and close your eyes. Bring your attention to different parts of your body, starting with your toes and moving up to the top of your head. Notice any sensations, tension, or discomfort. Simply observe without judgment, allowing each part of your body to relax. Continue for 10 minutes, promoting relaxation and body awareness."
  },
  {
    title: "Mindful Walking",
    duration: "15 min",
    category: "physical",
    mood: ["happy", "hopeful"],
    icon: <Footprints className="h-5 w-5" />,
    content: "Take a slow, deliberate walk, paying attention to each step. Notice the sensations in your feet as they make contact with the ground. Observe your surroundings with curiosity, engaging all your senses. Focus on the present moment, letting go of worries or distractions. Continue for 15 minutes, enhancing mindfulness and appreciation for your environment."
  },
  {
    title: "Breathing Exercise",
    duration: "5 min",
    category: "quick",
    mood: ["stress", "neutral"],
    icon: <Music className="h-5 w-5" />,
    content: "Practice a simple breathing exercise to calm your mind and reduce stress:\n\n1. Sit comfortably and close your eyes\n2. Inhale deeply through your nose for 4 counts\n3. Exhale slowly through your mouth for 6 counts\n\nRepeat for 5 minutes, focusing on the rhythm of your breath."
  },
  {
    title: "Joy Reflection",
    duration: "7 min",
    category: "creative",
    mood: ["happy", "hopeful"],
    icon: <Pencil className="h-5 w-5" />,
    content: "Reflect on moments of joy in your life. Think about times when you felt truly happy, grateful, or content. Visualize these moments in detail, recalling the sights, sounds, and emotions. Write down or draw these joyful memories, allowing them to uplift your spirits."
  },
  {
    title: "Visualization Practice",
    duration: "12 min",
    category: "meditation",
    mood: ["hopeful", "neutral"],
    icon: <Brain className="h-5 w-5" />,
    content: "Find a quiet place to sit or lie down. Close your eyes and imagine a peaceful scene, such as a beach, forest, or mountaintop. Engage all your senses, visualizing the details of the scene. Focus on the positive emotions associated with this place, allowing them to fill you with hope and optimism. Continue for 12 minutes, promoting relaxation and positive thinking."
  },
  {
    title: "Quick Energy Reset",
    duration: "3 min",
    category: "quick",
    mood: ["tired", "stress"],
    icon: <Clock className="h-5 w-5" />,
    content: "Perform a quick energy reset to revitalize your body and mind:\n\n1. Stand up and shake your body for 1 minute\n2. Do jumping jacks or run in place for 1 minute\n3. Take deep breaths and stretch for 1 minute\n\nThis brief burst of activity can help combat fatigue and improve focus."
  }
];

// Map emoji to mood keywords
const emojiToMood: Record<string, string> = {
  "😊": "happy",
  "😢": "sad",
  "😡": "angry",
  "🥱": "tired",
  "😐": "neutral",
  "🌈": "hopeful"
};

const Exercises = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { selectedEmoji, selectedColor, hasCompletedCheckIn } = useMood();
  const [selectedExercise, setSelectedExercise] = useState<(typeof allExercises)[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  // Handle exercise click
  const handleExerciseClick = (exercise: (typeof allExercises)[0]) => {
    setSelectedExercise(exercise);
    setDialogOpen(true);
  };

  // Filter exercises based on current mood
  const getRelevantExercises = () => {
    const currentMood = emojiToMood[selectedEmoji] || "neutral";

    // Get exercises that match the current mood
    const moodExercises = allExercises.filter(exercise => 
      exercise.mood.includes(currentMood) || 
      exercise.mood.includes(selectedColor)
    );

    // If we don't have enough, add some general ones
    if (moodExercises.length < 5) {
      const generalExercises = allExercises.filter(exercise => 
        !moodExercises.includes(exercise)
      );
      return [...moodExercises, ...generalExercises.slice(0, 5 - moodExercises.length)];
    }
    return moodExercises;
  };

  // Group exercises by category
  const categorizedExercises = () => {
    const exercises = getRelevantExercises();
    const categories: Record<string, typeof allExercises> = {
      "Quick Practices": [],
      "Meditations": [],
      "Physical Practices": [],
      "Creative Outlets": [],
      "Audio Guides": []
    };
    
    exercises.forEach(exercise => {
      switch (exercise.category) {
        case "quick":
          categories["Quick Practices"].push(exercise);
          break;
        case "meditation":
          categories["Meditations"].push(exercise);
          break;
        case "physical":
          categories["Physical Practices"].push(exercise);
          break;
        case "creative":
          categories["Creative Outlets"].push(exercise);
          break;
        case "audio":
          categories["Audio Guides"].push(exercise);
          break;
      }
    });

    // Remove empty categories
    return Object.fromEntries(
      Object.entries(categories).filter(([_, exercises]) => exercises.length > 0)
    );
  };
  
  const exercises = categorizedExercises();
  const bgClass = selectedColor ? `bg-${selectedColor}-gradient gradient-animated-bg` : "bg-background";
  
  return (
    <div className={cn("min-h-screen pb-20", bgClass)}>
      <PanicButton onPress={handlePanicButton} />
      
      {/* Header */}
      <header className="p-6 pt-12">
        <h1 className="text-2xl font-semibold mb-1">Exercises</h1>
        <p className="text-sm opacity-75">Find activities to support your wellbeing</p>
      </header>
      
      {/* Exercises by category */}
      <main className="px-6 space-y-8 bg-zinc-50">
        {Object.entries(exercises).map(([category, categoryExercises]) => (
          <section key={category}>
            <h2 className="text-lg font-medium mb-3">{category}</h2>
            <div className="space-y-3">
              {categoryExercises.map((exercise, index) => (
                <ExerciseCard 
                  key={index} 
                  title={exercise.title} 
                  duration={exercise.duration} 
                  icon={exercise.icon} 
                  onClick={() => handleExerciseClick(exercise)} 
                />
              ))}
            </div>
          </section>
        ))}
      </main>
      
      {/* Exercise content dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md rounded-xl bg-white/95 backdrop-blur-md">
          {selectedExercise && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center",
                    "bg-primary/20 text-primary"
                  )}>
                    {selectedExercise.icon}
                  </div>
                  <DialogTitle>{selectedExercise.title}</DialogTitle>
                </div>
                <DialogDescription>
                  Duration: {selectedExercise.duration}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <p className="whitespace-pre-line text-sm leading-relaxed">
                  {selectedExercise.content}
                </p>
                <div className="flex justify-center mt-4">
                  <div className="animate-pulse-glow inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm">
                    <Timer className="h-4 w-4" />
                    <span>Start when you're ready</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Navigation */}
      <NavBar currentPath="/exercises" />
    </div>
  );
};

export default Exercises;
