"use client";

import { createContext, useState, useContext } from "react";
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import TimerList from "@/components/TimerList"; // Import TimerList component

interface Timer {
  event: string;
  targetDate: string; // Keep targetDate as a string to match TimerForm
}

const TimerContext = createContext<{
  timers: Timer[];
  addTimer: (event: string, targetDate: string) => void;
  deleteTimer: (index: number) => void; 
  resetAllTimers: () => void;
} | null>(null);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [timers, setTimers] = useState<Timer[]>([]);

  useCopilotReadable({
    description: "The current list of countdown timers",
    value: JSON.stringify(timers),
  });

  useCopilotAction({
    name: "addTimer",
    description: "Add a countdown timer for a specific event",
    parameters: [
      {
        name: "event",
        type: "string",
        description: "The event name for the timer",
        required: true,
      },
      {
        name: "targetDate",
        type: "string",
        description: "The date and time for the countdown target",
        required: true,
      },
    ],
    handler: ({ event, targetDate }) => {
      addTimer(event, targetDate);
    },
  });

  useCopilotAction({
    name: "deleteTimer",
    description: "Delete a countdown timer by index",
    parameters: [
      {
        name: "index",
        type: "number",
        description: "The index of the timer to delete",
        required: true,
      },
    ],
    handler: ({ index }) => {
      deleteTimer(index);
    },
  });

  useCopilotAction({
    name: "resetAllTimers",
    description: "Reset all countdown timers",
    handler: () => {
      resetAllTimers();
    },
  });

  const addTimer = async (event: string, targetDate: string) => {
    try {
      var time = targetDate;
    // const response = await fetch("/api/format-date", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ targetDate }),
    // });
    // const data = await response.json();

    // const date = data.correctedText;
    //   time = date;
    

    // console.log("outpu------------" ,time);

    setTimers((prev) => [
      ...prev,
      {
        event,
        targetDate: targetDate, 
      },
    ]);
  } catch (error) {
    console.error("Failed to add timer:", error);
  }
};


  const deleteTimer = (index: number) => {
    setTimers((prev) => prev.filter((_, i) => i !== index));
  };

  const resetAllTimers = () => {
    setTimers([]);
  };

  return (
    <TimerContext.Provider
      value={{
        timers,
        addTimer,
        deleteTimer,
        resetAllTimers,
      }}
    >
         {children}
      {/* <TimerForm addTimer={addTimer} /> */}
      <TimerList timers={timers} removeTimer={deleteTimer} />
   
    </TimerContext.Provider>
  );
};

export const useTimers = () => {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useTimers must be used within a TimerProvider");
  return context;
};
