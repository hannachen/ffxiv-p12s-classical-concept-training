import {useEffect, useState} from 'react';
import {GameStatus} from '../hooks/useGame';

interface TimerProps {
  startTime: number;
  gameStatus?: GameStatus;
}

export const Timer = ({startTime, gameStatus, ...props}: TimerProps) => {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState('00:00:00');

  const clearTime = () => {
    setTime('00:00:00');
    setCount(0);
  };

  const showTimer = (ms) => {
    const milliseconds = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, '0');
    const second = Math.floor((ms / 1000) % 60)
      .toString()
      .padStart(2, '0');
    const minute = Math.floor((ms / 1000 / 60) % 60)
      .toString()
      .padStart(2, '0');
    setTime(minute + ':' + second + ':' + milliseconds);
  };

  useEffect(() => {
    if (gameStatus === GameStatus.ShowResult) {
      console.log('showing results');
      showTimer(count);
      return;
    }
    if (gameStatus === GameStatus.Playing) {
      setTime('00:00:00');
      setCount(0);
      console.log('playing... new', startTime);
      console.log('new counter', count);
    }
    const id = setInterval(() => {
      var left = count + (new Date() - startTime);
      setCount(left);
      showTimer(left);
    }, 1);
    return () => clearInterval(id);
  }, [gameStatus, startTime]);

  return (
    <div {...props} className="text-white text-lg">
      {time}
    </div>
  );
};
