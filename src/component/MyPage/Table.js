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
      <tr class="History_table">
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
    let className = 'Friend_table';
    let users = this.props.friends;

    if (this.n === 3) {
      className = 'Block_table';
      users = this.props.blockedUsers;
    }

    return users
      .map(
        (user) => `
      <tr class="${className}">
        <td><img class="user_avatar" src="/bubble.png" alt="user picture"></td>
        <td class="user_name">${user.userName}</td>
        <td><img class="user_dm" src="/eva--message-circle-fill.svg"></td>
        <td><img class="user_delete" src="/eva--close-fill.svg"></td>
      </tr>
    `,
      )
      .join('');
  }
}
