let socket = null;

function initWebSocket() {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    socket = new WebSocket('ws://localhost:8000/ws/');
  }

  socket.onopen = () => {
    console.log('Connected to the server');
  };

  socket.onclose = () => {
    console.log('Disconnected from the server');
  };
}

initWebSocket();

export { initWebSocket, socket };
