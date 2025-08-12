import React from 'react';
import './EInventory.css';

export default function EInventory({ inventory }) {
  const items = Object.entries(inventory).filter(([name, qty]) => qty > 0);

  return (
    <div className="einventory">
      {items.map(([name, qty], idx) => (
        <div key={idx} className="inv-card">
          <div className="inv-img">[이미지]</div>
          <div className="inv-name">{name}</div>
          <div className="inv-qty">재고: {qty}</div>
        </div>
      ))}
      {items.length === 0 && <div>인벤토리에 재료가 없습니다.</div>}
    </div>
  );
}
