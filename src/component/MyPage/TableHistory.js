import Component from '../../core/Component.js';

export default class TableHistory extends Component {
  constructor($target, user, title, props) {
    super($target, props);
    this.$target = $target;
    this.props = props;
    this.user = user;
    this.title = title;
    console.log(props);
    this.setup();
    this.setEvent();
    this.render();
  }

  template() {
    return `
      <table class="myPage__table">
        <caption>${this.title}</caption>
        <tbody>
          ${this.generateTableBody()}
        </tbody>
      </table>
    `;
  }

  generateTableBody() {
    const { matchHistories } = this.props;
    return matchHistories
      .map(
        (history) => `
      <tr>
        <td>${history.scoreDate}</td>
        <td>${this.user} vs ${history.userName}</td>
        <td>${history.winner === 'user' ? 'Win' : 'Lose'}</td>
      </tr>
    `,
      )
      .join('');
  }
}
