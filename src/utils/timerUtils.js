// utils/timerUtils.js
export function startTimer(setTimer, onTimeout) {
  setTimer(20);
  const interval = setInterval(() => {
    setTimer(prev => {
      if (prev <= 1) {
        clearInterval(interval);
        onTimeout();
        return null;
      }
      return prev - 1;
    });
  }, 1000);
}
