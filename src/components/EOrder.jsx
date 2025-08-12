import React from 'react';
import './EOrder.css';

export default function EOrder({
  menuList, inventory,
  orderList, setOrderList,
  customer, setMessage, setMoney
}) {

  const getShortageMenus = () => {
    const shortage = [];
    orderList.forEach(item => {
      const totalNeeds = {};
      Object.entries(item.ingredients).forEach(([name, qty]) => {
        totalNeeds[name] = (totalNeeds[name] || 0) + qty * item.qty;
      });
      const isShort = Object.keys(totalNeeds).some(
        ing => (inventory[ing] || 0) < totalNeeds[ing]
      );
      if (isShort) shortage.push(item.name);
    });
    return shortage;
  };

  const shortageMenus = getShortageMenus();

  const handleSelectMenu = (menu) => {
    if (!customer) return;
    // 재료부족 있으면 선택 불가
    const lacks = Object.keys(menu.ingredients).some(
      ing => (inventory[ing] || 0) < menu.ingredients[ing]
    );
    if (lacks) {
      return;
    }
    setOrderList(prev => {
      const found = prev.find(i => i.name === menu.name);
      if (found) return prev;
      return [...prev, { ...menu, qty: 1 }];
    });
  };

  const changeQty = (name, delta) => {
    setOrderList(prev => {
      return prev.map(item => {
        if (item.name !== name) return item;
        const nextQty = item.qty + delta;
        if (nextQty <= 0) return null;
        // 증가 시 재료부족 검사
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
      }).filter(Boolean);
    });
  };

  const totalQty = orderList.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = orderList.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handlePayment = () => {
    if (!customer) return;
    // 이상주문
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
      setMessage(`주문 성공! ${totalPrice.toLocaleString()}원이 지급되었습니다. (손님 팁 +500원)`);
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
            <span className="sum">총금액:{(m.price*m.qty).toLocaleString()}원</span>
          </div>
        ))}
        {orderList.length > 0 && (
          <div className="order-total">
            <span className="total-qty">총 수량: {totalQty}개</span>
            <span className="total-sum">총금액: {totalPrice.toLocaleString()}원</span>
          </div>
        )}
      </div>
      <button onClick={handlePayment}>Q: 결제하기</button>
    </div>
  );
}
