// src/components/TimerForm.tsx
"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface TimerFormProps {
  addTimer: (event: string, targetDate: string) => void;
}

const TimerForm: React.FC<TimerFormProps> = ({ addTimer }) => {
  const [event, setEvent] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [isValid, setIsValid] = useState(false);

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
    console.log(event)
    if (event && isValid) {
      addTimer(event, targetDate);
      setEvent('');
      setTargetDate('');
      setIsValid(false);
    }
  };

  return (
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
  );
};

export default TimerForm;
