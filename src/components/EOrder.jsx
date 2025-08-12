import React from 'react';
import './EOrder.css';
import { getRandomCustomerImage, getRandomNormalOrder } from '../utils/orderUtils';
import weirdOrders from '../data/weirdOrders';
import { startTimer } from '../utils/timerUtils';

export default function EOrder({
  customer, setCustomer,
  orderList, setOrderList,
  setMessage, setGameOver,
  setTimer,
  inventory,
  setMoney,
  onOrderSuccess,
  filteredMenu
}) {
  const handleReceiveOrder = () => {
    if (customer) return;

    const isWeird = Math.random() < 0.2;
    const orders = isWeird
      ? weirdOrders[Math.floor(Math.random() * weirdOrders.length)] // 문자열
      : getRandomNormalOrder(filteredMenu);

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
        if (next <= 0) {
          setGameOver(true);
          return 0;
        }
        return next;
      });
      setCustomer(null);
      setOrderList([]);
    });
  };

  const handleSelectMenu = (menu) => {
    if (!customer) return;

    if (shortageMenus.includes(menu.name)) return;

    setOrderList(prev => {
      const found = prev.find(i => i.name === menu.name);
      if (found) {
        return prev;
      }
      return [...prev, { ...menu, qty: 1 }];
    });
  };

  const changeQty = (name, delta) => {
    setOrderList(prev => prev.map(item => {
      if (item.name !== name) return item;
      const nextQty = item.qty + delta;
      if (nextQty <= 0) return null; // 수량 0이면 삭제
      return { ...item, qty: nextQty };
    }).filter(Boolean));
  };

  const totalQty = orderList.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = orderList.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handlePayment = () => {
    if (!customer) return;

    if (customer.isWeird) { // 이상 주문
      setMessage('1,000원을 잃었습니다.');
      setMoney(m => {
        const next = m - 1000;
        if (next <= 0) {
          setGameOver(true);
          return 0;
        }
        return next;
      });
      setTimer(null);
      return;
    }

    const match = customer.orders.length === orderList.length &&
      customer.orders.every(co => {
        const matchItem = orderList.find(o => o.name === co.name);
        return matchItem && matchItem.qty === co.qty;
      });

    if (match) {
      const finalPrice = totalPrice + 500;
      setInventory(prev => {
      const updated = { ...prev };
      orderList.forEach(menu => {
        Object.entries(menu.ingredients).forEach(([ing, qty]) => {
          updated[ing] = (updated[ing] || 0) - qty * menu.qty;
          if (updated[ing] < 0) updated[ing] = 0;
        });
      });
      return updated;
    });
      setMoney(m => m + finalPrice);
      setMessage(`주문 성공! ${totalPrice.toLocaleString()}원 + 팁 500원`);
      onOrderSuccess();
      setTimer(null);
    } else {
      setMessage('1,000원을 잃었습니다.');
      setMoney(m => {
        const next = m - 1000;
        if (next <= 0) {
          setGameOver(true);
          return 0;
        }
        return next;
      });
      setCustomer(null);
      setOrderList([]);
      setTimer(null);
    }
  };
  const shortageMenus =
  customer && !customer.isWeird
    ? filteredMenu
        .filter(menu => {
          return Object.entries(menu.ingredients).some(([ing, qty]) => {
            // 현재 장바구니(orderList)에 담긴 모든 메뉴에서 이 재료를 몇 개 소모 예정인지 합산
            const reserved = orderList.reduce((sum, o) => {
              return sum + ((o.ingredients[ing] || 0) * o.qty);
            }, 0);

            // 현재 보유 재고
            const available = inventory[ing] || 0;

            // 보유 재고 - 이미 담은 소모 예정량 < 이번 메뉴 1개 필요량 → 부족
            return (available - reserved) < qty;
          });
        })
        .map(m => m.name)
    : [];


  return (
    <div className="eorder">
      <div className="menu-list">
  {filteredMenu.map((m, idx) => (
    <div
      key={idx}
      className={`menu-card ${shortageMenus.includes(m.name) ? 'shortage' : ''}`}
      onClick={() => handleSelectMenu(m)}
    >
      {m.img && <img src={m.img} alt={m.name} className="menu-card-img" />}
      <div className="menu-name">{m.name}</div>
      <div className="menu-price">{m.price}원</div>
      {shortageMenus.includes(m.name) && (
        <div className="shortage-label" style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>
          재료 부족
        </div>
      )}
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
