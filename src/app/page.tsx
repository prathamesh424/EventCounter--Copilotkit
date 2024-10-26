'use client';

import { useState, useEffect } from 'react';
import TimerList from '../components/TimerList';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { TimerProvider } from './context/CounterContext';
import { CopilotPopup } from "@copilotkit/react-ui";

interface Timer {
  event: string;
  targetDate: string;
}

export default function Home() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [event, setEvent] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const addTimer = (event: string, targetDate: string) => {
    setTimers([...timers, { event, targetDate }]);
  };

  const removeTimer = (index: number) => {
    const newTimers = [...timers];
    newTimers.splice(index, 1);
    setTimers(newTimers);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value).getTime();
    const now = new Date().getTime();

    if (date > now) {
      setTargetDate(e.target.value);
      setIsValid(true);
    } else {
      setIsValid(false);
      toast.error('Please select a future date and time!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (event && isValid) {
      addTimer(event, targetDate);
      console.log("time format : " , targetDate)
      setEvent('');
      setTargetDate('');
      setIsValid(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center p-4 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Countdown Timer
      </motion.h1>
      
      <TimerProvider>
        <form onSubmit={handleSubmit} className="mb-8 space-y-4 w-full max-w-md mx-auto">
          <div>
            <label htmlFor="event" className="block text-sm text-gray-400">Event Name</label>
            <input
              id="event"
              type="text"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event name"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm text-gray-400">Target Date & Time</label>
            <input
              id="date"
              type="datetime-local"
              value={targetDate}
              onChange={handleDateChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`w-full p-3 rounded shadow-lg text-white font-bold ${isValid ? 'bg-blue-600' : 'bg-blue-600 cursor-not-allowed'}`}
            disabled={!isValid}
          >
            Set Timer
          </motion.button>
        </form>

        <TimerList timers={timers} removeTimer={removeTimer} />
        <br />

      </TimerProvider >

      <CopilotPopup
        instructions={
          "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
        }
        labels={{
          title: "Countdown Timer",
          initial: "Pass the arguments in this format : YYYY-MM-DDTHH:MM , for example :- 2024-10-26T17:00  ",
        }}
      />
      <Toaster />
    </main>
  );
}
