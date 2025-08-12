// 이전에 동작 중인 타이머 interval을 추적할 변수
let currentTimerId = null;

/**
 * 카운트다운 타이머 시작
 * @param {Function} setTimer - UI의 타이머 상태 변경 함수
 * @param {Function} onExpire - 타이머 종료 시 실행할 콜백
 * @param {number} duration - 시작 시간(초), 기본값 20초
 */
export function startTimer(setTimer, onExpire, duration = 20) {
  // 기존 타이머가 있다면 먼저 중지
  if (currentTimerId) {
    clearInterval(currentTimerId);
    currentTimerId = null;
  }

  let timeLeft = duration;
  setTimer(timeLeft);

  currentTimerId = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft <= 0) {
      clearInterval(currentTimerId);
      currentTimerId = null;
      setTimer(null);
      if (typeof onExpire === 'function') {
        onExpire();
      }
    } else {
      setTimer(timeLeft);
    }
  }, 1000);

  return currentTimerId;
}

/**
 * 현재 동작 중인 타이머 중지
 */
export function stopTimer() {
  if (currentTimerId) {
    clearInterval(currentTimerId);
    currentTimerId = null;
  }
}
