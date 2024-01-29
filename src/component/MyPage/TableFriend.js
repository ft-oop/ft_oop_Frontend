import Component from '../../core/Component.js';

export default class TableFriend extends Component {
  constructor($target, title, props) {
    super($target, props);
    this.$target = $target;
    this.props = props;
    this.title = title;
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
    const { friends } = this.props;
    return friends.map(
      (friend) => `
      <tr>
        <td>${friend.userName}</td>
      </tr>
    `,
    );
  }
}
