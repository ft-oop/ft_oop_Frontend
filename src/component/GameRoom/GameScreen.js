import Component from '../../core/Component';
import { $ } from '../../utils/querySelector';

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

      <div class="w-full h-4/5 bg-gray-100">

      </div>
    `;
  }
}
