import Home from '../component/Home/Home.js';
import Login from '../component/Login/Login.js';

export const BASE_URL = 'http://localhost:5173';

export const routes = [
  { path: /^\/$/, element: Home },
  { path: /^\/login/, element: Login },
  // { path: /^\/post\/[\w]+$/, element: Post },
  // { path: /^\/shop$/, element: Shop },
];
