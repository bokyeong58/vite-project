import React, { useState, useEffect } from 'react';
import './CafeSimulator.css';
import DPanel from './components/DPanel.jsx';
import EOrder from './components/EOrder.jsx';
import EShop from './components/EShop.jsx';
import EInventory from './components/EInventory.jsx';
import ingredientList from './data/ingredientList.js';
import menuList from './data/menuList.js';

export default function CafeSimulator() {
  const [tab, setTab] = useState('order');
  const [subTab, setSubTab] = useState('coffee'); 
  const [money, setMoney] = useState(10000);
  const [inventory, setInventory] = useState({});
  const [customer, setCustomer] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [buyList, setBuyList] = useState([]);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(null);
  const [showGameStartPopup, setShowGameStartPopup] = useState(true);

  useEffect(() => {
    if (message && message !== '') {
      const t = setTimeout(() => setMessage(''), 3500);
      return () => clearTimeout(t);
    }
  }, [message]);

  const handleOrderSuccess = () => {
    setCustomer(null);
    setOrderList([]);
    setTimer(null);
  };

  const switchTab = (t) => {
    setTab(t);
    if (t === 'order') setSubTab('coffee');
    else if (t === 'shop') setSubTab('main');
  };

  const filteredMenus = menuList.filter(m => !subTab || m.category === subTab);
  const filteredIngredients = ingredientList.filter(i => !subTab || i.category === subTab);

  const initializeGame = () => {
    setMoney(10000);
    setInventory({});
    setCustomer(null);
    setOrderList([]);
    setBuyList([]);
    setGameOver(false);
    setTimer(null);
    setMessage('');
    setShowGameStartPopup(true);
    setTab('order');
    setSubTab('coffee');
  };

  return (
    <div className="cafe-layout">
      <div className="top-tabs-e">
        <button className={tab === 'order' ? 'active' : ''} onClick={() => switchTab('order')}>POS</button>
        <button className={tab === 'shop' ? 'active' : ''} onClick={() => switchTab('shop')}>BUY</button>
        <button className={tab === 'inventory' ? 'active' : ''} onClick={() => switchTab('inventory')}>INVENTORY</button>
      </div>

      {(tab === 'order') && (
        <div className="sub-tabs-e">
          <button className={subTab === 'coffee' ? 'sub-active' : ''} onClick={() => setSubTab('coffee')}>커피</button>
          <button className={subTab === 'noncoffee' ? 'sub-active' : ''} onClick={() => setSubTab('noncoffee')}>논커피</button>
          <button className={subTab === 'ade' ? 'sub-active' : ''} onClick={() => setSubTab('ade')}>에이드</button>
          <button className={subTab === 'bakery' ? 'sub-active' : ''} onClick={() => setSubTab('bakery')}>베이커리</button>
        </div>
      )}
      {(tab === 'shop') && (
        <div className="sub-tabs-e">
          <button className={subTab === 'main' ? 'sub-active' : ''} onClick={() => setSubTab('main')}>MAIN</button>
          <button className={subTab === 'powder' ? 'sub-active' : ''} onClick={() => setSubTab('powder')}>파우더</button>
          <button className={subTab === 'base' ? 'sub-active' : ''} onClick={() => setSubTab('base')}>베이스</button>
          <button className={subTab === 'baking' ? 'sub-active' : ''} onClick={() => setSubTab('baking')}>베이킹</button>
        </div>
      )}

      <DPanel
        tab={tab}
        money={money}
        customer={customer}
        orderList={orderList}
        setMoney={(val) => {
          setMoney(prev => {
            const next = typeof val === 'function' ? val(prev) : val;
            if (next <= 0) {
              setGameOver(true);
              return 0;
            }
            return next;
          });
        }}
        setCustomer={setCustomer}
        setOrderList={setOrderList}
        setMessage={setMessage}
        setGameOver={setGameOver}
        timer={timer}
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
            inventory={inventory}
            setMoney={setMoney}
            onOrderSuccess={handleOrderSuccess}
            filteredMenu={filteredMenus}
          />
        )}
        {tab === 'shop' && (
          <EShop
            ingredientList={filteredIngredients}
            inventory={inventory}
            setInventory={setInventory}
            money={money}
            setMoney={setMoney}
            setMessage={setMessage}
            buyList={buyList}
            setBuyList={setBuyList}
          />
        )}
        {tab === 'inventory' && (
          <EInventory inventory={inventory} ingredientList={ingredientList} />
        )}
      </div>

      {message && message !== '' && (
        <div className="warning-box">{message}</div>
      )}

      {showGameStartPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>카페 시뮬레이터</h2>
            <ol>
              <li>처음 아아 시작하면 가진 재료가 없습니다. BUY에서 재료를 구매하세요.</li>
              <li>각 메뉴마다 사용되는 재료가 조금씩 다릅니다!</li>
              <li>POS에서 주문받기로 손님을 받아보세요.</li>
              <li>이상한 손님이 오면 쫓아내세요.</li>
              <li>20초 내에 메뉴를 제공하지 않으면 1,000원을 잃어요ㅠㅠ</li>
            </ol>
            <button className="popup-btn" onClick={() => setShowGameStartPopup(false)}>게임 시작하기</button>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>GAME OVER</h2>
            <button className="popup-btn" onClick={initializeGame}>다시 시작하기</button>
          </div>
        </div>
      )}
    </div>
  );
}
