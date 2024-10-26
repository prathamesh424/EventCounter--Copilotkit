// src/components/Countdown.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CountdownProps {
  event: string;
  targetDate: string;
  onTimeUp: () => void;
  onRemove: () => void; // Add a prop for the remove function
}

const Countdown: React.FC<CountdownProps> = ({ event, targetDate, onTimeUp, onRemove }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      onTimeUp();
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timeArray = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <motion.div 
      className="bg-gray-800 p-4 rounded-lg shadow-lg text-center space-y-2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold mb-4">{event}</h2>
      <div className="flex justify-around space-x-2">
        {timeArray.map((time, index) => (
          <motion.div 
            key={index}
            className="flex flex-col items-center text-2xl font-bold"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="p-4 bg-blue-600 rounded-lg shadow-lg">
              {time.value}
            </div>
            <div className="text-sm mt-1">{time.label}</div>
          </motion.div>
        ))}
      </div>
      <button
        onClick={onRemove}
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition duration-300"
      >
        Remove
      </button>
    </motion.div>
  );
};

export default Countdown;
