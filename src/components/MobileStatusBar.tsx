import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export const MobileStatusBar: React.FC = () => {
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formatted = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes}`;
      setTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold text-white/90 select-none">
      <span className="tracking-tight font-medium text-white">{time}</span>
      <div className="flex items-center gap-1.5 text-white/90">
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center">
          <BatteryMedium className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
