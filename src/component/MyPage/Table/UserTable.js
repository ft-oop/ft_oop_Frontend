import Component from '../../../core/Component.js';
import '../../../style/Table.css';
import { tableNumbers } from '../../../constant/tableNumbers.js';

export default class UserTable extends Component {
  constructor($target, title, n, props) {
    super($target, props);
    this.$target = $target;
    this.props = props;
    this.title = title;
    this.n = n;
    this.setup();
    this.setEvent();
    this.render();
  }

  template() {
    let leftImage = '/arrow-left-disabled.svg';
    let rightImage = '/arrow-right-enabled.svg';

    if (this.n === tableNumbers.BLOCK) {
      leftImage = '/arrow-left-enabled.svg';
      rightImage = '/arrow-right-disabled.svg';
    }

    return `
      <table class="MyPage__table">
        <caption>
          <img src="${leftImage}" class="icon_left" id="icon_left${
      this.n
    }" alt="left-fill"></img>
          ${this.title}
          <img src="${rightImage}" class="icon_right" id="icon_right${
      this.n
    }" alt="right-fill"></img>
        </caption>
        <tbody>
          ${this.generateUserTable()}
        </tbody>
      </table>
    `;
  }

  generateUserTable() {
    let idName = 'Friend_table';
    let users = this.props.friends;
    let display = 'display: inline';
    let type = 'friend';

    // console.log('Friend Table');

    if (this.n === tableNumbers.BLOCK) {
      idName = 'Block_table';
      users = this.props.blockedUsers;
      display = 'display: none';
      type = 'block';
    }

    return users
      .map(
        (user) => `
      <tr id="${idName}">
        <td class="flex ml-[20px]">
          <div class="w-[40px] h-[40px] relative">
            ${/* Online: #60D395, Offline: #D3606E */ ''}
            ${
              this.n === tableNumbers.FRIEND
                ? `<div class="w-[10px] h-[10px] rounded-full bg-[#60D395] absolute right-0 bottom-0"></div>`
                : ''
            }
            ${/* Avatar */ ''}
            <div class="w-[40px] h-[40px] rounded-full overflow-hidden">
            ${/* 전달받은 이미지로 경로 수정해야 함 */ ''}  
              <img src="/image2.jpg" alt="profile" id="${type}_avatar_${
          user.userName
        }" class="user_avatar w-[100%] h-[100%] object-cover cursor-pointer">
            </div>
          </div>
        </td>
        ${/* Name */ ''}
        <td id="${type}_name_${user.userName}" class="user_name">${
          user.userName
        }</td>
        ${/* DM */ ''}
        <td><img class="user_dm" src="/eva--message-circle-fill.svg" style="${display}"></td>
        ${/* Delete */ ''}
        <td><img class="user_delete" src="/eva--close-fill.svg"></td>
      </tr>
    `,
      )
      .join('');
  }
}