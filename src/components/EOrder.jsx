import React from 'react';
import './EOrder.css';
import { getRandomCustomerImage, getRandomNormalOrder } from '../utils/orderUtils';
import weirdOrders from '../data/weirdOrders';
import menuList from '../data/menuList';
import { startTimer } from '../utils/timerUtils';

export default function EOrder({ 
  customer, setCustomer,
  orderList, setOrderList,
  setMessage, setGameOver,
  setTimer,
  inventory,
  setMoney,
  onOrderSuccess
}) {
  const handleReceiveOrder = () => {
    if (customer) return;

    const isWeird = Math.random() < 0.2;
    const orders = isWeird
      ? weirdOrders[Math.floor(Math.random() * weirdOrders.length)]
      : getRandomNormalOrder(menuList);

    setCustomer({
      img: getRandomCustomerImage(),
      orders,
      isWeird
    });

    setOrderList([]);

    startTimer(setTimer, () => {
      setMessage('1,000원을 잃었습니다.');
      setMoney(m => {
        const next = m - 1000;
        if (next <= 0) setGameOver(true);
        return next;
      });
      setCustomer(null);
      setOrderList([]);
    });
  };

  const shortageMenus = orderList.length > 0 
    ? orderList.filter(item => {
        return Object.keys(item.ingredients).some(
          ing => (inventory[ing] || 0) < item.ingredients[ing] * item.qty
        );
      }).map(item => item.name)
    : [];

  const handleSelectMenu = (menu) => {
    if (!customer) return;
    const lacks = Object.keys(menu.ingredients).some(
      ing => (inventory[ing] || 0) < menu.ingredients[ing]
    );
    if (lacks) return;

    setOrderList(prev => {
      const found = prev.find(i => i.name === menu.name);
      if (found) return prev;
      return [...prev, { ...menu, qty: 1 }];
    });
  };

  const changeQty = (name, delta) => {
    setOrderList(prev => prev.map(item => {
      if (item.name !== name) return item;
      const nextQty = item.qty + delta;
      if (nextQty <= 0) return null;

      if (delta > 0) {
        const needed = {};
        Object.entries(item.ingredients).forEach(([ing, q]) => {
          needed[ing] = q * nextQty;
        });
        const lacks = Object.keys(needed).some(
          ing => (inventory[ing] || 0) < needed[ing]
        );
        if (lacks) return item;
      }
      return { ...item, qty: nextQty };
    }).filter(Boolean));
  };

  const totalQty = orderList.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = orderList.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handlePayment = () => {
    if (!customer) return;

    if (customer.isWeird) {
      setMessage('1,000원을 잃었습니다.');
      setMoney(m => m - 1000);
      return;
    }

    const match = customer.orders.length === orderList.length &&
      customer.orders.every(co => {
        const matchItem = orderList.find(o => o.name === co.name);
        return matchItem && matchItem.qty === co.qty;
      });

    if (match) {
      const finalPrice = totalPrice + 500;
      setMoney(m => m + finalPrice);
      setMessage(
        `주문 성공! ${totalPrice.toLocaleString()}원이 지급되었습니다. (손님 팁 +500원)`
      );
      if (onOrderSuccess) onOrderSuccess();
    } else {
      setMessage('1,000원을 잃었습니다.');
      setMoney(m => m - 1000);
    }
  };

  return (
    <div className="eorder">
      <div className="menu-list">
        {menuList.map((m, idx) => (
          <div
            key={idx}
            className={`menu-card ${shortageMenus.includes(m.name) ? 'shortage' : ''}`}
            onClick={() => handleSelectMenu(m)}
          >
            <div className="menu-name">{m.name}</div>
            <div className="menu-price">{m.price}원</div>
          </div>
        ))}
      </div>

      <div className="order-list">
        {orderList.map((m, idx) => (
          <div className="order-item" key={idx}>
            <button onClick={() => changeQty(m.name, -1)}>-</button>
            {m.name} (단가:{m.price.toLocaleString()}원)
            <button onClick={() => changeQty(m.name, 1)}>+</button>
            <span className="qty">수량:{m.qty}잔</span>
            <span className="sum">총금액:{(m.price * m.qty).toLocaleString()}원</span>
          </div>
        ))}
        {orderList.length > 0 && (
          <div className="order-total">
            <span className="total-qty">총 수량: {totalQty}개</span>
            <span className="total-sum">총금액: {totalPrice.toLocaleString()}원</span>
          </div>
        )}
      </div>

      <div className="order-actions">
        <button onClick={handleReceiveOrder}>주문받기</button>
        <button onClick={handlePayment}>결제하기</button>
      </div>
    </div>
  );
}
