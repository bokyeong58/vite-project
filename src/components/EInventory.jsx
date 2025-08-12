// src/components/EInventory.jsx
import React from 'react';
import './EInventory.css';

export default function EInventory({ inventory, ingredientList }) {
  // ✅ 재고 1개 이상인 재료만 필터링해서 표시
  const ownedIngredients = ingredientList.filter(item => (inventory[item.name] || 0) > 0);

  return (
    <div className="einventory">
      {ownedIngredients.length === 0 && <p>재고가 없습니다.</p>}
      <div className="inventory-list">
        {ownedIngredients.map((item, idx) => {
          const qty = inventory[item.name] || 0;
          return (
            <div key={idx} className="inventory-card">
              {item.img && <img src={item.img} alt={item.name} className="inventory-img" />}
              <div className="inventory-info">
                <div className="inventory-name">{item.name}</div>
                <div className="inventory-qty">수량: {qty}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
