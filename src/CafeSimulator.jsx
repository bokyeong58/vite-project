import React, { useState } from 'react';
import './CafeSimulator.css';
import DPanel from './components/DPanel';
import EOrder from './components/EOrder';
import EShop from './components/EShop';
import EInventory from './components/EInventory';
import menuList from './data/menuList';
import ingredientList from './data/ingredientList';
import weirdOrders from './data/weirdOrders';

export default function CafeSimulator() {
  const [tab, setTab] = useState('order'); // order | shop | inventory
  const [money, setMoney] = useState(10000);
  const [inventory, setInventory] = useState({});
  const [customer, setCustomer] = useState(null); // {orders:[], isWeird:bool}
  const [orderList, setOrderList] = useState([]);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const switchTab = (t) => {
    setTab(t);
    if (t !== 'order' && t !== 'shop') return;
    setOrderList([]); // 1-E, 2-E 초기화 규칙
  };

  return (
    <div className="cafe-layout">
      <div className="top-tabs">
        <button onClick={() => switchTab('order')}>POS</button>
        <button onClick={() => switchTab('shop')}>BUY</button>
        <button onClick={() => switchTab('inventory')}>INVENTORY</button>
      </div>

      <DPanel
        tab={tab}
        money={money}
        setMoney={setMoney}
        inventory={inventory}
        setInventory={setInventory}
        customer={customer}
        setCustomer={setCustomer}
        orderList={orderList}
        setOrderList={setOrderList}
        setMessage={setMessage}
        setGameOver={setGameOver}
      />

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
          money={money}
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

      {message && <div className="t-message">{message}</div>}
      {gameOver && (
        <div className="gameover-popup">
          <h2>GAME OVER</h2>
          <button onClick={() => {
            setMoney(10000);
            setInventory({});
            setCustomer(null);
            setOrderList([]);
            setGameOver(false);
          }}>다시 시작하기</button>
        </div>
      )}
    </div>
  );
}
