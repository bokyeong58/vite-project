import React from 'react';
import ReactDOM from 'react-dom/client';
import CafeSimulator from './CafeSimulator'; // 아까 만든 CafeSimulator.jsx 경로
import './CafeSimulator.css'; // 스타일 파일 불러오기

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CafeSimulator />
  </React.StrictMode>
);
