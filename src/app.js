import Router from './router';

function App($container) {
  this.$container = $container;

  const init = () => {
    // const socket = new WebSocket('ws://localhost:3000');
    new Router($container);
  };

  init();
}

export default App;
