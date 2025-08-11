import React, { useState, useEffect } from 'react';
import './styles.css';

const initialIngredients = {
  원두: 5,
  물: 5,
  우유: 5,
  바닐라시럽: 5,
  연유: 5,
  딸기: 5,
  바나나: 5,
  녹차파우더: 5,
  복숭아시럽: 5,
  청포도베이스: 5,
  청사과베이스: 5,
  자몽베이스: 5,
  레몬베이스: 5,
  망고베이스: 5,
  코코아파우더: 5,
  계란: 5,
  소시지: 5,
  생크림: 5,
  탄산수: 5
};

const menuList = [
  { name: '아메리카노', price: 2000, ingredients: { 원두: 1, 물: 1 } },
  { name: '바닐라라떼', price: 3000, ingredients: { 원두: 1, 우유: 1, 바닐라시럽: 1 } },
  { name: '돌체라떼', price: 3500, ingredients: { 원두: 1, 우유: 1, 연유: 1 } },
  { name: '큰 아메리카노', price: 3000, ingredients: { 원두: 2, 물: 2 } },
  { name: '큰 바닐라라떼', price: 4000, ingredients: { 원두: 2, 우유: 2, 바닐라시럽: 2 } },
  { name: '큰 돌체라떼', price: 4500, ingredients: { 원두: 2, 우유: 2, 연유: 2 } },
  { name: '딸기라떼', price: 3000, ingredients: { 딸기: 1, 우유: 1 } },
  { name: '바나나라떼', price: 3000, ingredients: { 바나나: 1, 우유: 1 } },
  { name: '녹차라떼', price: 3000, ingredients: { 녹차파우더: 1, 우유: 1 } },
  { name: '복숭아아이스티', price: 2500, ingredients: { 복숭아시럽: 1, 물: 1 } },
  { name: '큰 딸기라떼', price: 4000, ingredients: { 딸기: 2, 우유: 2 } },
  { name: '큰 바나나라떼', price: 4000, ingredients: { 바나나: 2, 우유: 2 } },
  { name: '큰 녹차라떼', price: 4000, ingredients: { 녹차파우더: 2, 우유: 2 } },
  { name: '청포도에이드', price: 3000, ingredients: { 청포도베이스: 1, 탄산수: 1 } },
  { name: '청사과에이드', price: 3000, ingredients: { 청사과베이스: 1, 탄산수: 1 } },
  { name: '자몽에이드', price: 3000, ingredients: { 자몽베이스: 1, 탄산수: 1 } },
  { name: '레몬에이드', price: 3000, ingredients: { 레몬베이스: 1, 탄산수: 1 } },
  { name: '망고에이드', price: 3000, ingredients: { 망고베이스: 1, 탄산수: 1 } },
  { name: '초코크레이프', price: 3500, ingredients: { 코코아파우더: 1, 계란: 1, 우유: 1 } },
  { name: '핫도그', price: 3500, ingredients: { 소시지: 1, 계란: 1, 우유: 1 } },
  { name: '롤케익', price: 3500, ingredients: { 생크림: 1, 계란: 1, 우유: 1 } },
  { name: '큰 초코크레이프', price: 4500, ingredients: { 코코아파우더: 2, 계란: 2, 우유: 2 } },
  { name: '큰 핫도그', price: 4500, ingredients: { 소시지: 2, 계란: 2, 우유: 2 } },
  { name: '큰 롤케익', price: 4500, ingredients: { 생크림: 2, 계란: 2, 우유: 2 } },
];

export default function CafeSimulator() {
  const [money, setMoney] = useState(10000);
  const [inventory, setInventory] = useState(initialIngredients);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(''), 3500);
      return () => clearTimeout(t);
    }
  }, [message]);

  const handleSelectMenu = (menu) => {
    setSelectedMenu((prev) => [...prev, menu]);
  };

  const checkInventory = () => {
    const totalNeeds = {};
    selectedMenu.forEach(menu => {
      Object.entries(menu.ingredients).forEach(([name, qty]) => {
        totalNeeds[name] = (totalNeeds[name] || 0) + qty;
      });
    });
    const shortage = Object.keys(totalNeeds).filter(
      name => (inventory[name] || 0) < totalNeeds[name]
    );
    return shortage;
  };

  const handlePurchase = () => {
    const shortage = checkInventory();
    if (shortage.length > 0) {
      setMessage(`재료 부족: ${shortage.join(', ')}`);
      return;
    }
    let totalPrice = selectedMenu.reduce((sum, m) => sum + m.price, 0);
    totalPrice += 500; // 팁
    const newInventory = { ...inventory };
    selectedMenu.forEach(menu => {
      Object.entries(menu.ingredients).forEach(([name, qty]) => {
        newInventory[name] -= qty;
      });
    });
    setInventory(newInventory);
    setMoney(money + totalPrice);
    setSelectedMenu([]);
    setMessage(`주문 성공! +${totalPrice}원`);
  };

  return (
    <div className="cafe-container">
      <h1>카페 시뮬레이터</h1>
      <div className="status">
        <div>💰 소지금: {money}원</div>
        <div>⏳ 타이머: {timer ?? '--'}</div>
      </div>
      <div className="menu-list">
        {menuList.map((menu, idx) => (
          <div
            key={idx}
            className={`menu-card ${
              checkInventory().some(s => menu.ingredients[s]) ? 'shortage' : ''
            }`}
            onClick={() => handleSelectMenu(menu)}
          >
            <div className="menu-name">{menu.name}</div>
            <div className="menu-price">{menu.price}원</div>
          </div>
        ))}
      </div>
      <div className="selected-menu">
        <h2>선택한 메뉴</h2>
        {selectedMenu.map((m, i) => (
          <div key={i}>{m.name}</div>
        ))}
      </div>
      <button onClick={handlePurchase}>결제</button>
      {message && <div className="message">{message}</div>}
    </div>
  );
}
