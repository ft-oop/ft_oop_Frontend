import Component from '../../../core/Component.js';
import { $ } from '../../../utils/querySelector.js';

export default class HistoryTable extends Component {
  template() {
    return `
      <table class="MyPage__table">
        <caption>
          경기 기록
        </caption>
        <tbody class="TableBody">
        </tbody>
      </table>
    `;
  }

  mounted() {
    const tbody = this.$target.querySelector('.TableBody');

    if ($('#user_info_history')) {
      tbody.style.height = '410px';
    }

    tbody.innerHTML = this.generateHistoryTable();
  }

  generateHistoryTable() {
    const { matchHistories } = this.props;

    if (matchHistories === undefined) {
      return ``;
    } else {
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
}
