import Home from '../component/Home/Home.js';
import Login from '../component/Login/Login.js';
import MyPage from '../component/MyPage/MyPage.js';

export const BASE_URL = 'http://localhost:5173';

export const routes = [
  { path: /^\/$/, element: Home },
  { path: /^\/login/, element: Login },
  { path: /^\/mypage/, element: MyPage },
  // { path: /^\/post\/[\w]+$/, element: Post },
  // { path: /^\/shop$/, element: Shop },
];
