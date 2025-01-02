import { useEffect, useState } from "react";

interface IUseCounterDown {
  timer?: number;
  validationValue?: boolean;
}

export const useTimerCountDown = (props: IUseCounterDown) => {
  const timer: number = props.timer ?? 60;
  const [secondsLeft, setSecondsLeft] = useState<number>(timer);

  let timerId: NodeJS.Timeout;
  useEffect(() => {
    if (props.validationValue) {
      props.validationValue && startTimer();
    }
    return () => clearTimeout(timerId);
  }, [props.validationValue, secondsLeft]);

  const startTimer = () => {
    timerId = setTimeout(() => {
      if (secondsLeft <= 0) {
        clearTimeout(timerId);
        return false;
      }
      setSecondsLeft(secondsLeft - 1);
    }, 1000);
  };

  const onStartAgain = () => {
    setSecondsLeft(timer);
    clearTimeout(timerId);
    startTimer();
  };

  return {
    onStartAgain,
    secondsLeft,
  };
};
