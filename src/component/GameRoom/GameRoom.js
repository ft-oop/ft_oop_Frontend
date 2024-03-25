import Component from '../../core/Component.js';
import { $ } from '../../utils/querySelector.js';
import GameScreen from './GameScreen.js';
import { navigate } from '../../utils/navigate.js';
import PongGame from './PongGame.js';
import { initWebSocket, socket } from '../../utils/socket.js';

export default class GameRoom extends Component {
  constructor($target, props) {
    super($target, props);
    this.setup();
  }

  mounted() {
    this.appendInfoWrapper();

    const $gameScreen = $('#gameScreenContainer');
    new GameScreen($gameScreen, this.state, '', '', '0', '0');

    const $gameScene = $('#gameScene');

    const startbutton = document.getElementById('ready');

    startbutton.addEventListener('click', () => {
      const game = new PongGame();
      game.pong();
      startbutton.disabled = true;
    });
  }

  appendInfoWrapper() {
    const $wrapper = document.createElement('div');
    $wrapper.id = 'GameRoom_wrapper';
    this.$target.appendChild($wrapper);

    $wrapper.style.height = '100vh';

    $wrapper.innerHTML = `
      <div class="w-full h-full flex">
      <img id='goBack' src="../../../public/eva--arrow-back-fill.svg" alt="close" class='h-8 absolute top-6 left-6 rounded-full p-1 hover:shadow-md'/>
        <div class="w-[1728px] h-[1117px] m-auto">
          <div class="w-full h-[100px] flex">
            <div class="w-[1485px] h-full"></div>
            <button class="w-[75px] h-[32px] mt-10  hover:bg-gray-300 font-bold rounded-xl shadow-md">초대</button>
            <div class="w-[6px] h-full"></div>
            <button class="w-[75px] h-[32px] mt-10  hover:bg-gray-300 font-bold rounded-xl shadow-md">강퇴</button>
          </div>
          <div class="w-full h-[917px] flex">
            <div id="gameScreenContainer"></div>
          </div>
          <div class="w-full h-[100px] grid place-items-center">
            <button id = "ready" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">준비</button>
          </div>
        </div>
      </div>`;

    this.addEvent('click', '#goBack', (e) => {
      navigate('/');
    });
  }

  setEvent() {
    if (this.$target.classList.contains('GameRoomEvents')) return;

    this.$target.classList.add('GameRoomEvents');
    this.$target.addEventListener('click', this.handleButton.bind(this));
  }

  handleButton(event) {
    const button = event.target;

    //handleButtons(this.$target, this.state, button);
  }
}
