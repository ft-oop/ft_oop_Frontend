import Component from '../../core/Component';
import { $ } from '../../utils/querySelector';

export default class GameChat extends Component {
  constructor($target, props, picture1, picture2) {
    super($target, props);
    this.$target = $target;
    this.props = this.props;
    this.picture1 = picture1;
    this.picture2 = picture2;
    this.setup();
    this.setEvent();
    this.render();
  }
}
