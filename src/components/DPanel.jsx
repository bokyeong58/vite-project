import React from 'react';
import './DPanel.css';

export default function DPanel({
  tab,
  money,
  customer,
  orderList,
  setMoney,
  setCustomer,
  setOrderList,
  setMessage,
  setGameOver,
  timer
}) {
  const clearAll = () => {
    setCustomer(null);
    setOrderList([]);
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
    if (!customer) return;
    if (customer.isWeird) {
      clearAll();
    } else {
      failOrder();
    }
  };

  return (
    <div className="dpanel">
      <div className="money">💰 소지금: {money.toLocaleString()}원</div>
      <div className="timer">⏳ {timer !== null ? timer : '--'}</div>

      <div className="customer-area">
        {customer?.img && (
          <img src={customer.img} alt="손님" className="customer-img" />
        )}
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
  );
}
