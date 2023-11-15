import { useState, useEffect } from "react";

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 0) {
      setIsRunning(false);
      setSeconds(5);
    }
  }, [seconds]);

  const handleToggle = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  return (
    <div>
      <h1>{seconds}초</h1>
      <button onClick={handleToggle}>시작</button>
    </div>
  );
};

export default Timer;
