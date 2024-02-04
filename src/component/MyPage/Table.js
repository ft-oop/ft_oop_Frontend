import Component from '../../core/Component.js';
import '../../style/Table.css';

export default class Table extends Component {
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

    if (this.n === 3) {
      leftImage = '/arrow-left-enabled.svg';
      rightImage = '/arrow-right-disabled.svg';
    }
    return `
      <table id="MyPage__table">
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
          ${
            this.n === 1
              ? this.generateHistoryTable()
              : this.generateUserTable()
          }
        </tbody>
      </table>
    `;
  }

  generateHistoryTable() {
    const { matchHistories } = this.props;

    return matchHistories
      .map(
        (history) => `
      <tr id="History_table">
        <td class="history_date">${history.scoreDate}</td>
        <td class="history_content">${this.props.userName} vs ${
          history.userName
        }</td>
        <td class="history_result">${
          history.winner === 'user' ? 'Win' : 'Lose'
        }</td>
      </tr>
    `,
      )
      .join('');
  }

  generateUserTable() {
    let idName = 'Friend_table';
    let users = this.props.friends;
    let display = 'display: inline';

    if (this.n === 3) {
      idName = 'Block_table';
      users = this.props.blockedUsers;
      display = 'display: none';
    }

    return users
      .map(
        (user) => `
      <tr id="${idName}">
        <td class="flex ml-[20px]">
          <div class="w-[40px] h-[40px] relative">
            ${/* Online: #60D395, Offline: #D3606E */ ''}
            ${
              this.n === 2
                ? `<div class="w-[10px] h-[10px] rounded-full bg-[#60D395] absolute right-0 bottom-0"></div>`
                : ''
            }
            ${/* Avatar */ ''}
            <div class="w-[40px] h-[40px] rounded-full overflow-hidden">
              <img src="/image2.jpg" alt="profile" class="user_avatar w-[100%] h-[100%] object-cover cursor-pointer">
            </div>
          </div>
        </td>
        ${/* Name */ ''}
        <td class="user_name">${user.userName}</td>
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
