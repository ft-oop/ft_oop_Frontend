import Component from '../../core/Component.js';
import Table from './Table.js';
import '../../style/MyPage.css';

export default class MyPage extends Component {
  setup() {
    this.state = {
      userName: 'user',
      picture: '',
      totalWinScore: 1,
      totalLoseScore: 1,
      matchHistories: [
        {
          userName: 'op1',
          winner: 'user',
          scoreDate: '2024-01-29',
        },
        {
          userName: 'op2',
          winner: 'op2',
          scoreDate: '2024-01-30',
        },
      ],
      friends: [
        {
          userName: 'friend1',
          picture: '',
        },
        {
          userName: 'friend2',
          picture: '',
        },
        {
          userName: 'friend3',
          picture: '',
        },
      ],
    };
  }

  template() {
    console.log('MyPage template');
    return `
      <div class="Wrapper">
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
      </div>
    `;
  }

  mounted() {
    const $profile = this.$target.querySelector('.MyPage_profile');
    const $historyTable = this.$target.querySelector('.MyPage_info__history');
    const $friendTable = this.$target.querySelector(
      '.MyPage_info__friend_list',
    );

    $profile.innerHTML = `
      <img id="mypage_avatar" src="/bubble.png" alt="profile">
      <div id="mypage_profile__wrapper">
        <div id="mypage_name">${this.state.userName}</div>
        <div id="mypage_winlose">${this.state.totalWinScore}승 ${this.state.totalLoseScore}패</div>
        </div>
      <img id="mypage_edit" src="/eva--edit-2-fill.svg" alt="edit">
    `;

    new Table($historyTable, '경기 기록', 1, this.state);
    new Table($friendTable, '친구 목록', 2, this.state);
  }
}
