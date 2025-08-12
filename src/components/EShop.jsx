import React, { useState } from 'react';
import './EShop.css';

export default function EShop({
  ingredientList,
  inventory, setInventory,
  money, setMoney,
  setMessage
}) {
  const [cart, setCart] = useState([]);

  const handleAdd = (item) => {
    setCart(prev => {
      const found = prev.find(i => i.name === item.name);
      if (found) {
        return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const changeQty = (name, delta) => {
    setCart(prev => prev.map(i => {
      if (i.name !== name) return i;
      const newQty = i.qty + delta;
      if (newQty <= 0) return null;
      return { ...i, qty: newQty };
    }).filter(Boolean));
  };

  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handlePurchase = () => {
    if (totalPrice > money) return;
    const newInv = { ...inventory };
    cart.forEach(i => {
      newInv[i.name] = (newInv[i.name] || 0) + i.qty;
    });
    setInventory(newInv);
    setMoney(m => m - totalPrice);
    setMessage(`재료 구매 완료! -${totalPrice.toLocaleString()}원 소비했습니다.`);
    setCart([]);
  };

  return (
    <div className="eshop">
      <div className="ingredient-list">
        {ingredientList.map((item, idx) => (
          <div key={idx} className="ingredient-card" onClick={() => handleAdd(item)}>
            <div>{item.name}</div>
            <div>{item.price.toLocaleString()}원</div>
          </div>
        ))}
      </div>
      <div className="cart-list">
        {cart.map((i, idx) => (
          <div key={idx} className="cart-item">
            <button onClick={() => changeQty(i.name, -1)}>-</button>
            {i.name} ({i.price.toLocaleString()}원)
            <button onClick={() => changeQty(i.name, 1)}>+</button>
            <span>수량: {i.qty}</span>
            <span>합계: {(i.price * i.qty).toLocaleString()}원</span>
          </div>
        ))}
        {cart.length > 0 && (
          <div className="cart-total">
            총금액: {totalPrice.toLocaleString()}원
          </div>
        )}
      </div>
      <button
        onClick={handlePurchase}
        disabled={totalPrice === 0 || totalPrice > money}
      >
        R: 구매하기
      </button>
    </div>
  );
}
