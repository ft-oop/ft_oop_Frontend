import Router from './router.js';

function App($container) {
  this.$container = $container;

  const init = () => {
    new Router($container);
  };

  init();
}

export default App;
