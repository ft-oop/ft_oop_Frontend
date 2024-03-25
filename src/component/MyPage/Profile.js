import Component from '../../core/Component.js';

export default class Profile extends Component {
  constructor($target, props, icon1, icon2) {
    super($target, props);
    this.$target = $target;
    this.props = props;
    this.icon1 = icon1;
    this.icon2 = icon2;
    this.iconID1 = '';
    this.iconID2 = '';
    this.setup();
    this.setEvent();
    this.render();
  }

  setIconID() {
    if (this.icon1 === '../../../public/add_friend.svg') {
      this.iconID1 = 'icon_add_friend';
    } else if (this.icon1 === '../../../public/delete_friend.svg') {
      this.iconID1 = 'icon_delete_friend';
    }

    if (this.icon2 === '../../../public/edit.svg') {
      this.iconID2 = 'edit_modal_open';
    } else if (this.icon2 === '../../../public/block.svg') {
      this.iconID2 = 'icon_block';
    } else if (this.icon2 === '../../../public/unblock.svg') {
      this.iconID2 = 'icon_unblock';
    }
  }

  template() {
    this.setIconID();

    return `
    ${/* 전달받은 이미지로 경로 수정해야 함 */ ''}
      <div class="w-[100px] h-[100px] rounded-full overflow-hidden">
        <img id="mypage_avatar" src="${
          this.props.picture
        }" alt="profile" class="w-[100%] h-[100%] object-cover">
      </div>
      <div id="mypage_profile__wrapper">
        <div id="mypage_name">${this.props.username}</div>
        <div id="mypage_winlose">${this.props.total_win}승 ${
      this.props.total_lose
    }패</div>
      </div>
      ${this.icon1 !== '' ? this.createIcon1() : ''}
      <img id="${this.iconID2}" src="${
      this.icon2
    }" class="w-[40px] h-[40px] mx-[20px] cursor-pointer" alt="edit">
    `;
  }

  createIcon1() {
    return `
      <img id="${this.iconID1}" src="${this.icon1}" class="w-[40px] h-[40px] ml-[20px] cursor-pointer" alt="edit">
    `;
  }
}
