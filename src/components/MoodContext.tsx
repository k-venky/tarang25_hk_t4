
import React, { createContext, useState, useContext, useEffect } from "react";

interface MoodContextType {
  selectedEmoji: string;
  selectedEmojiLabel: string;
  selectedColor: string;
  hasCompletedCheckIn: boolean;
  setSelectedEmoji: (emoji: string, label: string) => void;
  setSelectedColor: (color: string) => void;
  setHasCompletedCheckIn: (value: boolean) => void;
  resetMoodSelection: () => void;
}

const defaultContext: MoodContextType = {
  selectedEmoji: "",
  selectedEmojiLabel: "",
  selectedColor: "",
  hasCompletedCheckIn: false,
  setSelectedEmoji: () => {},
  setSelectedColor: () => {},
  setHasCompletedCheckIn: () => {},
  resetMoodSelection: () => {}
};

const MoodContext = createContext<MoodContextType>(defaultContext);

export const useMood = () => useContext(MoodContext);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check local storage for existing values
  const [selectedEmoji, setEmoji] = useState<string>(() => {
    return localStorage.getItem("selectedEmoji") || "";
  });
  
  const [selectedEmojiLabel, setEmojiLabel] = useState<string>(() => {
    return localStorage.getItem("selectedEmojiLabel") || "";
  });
  
  const [selectedColor, setColor] = useState<string>(() => {
    return localStorage.getItem("selectedColor") || "";
  });
  
  const [hasCompletedCheckIn, setCompleted] = useState<boolean>(() => {
    return localStorage.getItem("hasCompletedCheckIn") === "true";
  });

  // Update local storage when values change
  useEffect(() => {
    localStorage.setItem("selectedEmoji", selectedEmoji);
    localStorage.setItem("selectedEmojiLabel", selectedEmojiLabel);
    localStorage.setItem("selectedColor", selectedColor);
    localStorage.setItem("hasCompletedCheckIn", hasCompletedCheckIn.toString());
  }, [selectedEmoji, selectedEmojiLabel, selectedColor, hasCompletedCheckIn]);

  const setSelectedEmoji = (emoji: string, label: string) => {
    setEmoji(emoji);
    setEmojiLabel(label);
  };

  const setSelectedColor = (color: string) => {
    setColor(color);
  };

  const setHasCompletedCheckIn = (value: boolean) => {
    setCompleted(value);
  };

  const resetMoodSelection = () => {
    setEmoji("");
    setEmojiLabel("");
    setColor("");
    setCompleted(false);
  };

  return (
    <MoodContext.Provider
      value={{
        selectedEmoji,
        selectedEmojiLabel,
        selectedColor,
        hasCompletedCheckIn,
        setSelectedEmoji,
        setSelectedColor,
        setHasCompletedCheckIn,
        resetMoodSelection
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};
