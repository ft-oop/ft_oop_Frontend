import Component from '../../core/Component';
import { $ } from '../../utils/querySelector.js';

export default class Confirm extends Component {
  constructor($target, stat, props, targetUser = '') {
    super($target, props);
    this.$target = $target;
    this.props = props;
    this.targetUser = targetUser;
    this.stat = stat;
    this.setWrapper();
    this.setup();
    this.setEvent();
    this.render();
  }

  setWrapper() {
    this.$target.style.position = 'absolute';
    this.$target.style.top = '0';
    this.$target.style.left = '0';
    this.$target.style.width = '100%';
    this.$target.style.height = '100%';
    this.$target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    this.$target.style.display = 'flex';
    this.$target.style.justifyContent = 'center';
    this.$target.style.alignItems = 'center';
    this.$target.style['backdrop-filter'] = 'blur(1.5px)';
  }

  template() {
    return `
      <div class="w-[400px] h-[200px] flex justify-center flex-col bg-white rounded-[30px] px-[40px]">
        <div class="h-[76px] pb-[20px] text-lg font-medium">
        ${this.targetUser === '' ? '' : this.targetUser + ' 님을<br />'}
        ${
          this.stat === 'friend'
            ? this.targetUser === ''
              ? '친구 목록에서 삭제되었습니다.'
              : '친구 목록에서 삭제하시겠습니까?'
            : this.targetUser === ''
            ? '차단 목록에서 삭제되었습니다.'
            : '차단 목록에서 삭제하시겠습니까?'
        }
        </div>
        <div class="w-full h-[40px] flex flex-row-reverse">
          ${this.createButtons()}
        </div>
      </div>
    `;
  }

  createButtons() {
    let buttonID = 'confirm_ok';

    if (this.targetUser === '') {
      buttonID = 'confirm_close';
    }

    return `<button id="${buttonID}" type="submit" class="btn btn-primary" style="background-color:#007bff; margin-left:8px; border-radius: 8px; padding-left:30px; padding-right:30px">확인</button>
    ${
      this.targetUser === ''
        ? ''
        : '<button type="button" id="confirm_close" class="btn btn-secondary" style="background-color:#6c757d; border-radius: 8px; padding-left:30px; padding-right:30px">취소</button>'
    }
    `;
  }
}
