import Component from '../../../core/Component.js';
import '../../../style/Table.css';

export default class HistoryTable extends Component {
  template() {
    return `
      <table class="MyPage__table">
        <caption>
          경기 기록
        </caption>
        <tbody>
          ${this.generateHistoryTable()}
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
          history.winner === this.props.userName ? 'Win' : 'Lose'
        }</td>
      </tr>
    `,
      )
      .join('');
  }
}
