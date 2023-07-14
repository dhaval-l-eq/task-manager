import cls from './Clock.module.css';
import { useState } from 'react';

function getCurrentTime() {
   return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function Clock() {
   const [time, setTime] = useState(getCurrentTime());

   setInterval(() => setTime(getCurrentTime()),60 * 1000);

   return (
      <div className={cls.clock}>
         <h2 className={cls.time}>{time}</h2>
      </div>
   );
}
export default Clock;
