import React from 'react';
import './EShop.css';

export default function EShop({
  ingredientList,
  inventory,
  setInventory,
  money,
  setMoney,
  setMessage,
  buyList,
  setBuyList
}) {
  const handleSelectIngredient = (item) => {
    setBuyList(prev => {
      const found = prev.find(i => i.name === item.name);
      if (found) return prev;
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const changeQty = (name, delta) => {
    setBuyList(prev => prev.map(item => {
      if (item.name !== name) return item;
      const nextQty = item.qty + delta;
      if (nextQty <= 0) return null;
      return { ...item, qty: nextQty };
    }).filter(Boolean));
  };

  const handlePurchase = () => {
    const totalPrice = buyList.reduce((sum, i) => sum + i.price * i.qty, 0);
    if (money < totalPrice) {
      setMessage('돈이 부족합니다.');
      return;
    }
    setMoney(money - totalPrice);
    setInventory(prev => {
      const updated = { ...prev };
      buyList.forEach(item => {
        updated[item.name] = (updated[item.name] || 0) + item.qty;
      });
      return updated;
    });
    setBuyList([]);
  };

  const totalQty = buyList.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = buyList.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="eshop">
      <div className="ingredient-list">
        {ingredientList.map((item, idx) => (
          <div key={idx} className="ingredient-card" onClick={() => handleSelectIngredient(item)}>
            {item.img && <img src={item.img} alt={item.name} className="ingredient-img" />}
            <div>{item.name}</div>
            <div>{item.price}원</div>
          </div>
        ))}
      </div>

      <div className="order-list">
        {buyList.map((m, idx) => (
          <div className="order-item" key={idx}>
            <button onClick={() => changeQty(m.name, -1)}>-</button>
            {m.name} (단가:{m.price.toLocaleString()}원)
            <button onClick={() => changeQty(m.name, 1)}>+</button>
            <span className="qty">수량:{m.qty}</span>
            <span className="sum">총금액:{(m.price * m.qty).toLocaleString()}원</span>
          </div>
        ))}
        {buyList.length > 0 && (
          <div className="order-total">
            <span>총 수량: {totalQty}개</span>
            <span>총금액: {totalPrice.toLocaleString()}원</span>
            <button onClick={handlePurchase}>구매하기</button>
          </div>
        )}
      </div>
    </div>
  );
}
