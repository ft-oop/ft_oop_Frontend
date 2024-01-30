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
    return `
      <table class="MyPage__table">
        <caption>${this.title}</caption>
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
      <tr class="Friend_table">
        <td>${friend.userName}</td>
      </tr>
    `,
      )
      .join('');
  }
}
