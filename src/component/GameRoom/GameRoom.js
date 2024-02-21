import Component from '../../core/Component';
import { $ } from '../../utils/querySelector';
import GameScreen from './GameScreen.js';
import GameChat from './GameChat.js';
import '../../style/GameRoom.css';

export default class GameRoom extends Component {
  constructor($target, props) {
    super($target, props);
  }

  mounted() {
    this.appendInfoWrapper();

    const $gameScreen = this.$target.querySelector('#gameScreenContainer');
    const $gameChat = this.$target.querySelector('#gameChatContainer');

    new GameScreen($gameScreen, this.state, '', '', '2', '1');
    new GameChat($gameChat, this.state, '', '');
  }

  appendInfoWrapper() {
    const $wrapper = document.createElement('div');
    $wrapper.id = 'GameRoom_wrapper';
    this.$target.appendChild($wrapper);

    $wrapper.style.height = '100vh';

    $wrapper.innerHTML = `
      <div class="w-full h-full flex">
        <div class="w-[1728px] h-[1117px] m-auto flex">
          <div id="gameScreenContainer"></div>
          <div id="gameChatContainer"></div>
        </div>
      </div>`;
  }
}
