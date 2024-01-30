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
    let buttonDisplay = 'inline';

    if (this.n === 1) {
      buttonDisplay = 'none';
    }
    return `
      <table class="MyPage__table">
        <caption>
          <img src="/eva--arrow-left-fill.svg" class="icon_left" alt="left-fill" style="display: ${buttonDisplay}"/>
          ${this.title}
          <img src="/eva--arrow-right-fill.svg" class="icon_right" alt="left-fill" style="display: ${buttonDisplay}"/>
        </caption>
        <tbody>
          ${
            this.n === 1
              ? this.generateHistoryTable()
              : this.n === 2
              ? this.generateUserTable()
              : this.generateBlockTable()
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
        <td id="history_date">${history.scoreDate}</td>
        <td id="history_content">${this.props.userName} vs ${
          history.userName
        }</td>
        <td id="history_result">${
          history.winner === 'user' ? 'Win' : 'Lose'
        }</td>
      </tr>
    `,
      )
      .join('');
  }

  generateUserTable() {
    const { friends } = this.props;
    return friends
      .map(
        (friend) => `
      <tr class="User_table">
        <td><img id="user_avatar" src="/bubble.png" alt="user picture"></td>
        <td id="user_name">${friend.userName}</td>
        <td><img id="user_dm" src="/eva--message-circle-fill.svg"></td>
        <td><img id="user_delete" src="/eva--close-fill.svg"></td>
      </tr>
    `,
      )
      .join('');
  }

  generateBlockTable() {
    return `
      <tr class="Block_table">
        <td><img id="user_avatar" src="/bubble.png" alt="block picture"></td>
        <td id="user_name">${this.props.userName}</td>
        <td><img id="user_delete" src="/eva--close-fill.svg"></td>
      </tr>
    `;
  }
}
