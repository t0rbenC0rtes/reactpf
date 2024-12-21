import React, { useEffect, useState } from "react";

const Timer = () => {
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    const startDate = new Date("2024-09-01");
    const calculateElapsedTime = () => {
      const now = new Date();
      const years = now.getFullYear() - startDate.getFullYear();
      const months = now.getMonth() - startDate.getMonth();
      const days = now.getDate() - startDate.getDate();

      let adjustedMonths = months < 0 ? months + 12 : months;
      let adjustedYears = years - (months < 0 ? 1 : 0);
      let adjustedDays = days < 0
        ? new Date(now.getFullYear(), now.getMonth(), 0).getDate() + days
        : days;

      setElapsedTime(`${adjustedYears} years, ${adjustedMonths} months & ${adjustedDays} days`);
    };

    calculateElapsedTime();
    const timer = setInterval(calculateElapsedTime, 86400000); // Update every day
    return () => clearInterval(timer); // Clean up
  }, []);

  return (
    <div>
      <p>Time since I started web development: {elapsedTime}</p>
    </div>
  );
};

export default Timer;
