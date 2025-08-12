export function startTimer(setTimer, onExpire, duration = 20) {
  let timeLeft = duration;
  setTimer(timeLeft);

  const intervalId = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      setTimer(null);
      if (typeof onExpire === 'function') {
        onExpire();
      }
    } else {
      setTimer(timeLeft);
    }
  }, 1000);

  return intervalId;
}

export function stopTimer(intervalId) {
  if (intervalId) {
    clearInterval(intervalId);
  }
}
