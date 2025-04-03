
import { useState } from "react";
import { Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Predefined therapy bot responses based on keywords
const botResponses = [
  { 
    keywords: ["sad", "lonely", "alone", "depressed"], 
    response: "I'm sorry you're feeling this way. Remember that these feelings are temporary. Would you like to try a quick grounding exercise?"
  },
  { 
    keywords: ["stressed", "anxious", "stress", "worry", "worried"], 
    response: "Stress can be really challenging. Taking deep breaths can help in the moment. Would you like to explore some stress management techniques?"
  },
  { 
    keywords: ["tired", "exhausted", "sleep", "rest"], 
    response: "Rest is essential for mental health. Is there something specific affecting your sleep or energy levels?"
  },
  { 
    keywords: ["angry", "mad", "frustrated"], 
    response: "It's okay to feel frustrated sometimes. Would you like to talk about what's triggering these feelings?"
  },
  { 
    keywords: ["help", "support", "resources"], 
    response: "I'm here to support you. Remember that your campus counseling center is available 24/7 at (555) 123-4567 for professional help."
  }
];

// Default responses when no keywords match
const defaultResponses = [
  "How are you feeling right now? I'm here to listen.",
  "Would you like to talk more about what's on your mind?",
  "Remember to be gentle with yourself. You're doing the best you can.",
  "What self-care activities have helped you in the past?",
  "Is there something specific you'd like support with today?"
];

const TherapyChatbot = () => {
  const [messages, setMessages] = useState<{text: string; isUser: boolean}[]>([
    { text: "Hi there! I'm your therapy chat assistant. How can I support you today?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = { text: inputMessage, isUser: true };
    setMessages([...messages, userMessage]);
    setInputMessage("");
    
    // Bot typing indicator
    setIsTyping(true);
    
    // Generate bot response after a delay
    setTimeout(() => {
      // Check for keyword matches
      const lowercaseInput = inputMessage.toLowerCase();
      let botResponse = "";
      
      // Find matching response based on keywords
      for (const item of botResponses) {
        if (item.keywords.some(keyword => lowercaseInput.includes(keyword))) {
          botResponse = item.response;
          break;
        }
      }
      
      // Use default response if no keywords matched
      if (!botResponse) {
        const randomIndex = Math.floor(Math.random() * defaultResponses.length);
        botResponse = defaultResponses[randomIndex];
      }
      
      // Add bot response
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md h-[350px] flex flex-col">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b">
        <Bot className="h-5 w-5 text-indigo-500" />
        <h2 className="text-lg font-medium">Therapy Chat</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-3 space-y-3">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={cn(
              "max-w-[80%] p-3 rounded-xl animate-fade-in-up",
              message.isUser 
                ? "bg-indigo-100 text-indigo-900 ml-auto rounded-tr-none"
                : "bg-gray-100 text-gray-800 mr-auto rounded-tl-none"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {message.text}
          </div>
        ))}
        
        {isTyping && (
          <div className="bg-gray-100 text-gray-800 max-w-[80%] p-3 rounded-xl rounded-tl-none mr-auto animate-pulse">
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-1"></span>
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-1 animate-bounce" style={{ animationDelay: "0.2s" }}></span>
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-1 focus:ring-indigo-300"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button 
          onClick={handleSendMessage}
          className="rounded-full h-10 w-10 p-0 bg-indigo-400 hover:bg-indigo-500 transition-colors duration-300"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default TherapyChatbot;
