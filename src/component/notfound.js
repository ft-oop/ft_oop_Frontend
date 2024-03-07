import Component from '../core/Component.js';
import Loading from './Loading.js';

export default class NotFound extends Component {
  template() {
    return ``;
  }

  mounted() {
    new Loading(this.$target, null, 404);
    // 404 메시지를 나중에 수정하는게 더 나으려나
  }
}
