import Home from '../component/Home/Home.js';
import TwoFA from '../component/Login/2FA.js';
import Login from '../component/Login/Login.js';
import MyPage from '../component/MyPage/MyPage.js';
import RoomList from '../component/RoomList/RoomList.js';

export const BASE_URL = 'http://localhost:5173';

export const routes = [
  { path: /^\/$/, element: Home },
  { path: /^\/login$/, element: Login },
  { path: /^\/mypage$/, element: MyPage },
  { path: /^\/room-list$/, element: RoomList },
  { path: /^\/2FA$/, element: TwoFA },
  // { path: /^\/post\/[\w]+$/, element: Post },
  // { path: /^\/shop$/, element: Shop },
];
