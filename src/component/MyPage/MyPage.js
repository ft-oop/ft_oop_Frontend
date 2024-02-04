import Component from '../../core/Component.js';
import '../../style/MyPage.css';
import { $ } from '../../utils/querySelector.js';
import Table from './Table.js';
import handleButtons from './handleButtons.js';

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
      blockedUsers: [
        {
          userName: 'block1',
          picture: '',
        },
        {
          userName: 'block2',
          picture: '',
        },
      ],
    };
  }

  mounted() {
    this.appendInfoWrapper();

    const $profile = this.$target.querySelector('#MyPage_profile');
    const $historyTable = this.$target.querySelector('#MyPage_info__history');
    const $friendTable = this.$target.querySelector('#MyPage_info__user_list');

    $profile.innerHTML = `
      <div class="w-[100px] h-[100px] rounded-full overflow-hidden">
        <img id="mypage_avatar" src="/image1.jpg" alt="profile" class="w-[100%] h-[100%] object-cover">
      </div>
      <div id="mypage_profile__wrapper">
        <div id="mypage_name">${this.state.userName}</div>
        <div id="mypage_winlose">${this.state.totalWinScore}승 ${this.state.totalLoseScore}패</div>
        </div>
      <img id="mypage_edit" src="/edit.svg" alt="edit">
    `;

    new Table($historyTable, '경기 기록', 1, this.state);
    new Table($friendTable, '친구 목록', 2, this.state);
  }

  appendInfoWrapper() {
    const $wrapper = document.createElement('div');
    $wrapper.id = 'MyPage_wrapper';
    this.$target.appendChild($wrapper);

    $wrapper.innerHTML = `
    <div class="w-full h-full flex flex-col items-start overflow-auto">
      <div class="w-[calc(100% - 400px)] min-w-[800px] max-w-[1200px] flex flex-col items-start m-auto">
        <div id="MyPage_profile_container">
          <div id="MyPage_profile"></div>
        </div>
        <div id="MyPage_info">
          <div id="MyPage_info__history"></div>
          <div id="MyPage_info__user_list"></div>
        </div>
      </div>
    </div>`;
  }

  setEvent() {
    this.$target.addEventListener('click', this.handleButton.bind(this));
  }

  handleButton(event) {
    const button = event.target;

    handleButtons(this.$target, this.state, button);
  }
}
