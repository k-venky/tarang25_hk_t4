import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMood } from "@/components/MoodContext";
import PanicButton from "@/components/PanicButton";
import NavBar from "@/components/NavBar";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { 
  PhoneCall, 
  Clock, 
  BookOpen, 
  BrainCircuit,
  Coffee,
  GraduationCap,
  Heart,
  Moon,
  Calendar
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Guide categories with content
const guideCategories = [
  {
    title: "Crisis Help",
    description: "Immediate support resources",
    icon: <PhoneCall className="h-6 w-6" />,
    color: "bg-red-100 text-red-600",
    guides: [
      {
        title: "Campus Counseling Hotline",
        content: "Available 24/7 at (555) 123-4567. Trained counselors are ready to help with any mental health concern, big or small. Services are free and confidential for all enrolled students."
      },
      {
        title: "National Crisis Text Line",
        content: "Text HOME to 741741 to connect with a Crisis Counselor. Free 24/7 support for those in crisis. Text from anywhere in the USA to text with a trained Crisis Counselor."
      },
      {
        title: "Local Mental Health Services",
        content: "Community Mental Health Center: (555) 987-6543\nCity Hospital Mental Health Unit: (555) 456-7890\nAfter-hours Crisis Team: (555) 789-1234"
      },
      {
        title: "Peer Support Network",
        content: "Connect with trained student peer supporters who understand what you're going through. Visit the Student Center Room 302 weekdays 10am-4pm, or join virtual support circles every Tuesday and Thursday at 7pm via campus portal."
      }
    ]
  },
  {
    title: "Sleep Tips",
    description: "Improve your sleep quality",
    icon: <Moon className="h-6 w-6" />,
    color: "bg-blue-100 text-blue-600",
    guides: [
      {
        title: "Sleep Hygiene Basics",
        content: "1. Maintain a regular sleep schedule, even on weekends\n2. Create a restful environment (dark, quiet, cool temperature)\n3. Avoid screens 1 hour before bedtime\n4. Limit caffeine after noon\n5. Exercise regularly, but not too close to bedtime"
      },
      {
        title: "Bedtime Routine Builder",
        content: "Create a consistent 30-minute routine before bed:\n- Change into comfortable clothes\n- Do gentle stretching or yoga\n- Practice breathing exercises\n- Read a physical book (not on screens)\n- Write in a gratitude journal\n- Listen to calming music or sounds"
      },
      {
        title: "Managing Sleep Anxiety",
        content: "If racing thoughts keep you awake:\n1. Keep a notepad by your bed to write down thoughts\n2. Try the \"empty mind\" technique: imagine placing thoughts in a box\n3. Practice progressive muscle relaxation\n4. Use guided sleep meditations\n5. If you can't sleep after 20 minutes, get up and do something calming until you feel tired"
      },
      {
        title: "Napping Strategies for Students",
        content: "Effective napping tips:\n- Keep naps to 20-30 minutes to avoid sleep inertia\n- Nap between 1-3pm when there's a natural energy dip\n- Find quiet, comfortable nap spots on campus (library quiet rooms)\n- Use eye masks and earplugs\n- Set an alarm to avoid oversleeping"
      }
    ]
  },
  {
    title: "Study Hacks",
    description: "Effective learning techniques",
    icon: <GraduationCap className="h-6 w-6" />,
    color: "bg-amber-100 text-amber-600",
    guides: [
      {
        title: "Pomodoro Technique Guide",
        content: "1. Choose a task to focus on\n2. Set a timer for 25 minutes\n3. Work on the task without distractions until the timer rings\n4. Take a 5-minute break\n5. After every four \"pomodoros,\" take a longer break of 20-30 minutes"
      },
      {
        title: "Active Recall Methods",
        content: "1. After reading a section, try to summarize it from memory\n2. Use flashcards to quiz yourself on key concepts\n3. Teach the material to someone else\n4. Answer practice questions without looking at your notes"
      },
      {
        title: "Creating Optimal Study Spaces",
        content: "1. Find a quiet, well-lit area with minimal distractions\n2. Keep your study space organized and clutter-free\n3. Use comfortable seating and good posture\n4. Personalize your space with plants or inspiring images"
      },
      {
        title: "Group Study Strategies",
        content: "1. Form a study group with classmates who are motivated and prepared\n2. Assign different topics to each member to teach to the group\n3. Create practice quizzes and test each other\n4. Discuss challenging concepts and share different perspectives"
      }
    ]
  },
  {
    title: "Stress Management",
    description: "Techniques to reduce stress",
    icon: <BrainCircuit className="h-6 w-6" />,
    color: "bg-purple-100 text-purple-600",
    guides: [
      {
        title: "Quick Stress Relief Techniques",
        content: "1. Deep breathing exercises (4-7-8 technique)\n2. Progressive muscle relaxation\n3. Visualization (imagine a peaceful scene)\n4. Mindfulness meditation\n5. Take a short walk or stretch"
      },
      {
        title: "Identifying Stress Triggers",
        content: "1. Keep a stress journal to track situations, thoughts, and feelings\n2. Analyze patterns to identify common triggers\n3. Develop coping strategies for each trigger\n4. Practice assertiveness to set boundaries and say no"
      },
      {
        title: "Building Resilience",
        content: "1. Cultivate positive relationships and social support\n2. Practice self-compassion and acceptance\n3. Set realistic goals and expectations\n4. Develop problem-solving skills\n5. Maintain a healthy lifestyle (sleep, nutrition, exercise)"
      },
      {
        title: "Mindfulness for Academic Stress",
        content: "1. Practice mindful breathing during study sessions\n2. Pay attention to the present moment without judgment\n3. Use mindfulness apps or guided meditations\n4. Take mindful breaks to stretch or walk\n5. Practice gratitude and appreciate small moments"
      }
    ]
  },
  {
    title: "Social Wellbeing",
    description: "Building healthy relationships",
    icon: <Heart className="h-6 w-6" />,
    color: "bg-pink-100 text-pink-600",
    guides: [
      {
        title: "Making Friends on Campus",
        content: "1. Join clubs or organizations that align with your interests\n2. Attend campus events and activities\n3. Introduce yourself to classmates and start conversations\n4. Be open and approachable\n5. Initiate study groups or social outings"
      },
      {
        title: "Setting Boundaries",
        content: "1. Know your limits and communicate them clearly\n2. Say no without guilt or excessive explanation\n3. Prioritize your own needs and wellbeing\n4. Be assertive and stand up for yourself\n5. Respect others' boundaries as well"
      },
      {
        title: "Navigating Roommate Dynamics",
        content: "1. Establish clear expectations and rules from the beginning\n2. Communicate openly and address conflicts promptly\n3. Respect each other's space and privacy\n4. Find common interests and activities to share\n5. Be willing to compromise and find solutions together"
      },
      {
        title: "Finding Your Community",
        content: "1. Explore different social groups and organizations on campus\n2. Attend cultural events and celebrations\n3. Volunteer for causes you care about\n4. Connect with people who share your values and interests\n5. Be patient and persistent in building relationships"
      }
    ]
  },
  {
    title: "Time Management",
    description: "Balance academics and life",
    icon: <Clock className="h-6 w-6" />,
    color: "bg-emerald-100 text-emerald-600",
    guides: [
      {
        title: "Weekly Planning Template",
        content: "1. Schedule fixed commitments (classes, work, appointments)\n2. Allocate time for studying and assignments\n3. Plan for meals, exercise, and sleep\n4. Include time for relaxation and social activities\n5. Review and adjust your plan regularly"
      },
      {
        title: "Prioritization Strategies",
        content: "1. Use the Eisenhower Matrix (urgent/important) to categorize tasks\n2. Focus on high-impact activities that align with your goals\n3. Break large tasks into smaller, manageable steps\n4. Delegate or eliminate low-priority tasks\n5. Avoid perfectionism and focus on progress"
      },
      {
        title: "Avoiding Procrastination",
        content: "1. Identify the reasons behind your procrastination\n2. Break tasks into smaller, more manageable steps\n3. Set realistic deadlines and reward yourself for progress\n4. Minimize distractions and create a focused environment\n5. Use time management techniques like the Pomodoro Technique"
      },
      {
        title: "Creating Work-Life Balance",
        content: "1. Set boundaries between work and personal time\n2. Schedule regular breaks and vacations\n3. Prioritize self-care activities (exercise, hobbies, relaxation)\n4. Delegate tasks and ask for help when needed\n5. Learn to say no to commitments that overload your schedule"
      }
    ]
  },
  {
    title: "Healthy Habits",
    description: "Nutrition and wellness tips",
    icon: <Coffee className="h-6 w-6" />,
    color: "bg-green-100 text-green-600",
    guides: [
      {
        title: "Quick & Healthy Meals",
        content: "1. Oatmeal with fruit and nuts\n2. Yogurt parfait with granola and berries\n3. Salad with grilled chicken or tofu\n4. Whole-grain wrap with hummus and veggies\n5. Smoothie with protein powder and spinach"
      },
      {
        title: "Budget-Friendly Nutrition",
        content: "1. Buy in bulk and cook at home\n2. Choose seasonal fruits and vegetables\n3. Plan your meals and make a grocery list\n4. Avoid processed foods and sugary drinks\n5. Utilize campus food resources (food pantry, meal swipes)"
      },
      {
        title: "Hydration Reminders",
        content: "1. Carry a water bottle and refill it throughout the day\n2. Set reminders on your phone to drink water\n3. Drink water before, during, and after exercise\n4. Choose water over sugary drinks\n5. Eat water-rich fruits and vegetables (watermelon, cucumber)"
      },
      {
        title: "Campus Wellness Resources",
        content: "1. Student Health Center (medical and mental health services)\n2. Recreation Center (gym, fitness classes, sports)\n3. Wellness Programs (stress management, nutrition workshops)\n4. Counseling Services (individual and group therapy)\n5. Disability Services (accommodations and support)"
      }
    ]
  },
  {
    title: "Exam Preparation",
    description: "Strategies for test success",
    icon: <Calendar className="h-6 w-6" />,
    color: "bg-indigo-100 text-indigo-600",
    guides: [
      {
        title: "Test Anxiety Management",
        content: "1. Practice relaxation techniques (deep breathing, meditation)\n2. Visualize success and positive outcomes\n3. Challenge negative thoughts and beliefs\n4. Get enough sleep and eat a healthy meal before the exam\n5. Arrive early and set up your space comfortably"
      },
      {
        title: "Strategic Study Scheduling",
        content: "1. Create a study schedule that allocates time for each subject\n2. Break study sessions into smaller, focused blocks\n3. Review material regularly and space out your studying\n4. Use active recall and practice questions\n5. Take breaks to avoid burnout"
      },
      {
        title: "Memory Enhancement Techniques",
        content: "1. Use mnemonic devices (acronyms, rhymes, images)\n2. Associate new information with existing knowledge\n3. Teach the material to someone else\n4. Create mind maps or visual summaries\n5. Review and reinforce information regularly"
      },
      {
        title: "Post-Exam Self-Care",
        content: "1. Reward yourself for your efforts\n2. Reflect on what you learned from the exam experience\n3. Identify areas for improvement and adjust your study strategies\n4. Practice self-compassion and avoid harsh self-criticism\n5. Engage in relaxing activities to de-stress and recharge"
      }
    ]
  }
];

const Guides = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { selectedColor, hasCompletedCheckIn } = useMood();
  const [selectedCategory, setSelectedCategory] = useState<(typeof guideCategories)[0] | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<{ title: string, content: string } | null>(null);
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
  
  const handleCategoryClick = (category: (typeof guideCategories)[0]) => {
    setSelectedCategory(category);
    toast({
      title: category.title,
      description: "Opening guide category..."
    });
  };
  
  const handleGuideClick = (guide: { title: string, content: string }) => {
    setSelectedGuide(guide);
    setDialogOpen(true);
  };
  
  const bgClass = selectedColor ? `bg-${selectedColor}-gradient gradient-animated-bg` : "bg-background";
  
  return (
    <div className={cn(
      "min-h-screen pb-20",
      bgClass
    )}>
      <PanicButton onPress={handlePanicButton} />
      
      {/* Header */}
      <header className="p-6 pt-12">
        <h1 className="text-2xl font-semibold mb-1">Guides</h1>
        <p className="text-sm opacity-75">Helpful resources and tips</p>
      </header>
      
      {/* Main content */}
      <main className="px-6 space-y-8">
        {/* Guide categories */}
        <div className="grid grid-cols-2 gap-4">
          {guideCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md animate-fade-in-up cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => handleCategoryClick(category)}
            >
              <div className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center mb-3",
                category.color
              )}>
                {category.icon}
              </div>
              <h3 className="font-medium">{category.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
            </div>
          ))}
        </div>
        
        {/* Featured guides or selected category guides */}
        <section>
          <h2 className="text-lg font-medium mb-3">
            {selectedCategory ? `${selectedCategory.title} Guides` : "Featured Guides"}
          </h2>
          <div className="space-y-3">
            {(selectedCategory ? selectedCategory.guides : guideCategories[0].guides).map((guide, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md animate-fade-in-up flex items-center justify-between cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                onClick={() => handleGuideClick(guide)}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-accent text-accent-foreground">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{guide.title}</h3>
                    <p className="text-xs text-muted-foreground">Tap to read</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      {/* Guide content dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md rounded-xl bg-white/95 backdrop-blur-md">
          {selectedGuide && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg">{selectedGuide.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <p className="whitespace-pre-line text-sm leading-relaxed">
                  {selectedGuide.content}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Navigation */}
      <NavBar currentPath="/guides" />
    </div>
  );
};

export default Guides;
