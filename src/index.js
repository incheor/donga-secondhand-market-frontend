import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Route 활용을 위한 라이브러리
import ReactDOM from 'react-dom/client';
import Root from './Root.js';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; // 리액트 부트스트랩 적용

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();