import Login from '../component/Login/Login.js';
import notfound from '../component/notfound.js';

export const BASE_URL = "http://localhost:5173";

export const routes = [
  { path: /^\/$/, element: Login },
  { path: /^\/login/, element: notfound },
  // { path: /^\/post\/[\w]+$/, element: Post },
  // { path: /^\/shop$/, element: Shop },
];