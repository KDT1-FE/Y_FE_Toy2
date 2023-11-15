import { useState, useEffect } from "react";

interface Props {
  current: string;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
}

const Timer = ({ current, setCurrent }: Props) => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (current === "자유발언") setIsRunning(true);
  }, [current]);

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
      setCurrent("투표중");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  return (
    <div style={{ border: "1px solid red" }}>
      <h1>{seconds}초</h1>
    </div>
  );
};

export default Timer;
