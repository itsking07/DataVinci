import React, { useEffect, useState } from 'react';
import { FcAlarmClock } from 'react-icons/fc';

const Banner = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  const offerEndDate = new Date('2023-07-26').getTime();  //set time to show the end date of offer
  const calculateTimeRemaining = () => {
    const currentTime = new Date().getTime();
    const remaining = offerEndDate - currentTime;
    return remaining > 0 ? remaining : 0;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="bg-amber-600 text-white py-4 px-6 flex flex-col sm:flex-row items-center justify-between">
      <div className="text-center flex items-center">
        <FcAlarmClock className="text-2xl mr-2" />
        <p className="font-medium text-lg">LIMITED TIME OFFER</p>
      </div>

      <div className="text-center flex items-center mt-2 sm:mt-0">
        <p className="font-medium">
          {timeRemaining > 0 ? `Ends in: ${formatTime(timeRemaining)}` : 'Offer has ended'}
        </p>
      </div>

      <div className="text-center flex items-center mt-2 sm:mt-0">
        <p className="font-medium">Get 10% off - Use code: DISCOUNT10</p>
      </div>
    </div>
  );
};

export default Banner;


