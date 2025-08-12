import React, { useState, useEffect, useRef } from 'react';
import './DPanel.css';
import weirdOrders from './weirdOrders';
import menuList from './menuList';
import { getRandomCustomerImage, getRandomNormalOrder } from '../utils/orderUtils';

export default function DPanel({
  money, setMoney,
  inventory, setInventory,
  customer, setCustomer,
  orderList, setOrderList,
  setMessage, setGameOver
}) {
  const [timer, setTimer] = useState(null);
  const intervalRef = useRef(null);

  // 주문받기
  const handleReceiveOrder = () => {
    if (customer) return; // 손님이 없을 때만
    const isWeird = Math.random() < 0.2; // 20% 이상주문 확률
    const orders = isWeird
      ? weirdOrders[Math.floor(Math.random() * weirdOrders.length)]
      : getRandomNormalOrder(menuList);
    setCustomer({
      img: getRandomCustomerImage(),
      orders,
      isWeird
    });
    setOrderList([]);
    startTimer(20);
  };

  const handleChaseAway = () => {
    if (!customer) return;
    if (customer.isWeird) {
      clearAll();
    } else {
      failOrder();
    }
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
      <div className="buttons">
        <button onClick={handleReceiveOrder}>P: 주문받기</button>
        <button
          onClick={handleChaseAway}
          disabled={!customer}
          className={customer ? 'btn-j-active' : 'btn-j-disabled'}
        >
          J: 쫓아내기
        </button>
      </div>
    </div>
  );
}
