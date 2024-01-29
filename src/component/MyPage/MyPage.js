import Component from '../../core/Component.js';
import TableHistory from './TableHistory.js';
import TableFriend from './TableFriend.js';
import '../../style/MyPage.css';

export default class MyPage extends Component {
  setup() {
    this.state = {
      userName: 'user',
      picture: '',
      totalWinScore: 1,
      totalLoseScore: 0,
      matchHistories: [
        {
          userName: 'op',
          winner: 'user',
          scoreDate: '2024-01-29',
        },
      ],
      friends: [
        {
          userName: 'friend1',
          picture: '',
        },
      ],
    };
  }

  template() {
    console.log('MyPage template');
    return `
      <img id="back" src="/eva--arrow-back-fill.svg" alt="back arrow">
      <div class="MyPage_container">
        <div class="MyPage_profile_container">
          <div class="MyPage_profile"></div>
        </div>
        <div class="MyPage_info">
          <div class="MyPage_info__history"></div>
          <div class="MyPage_info__friend_list"></div>
        </div>
      </div>
    `;
  }

  mounted() {
    const { TableMaker } = this;
    const $historyTable = this.$target.querySelector('.MyPage_info__history');
    const $friendTable = this.$target.querySelector(
      '.MyPage_info__friend_list',
    );

    new TableHistory($historyTable, this.state.userName, '경기 기록', {
      matchHistories: this.state.matchHistories,
    });

    new TableFriend($friendTable, '친구 목록', {
      friends: this.state.friends,
    });
  }
}
