import React, { useState } from 'react';
import './CafeSimulator.css';
import DPanel from './Components/DPanel';
import EOrder from './Components/EOrder';
import EShop from './components/EShop';
import EInventory from './components/EInventory';
import ingredientList from './data/ingredientList';

export default function CafeSimulator() {
  const [tab, setTab] = useState('order');
  const [money, setMoney] = useState(10000);
  const [inventory, setInventory] = useState({});
  const [customer, setCustomer] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(null); // 타이머 상태

  // 주문 성공 후 초기화
  const handleOrderSuccess = () => {
    setCustomer(null);
    setOrderList([]);
    setTimer(null);
  };

  const switchTab = (t) => {
    setTab(t);
    if (t !== 'order' && t !== 'shop') return;
    setOrderList([]);
  };

  return (
    <div className="cafe-layout">
      {/* 상단 탭 */}
      <div className="top-tabs">
        <button onClick={() => switchTab('order')}>POS</button>
        <button onClick={() => switchTab('shop')}>BUY</button>
        <button onClick={() => switchTab('inventory')}>INVENTORY</button>
      </div>

      {/* DPanel: 상태 표시 */}
      <DPanel
        tab={tab}
        money={money}
        inventory={inventory}
        customer={customer}
        orderList={orderList}
        setMoney={setMoney}
        setCustomer={setCustomer}
        setOrderList={setOrderList}
        setMessage={setMessage}
        setGameOver={setGameOver}
        timer={timer}
      />

      {/* E영역 */}
      <div className="e-container">
        {tab === 'order' && (
          <EOrder
            customer={customer}
            setCustomer={setCustomer}
            orderList={orderList}
            setOrderList={setOrderList}
            setMessage={setMessage}
            setGameOver={setGameOver}
            setTimer={setTimer}
            inventory={inventory}
            setMoney={setMoney}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        {tab === 'shop' && (
          <EShop
            ingredientList={ingredientList}
            inventory={inventory}
            setInventory={setInventory}
            money={money}
            setMoney={setMoney}
            setMessage={setMessage}
          />
        )}

        {tab === 'inventory' && (
          <EInventory inventory={inventory} />
        )}
      </div>

      {/* 메시지 */}
      {message && <div className="t-message">{message}</div>}

      {/* 게임오버 팝업 */}
      {gameOver && (
        <div className="gameover-popup">
          <h2>GAME OVER</h2>
          <button onClick={() => {
            setMoney(10000);
            setInventory({});
            setCustomer(null);
            setOrderList([]);
            setGameOver(false);
            setTimer(null);
          }}>다시 시작하기</button>
        </div>
      )}
    </div>
  );
}
