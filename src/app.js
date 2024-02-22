import Router from './router';

function App($container) {
  this.$container = $container;

  const init = () => {
    socketConnect();
    new Router($container);
  };

  const socketConnect = () => {
    const socket = new WebSocket('ws://localhost:3000');

    // 연결 성공 시 호출
    socket.onopen = () => {
      console.log('Connected to the server');
    };

    // 메시지 수신 시 호출
    socket.onmessage = (event) => {
      console.log('Message:', event.data);
    };

    socket.send('Hello, Server');
  };

  init();
}

export default App;
