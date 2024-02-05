import Component from '../../core/Component';
import { $ } from '../../utils/querySelector';
import Profile from './Profile';
import Table from './Table';

export default class UserInfo extends Component {
  // constructor($target, props) {
  //   super($target, props);
  //   this.$target = $target;
  //   this.props = props;
  //   this.setup();
  //   this.setEvent();
  //   this.render();
  // }

  setup() {
    this.state = {
      userName: this.props,
      picture: '',
      totalWinScore: 15,
      totalLoseScore: 4,
      matchHistories: [
        {
          userName: 'op1',
          winner: 'friend1',
          scoreDate: '2024-01-29',
        },
      ],
    };
  }

  template() {
    return `
      <div class="w-[800px] h-[800px] relative justify-center
        bg-white rounded-[30px] flex-col p-[50px]">
        <img src="/eva--close-fill.svg" alt="icon close" id="confirm_close"
          class="absolute top-[20px] right-[20px] w-[40px] h-[40px] cursor-pointer"
        />
        <div id="user_info_container"
          class="w-[100%] h-[100%]"
        >
        </div>
      </div>
    `;
  }

  mounted() {
    const information = this.$target.querySelector('#user_info_container');
    const profile = document.createElement('div');
    profile.id = 'user_info_profile';

    this.setUserInfoContainer(profile);
    this.setUserInfoProfile(profile);

    information.appendChild(profile);

    new Profile(profile, this.state, '/delete_friend.svg', '/block.svg');

    // tables
    const historyTable = document.createElement('div');
    historyTable.id = 'user_info_history';

    this.setUserHistoryTable(historyTable);

    information.appendChild(historyTable);

    new Table(historyTable, '경기 기록', 1, this.state);
  }

  setUserInfoContainer(info) {
    info.style.width = '100%';
    info.style.height = '100%';

    info.style.display = 'flex';
    info.style.flexDirection = 'column';
    info.style.justifyContent = 'center';
    info.style.alignItems = 'center';
  }

  setUserInfoProfile(profile) {
    profile.style.width = '100%';
    profile.style.height = '200px';

    profile.style['padding-left'] = '50px';
    profile.style['padding-right'] = '50px';

    profile.style.display = 'flex';
    profile.style.flexDirection = 'row';
    profile.style.justifyContent = 'center';
    profile.style.alignItems = 'center';
  }

  setUserHistoryTable(table) {
    table.style.width = '100%';
    table.style.height = 'calc(100% - 200px)';

    table.style['background-color'] = 'beige';
  }
}
