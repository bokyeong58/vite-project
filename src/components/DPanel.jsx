import React, { useState, useEffect, useRef } from 'react';
import './DPanel.css';
import weirdOrders from '../data/weirdOrders';
import menuList from '../data/menuList';
import { getRandomCustomerImage, getRandomNormalOrder } from '../utils/orderUtils';
import { startTimer } from '../utils/timerUtils';

export default function DPanel({
  tab,
  money, setMoney,
  inventory, setInventory,
  customer, setCustomer,
  orderList, setOrderList,
  setMessage, setGameOver
}) {
  const [timer, setTimer] = useState(null);
  const intervalRef = useRef(null);

// 주문받기 시
const newCustomerImg = getRandomCustomerImage();
setCustomer({
  img: newCustomerImg,
  orders,
  isWeird,
});


  const handleChaseAway = () => {
    if (!customer) return;
    if (customer.isWeird) {
      clearAll();
    } else {
      failOrder();
    }
  };

  const handleOrderSuccess = () => {
  clearAll(); // 손님 정보, 타이머 모두 리셋
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

  const startTimer = (sec) => {
    setTimer(sec);
    intervalRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          failOrder();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const clearAll = () => {
    clearInterval(intervalRef.current);
    setTimer(null);
    setCustomer(null);
    setOrderList([]);
  };

  return (
    <div className="dpanel">
      <div className="money">💰 소지금: {money.toLocaleString()}원</div>
      <div className="timer">⏳ {timer !== null ? timer : '--'}</div>
      <div className="customer-area">
        {customer?.img && <img src={customer.img} alt="손님" className="customer-img" />}
        <div className="orders">
          {Array.isArray(customer?.orders)
            ? customer.orders.map((o, idx) => (
              <div key={idx}>{o.name} {o.qty}개</div>
            ))
            : customer?.orders}
        </div>
      </div>

        <button
          onClick={handleChaseAway}
          disabled={!customer}
          className={customer ? 'btn-j-active' : 'btn-j-disabled'}
        >
          쫓아내기
        </button>
      </div>
    </div>
  );
}
