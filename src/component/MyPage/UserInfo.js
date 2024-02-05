import Component from '../../core/Component';
import { $ } from '../../utils/querySelector';

export default class UserInfo extends Component {
  constructor($target, userName, props) {
    super($target, props);
    this.$target = $target;
    this.userName = userName;
    this.props = props;
    this.setup();
    this.setEvent();
    this.render();
  }

  template() {
    return `
      <div class="w-[800px] h-[800px] relative justify-center
        bg-white rounded-[30px] flex-col p-[20px]">
        <div class="absolute top-[20px] right-[20px]">
          <img src="/eva--close-fill.svg" alt="icon close"
            id="confirm_close" class="w-[40px] h-[40px] cursor-pointer"/>
        </div>
      </div>
      `;
  }
}
