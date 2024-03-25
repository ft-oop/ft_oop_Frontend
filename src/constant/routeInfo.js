import Home from '../component/Home/Home.js';
import TwoFA from '../component/Login/2FA.js';
import Login from '../component/Login/Login.js';
import MyPage from '../component/MyPage/MyPage.js';
import RoomList from '../component/RoomList/RoomList.js';
import GameRoom from '../component/GameRoom/GameRoom.js';
import Tournament from '../component/GameRoom/Tournament.js';
import Loading from '../component/Loading.js';

// export const BASE_URL = 'http://localhost:5173';
export const BASE_URL = 'http://10.13.6.5:5173/';

export const routes = [
  { path: /^\/$/, element: Home },
  { path: /^\/login$/, element: Login },
  { path: /^\/mypage$/, element: MyPage },
  { path: /^\/room-list$/, element: RoomList },
  { path: /^\/game-room$/, element: GameRoom },
  { path: /^\/tournament$/, element: Tournament },
  { path: /^\/2FA$/, element: TwoFA },
  { path: /^\/loading$/, element: Loading },
  // { path: /^\/post\/[\w]+$/, element: Post },
  // { path: /^\/shop$/, element: Shop },
];
