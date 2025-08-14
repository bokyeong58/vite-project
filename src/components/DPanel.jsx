import React from 'react';
import './DPanel.css';
import { stopTimer } from '../utils/timerUtils';

export default function DPanel({
  money,
  customer,
  orderList,
  setMoney,
  setCustomer,
  setOrderList,
  setMessage,
  setGameOver,
  timer,
  setTimer
}) {
  const clearAll = () => {
    setCustomer(null);
    setOrderList([]);
    setTimer(null); // 🟢 쫓아내거나 실패 시 타이머도 함께 초기화
  };

  const failOrder = () => {
    setMoney(m => {
      const next = m - 1000;
      if (next <= 0) {
        setGameOver(true);
        return 0;
      }
      return next;
    });
    setMessage('1,000원을 잃었습니다.');
    clearAll();
  };

  const handleChaseAway = () => {
    console.log('쫓아내기 함수 실행됨!', customer);
    if (!customer) {
      console.log('customer 없음 > 조기 return');
      return;
    }
    stopTimer(setTimer);
    if (customer.isWeird) clearAll();
    else failOrder();
  };

  return (
  <div className="dpanel">
    <div className="customer-order-wrapper">
      <div className="top-info">
      <div className="money">💰 소지금: {money.toLocaleString()}원</div>
      <div className="timer">⏳ {timer !== null ? timer : '--'}</div>
      </div>

          <div className="customer-area">
            {customer?.img && (
              <img
                src={customer.img}
                alt="손님"
                className="customer-img"
                style={{ width: '150px', height: '150px' }}
              />
            )}
            <div className="orders">
              {Array.isArray(customer?.orders)
                ? customer.orders.map((o, idx) => (
                    <div key={idx}>{o.name} {o.qty}개</div>
                  ))
                : <div>{customer?.orders}</div>}
            </div>
          </div>

          <div className="bottom-buttons">
          <button
            onClick={handleChaseAway}
            disabled={!customer}
            className={customer ? 'btn-j-active' : 'btn-j-disabled'}>쫓아내기
          </button>
          </div>
        </div>
      </div>
  );
}
