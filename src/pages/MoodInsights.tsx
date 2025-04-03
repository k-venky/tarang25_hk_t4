
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMood } from "@/components/MoodContext";
import MoodInsightCard from "@/components/MoodInsightCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

// Define insights based on emoji and color combinations
const getInsights = (emoji: string, color: string) => {
  // Happy emoji insights
  if (emoji === "😊") {
    if (color === "energy") {
      return [
        {
          title: "Riding high on positive energy?",
          description: "Your enthusiasm can be contagious! Consider how you might channel this energy into a challenging task you've been putting off."
        },
        {
          title: "Feeling accomplished today?",
          description: "Moments of happiness are worth savoring. Take a minute to appreciate what's going well and how your actions contributed to this feeling."
        },
        {
          title: "Looking forward to something special?",
          description: "Anticipation can create powerful positive emotions. Consider journaling about what you're excited about to extend this feeling."
        }
      ];
    }
    return [
      {
        title: "Enjoying a moment of contentment?",
        description: "These peaceful moments are precious. Consider what elements in your environment or routine contributed to this feeling."
      },
      {
        title: "Feeling connected to others?",
        description: "Social connections are powerful mood boosters. Reflect on the relationships that bring you joy and how you might nurture them."
      },
      {
        title: "Noticing small joys today?",
        description: "Being mindful of little pleasures can build resilience. Try listing three small things that made you smile today."
      }
    ];
  }
  
  // Sad emoji insights
  if (emoji === "😢") {
    if (color === "calm") {
      return [
        {
          title: "Feeling lonely even in a crowd?",
          description: "It's common to feel isolated during challenging times. Remember that many students experience this disconnect, especially during exams or transitional periods."
        },
        {
          title: "Experiencing gentle melancholy?",
          description: "Sometimes sadness comes without a clear trigger. Give yourself permission to feel without judgment - emotions often move through us when we don't resist them."
        },
        {
          title: "Missing someone or something?",
          description: "Feelings of loss or nostalgia are natural. Consider writing a letter (even if you don't send it) to express what you're feeling."
        }
      ];
    }
    return [
      {
        title: "Feeling overwhelmed by emotions?",
        description: "When sadness feels heavy, physical movement can help process feelings. Even a 5-minute walk or gentle stretching can shift your emotional state slightly."
      },
      {
        title: "Academic pressures getting you down?",
        description: "School stress can be isolating. Remember that struggling is not a reflection of your worth or abilities - it's part of the learning process."
      },
      {
        title: "Having trouble seeing hope?",
        description: "When our mood is low, we tend to generalize negative feelings to the past and future. Try focusing on just getting through today or even just the next hour."
      }
    ];
  }
  
  // Angry emoji insights
  if (emoji === "😡") {
    if (color === "stress") {
      return [
        {
          title: "Frustrated by unfair deadlines?",
          description: "Academic pressure can create legitimate anger. Before reacting, try the 4-7-8 breathing technique: inhale for 4 counts, hold for 7, exhale for 8."
        },
        {
          title: "Feeling unheard or dismissed?",
          description: "Anger often signals a boundary violation. Consider whether you need to communicate more clearly about your needs in a specific relationship."
        },
        {
          title: "Experiencing persistent irritability?",
          description: "When small things trigger big reactions, it might be a sign of accumulated stress. Physical activity can help discharge tension in your body."
        }
      ];
    }
    return [
      {
        title: "Feeling betrayed or let down?",
        description: "Interpersonal hurts can trigger strong emotions. Before confronting others, clarify what you're feeling and what you need moving forward."
      },
      {
        title: "Angry at yourself for a mistake?",
        description: "Self-directed anger is common but rarely helpful. Would you speak to a friend the way you're speaking to yourself about this situation?"
      },
      {
        title: "Energy building up with nowhere to go?",
        description: "Anger generates physical energy. Try a vigorous activity like running, punching a pillow, or even tearing up paper to release the physical tension safely."
      }
    ];
  }
  
  // Tired emoji insights
  if (emoji === "🥱") {
    return [
      {
        title: "Physically exhausted but mind racing?",
        description: "When your body is tired but your mind won't rest, try a body scan meditation or progressive muscle relaxation to reconnect with physical sensations."
      },
      {
        title: "Too drained to start important tasks?",
        description: "Energy follows the path of least resistance. Try committing to just 5 minutes of a task - often getting started is the hardest part."
      },
      {
        title: "Feeling unmotivated and sluggish?",
        description: "Motivation often follows action, not the other way around. Small wins can generate momentum - what's one tiny step you could take right now?"
      }
    ];
  }
  
  // Neutral emoji insights
  if (emoji === "😐") {
    return [
      {
        title: "Feeling emotionally flat today?",
        description: "Neutral periods are normal and can offer space for reflection. What would you like to feel more of in your day-to-day experience?"
      },
      {
        title: "Going through motions without engagement?",
        description: "Sometimes we operate on autopilot. Try bringing mindful awareness to a routine activity - what sensations, sounds, or textures do you notice?"
      },
      {
        title: "Neither good nor bad, just... here?",
        description: "Emotional neutrality can be a respite between more intense feelings. Consider whether there are self-care practices you've been neglecting while on autopilot."
      }
    ];
  }
  
  // Hopeful emoji insights
  if (emoji === "🌈") {
    if (color === "balance") {
      return [
        {
          title: "Hopeful but need a plan?",
          description: "Hope paired with action is powerful. Consider breaking down your goal into small, achievable steps that you can begin today."
        },
        {
          title: "Feeling a sense of new possibilities?",
          description: "Times of transition often bring a mix of hope and uncertainty. Journaling about both your aspirations and concerns can help clarify your path forward."
        },
        {
          title: "Noticing positive change beginning?",
          description: "Early progress can inspire continued effort. Take a moment to acknowledge how far you've come, even if you have further to go."
        }
      ];
    }
    return [
      {
        title: "Glimpsing light at the end of the tunnel?",
        description: "Hope often emerges after difficult periods. What lessons or strengths have you gained from recent challenges?"
      },
      {
        title: "Feeling cautiously optimistic?",
        description: "Balancing hope with realism is healthy. Consider writing down both your hopes and potential obstacles, along with how you might address each challenge."
      },
      {
        title: "Inspired by new ideas or opportunities?",
        description: "Moments of inspiration are precious. Try capturing your thoughts in a voice memo or quick notes before the feeling passes."
      }
    ];
  }
  
  // Default insights if no specific match
  return [
    {
      title: "Noticing shifts in your emotional state?",
      description: "Tracking patterns in your moods can reveal triggers and help you develop personalized coping strategies."
    },
    {
      title: "Trying to make sense of mixed feelings?",
      description: "Emotions are rarely simple. Try naming the different feelings you're experiencing without judging them as good or bad."
    },
    {
      title: "Looking for ways to support your wellbeing?",
      description: "Small, consistent actions often have more impact than dramatic changes. What's one tiny wellbeing practice you could add to your daily routine?"
    }
  ];
};

const MoodInsights = () => {
  const navigate = useNavigate();
  const { selectedEmoji, selectedEmojiLabel, selectedColor } = useMood();
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null);
  
  // Get insights based on selections
  const insights = getInsights(selectedEmoji, selectedColor);
  
  const handleInsightSelect = (index: number) => {
    setSelectedInsight(index);
  };
  
  const handleContinue = () => {
    navigate("/dashboard");
  };
  
  const bgClass = selectedColor ? `bg-${selectedColor}-gradient` : "bg-background";
  
  return (
    <div className={cn(
      "min-h-screen flex flex-col p-6 pt-12 gradient-animated-bg",
      bgClass
    )}>
      <h1 className="text-2xl font-semibold mb-2">Understanding Your Mood</h1>
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-2">{selectedEmoji}</span>
        <span className="text-lg">{selectedEmojiLabel}</span>
      </div>
      
      <div className="flex flex-col gap-4 mb-8">
        {insights.map((insight, index) => (
          <MoodInsightCard
            key={index}
            title={insight.title}
            description={insight.description}
            onSelect={() => handleInsightSelect(index)}
            isSelected={selectedInsight === index}
          />
        ))}
      </div>
      
      <Button
        onClick={handleContinue}
        className="mt-auto px-6 py-6 text-lg rounded-full self-center"
      >
        Next Step <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

export default MoodInsights;
