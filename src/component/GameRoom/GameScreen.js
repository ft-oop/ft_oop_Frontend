import Component from '../../core/Component.js';

export default class GameScreen extends Component {
  constructor($target, props, picture1, picture2, score1, score2) {
    super($target, props);
    this.$target = $target;
    this.props = this.props;
    this.picture1 = picture1;
    this.picture2 = picture2;
    this.score1 = score1;
    this.score2 = score2;
    this.setup();
    this.setEvent();
    this.render();
  }

  template() {
    return `
      <div class="w-full h-1/5">
        <div id="gameScreenInfo">
          <div id="gameScreenPicture1"></div>
          <div id="gameScreenScore">
            <p id="gameScreenScoreNum">${this.score1} : ${this.score2}</p>
          </div>
          <div id="gameScreenPicture2"></div>
        </div>
      </div>

      <div id="pongScene" class="w-full h-4/5">
        <canvas id="myCanvas" class="w-full h-full bg-gray-400">준비버튼을 눌러주세요</canvas>
      </div>
    `;
  }
}
