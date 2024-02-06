import Component from '../../../core/Component';
import { $ } from '../../../utils/querySelector';
import Profile from '../Profile';
import HistoryTable from '../Table/HistoryTable';

export default class UserInfo extends Component {
  constructor($target, props) {
    super($target, props);
    this.$target = $target;
    this.props = props;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {
    this.state = {
      userName: this.props,
      picture: '',
      totalWinScore: 15,
      totalLoseScore: 4,
      matchHistories: [
        {
          userName: 'op1',
          winner: this.props,
          scoreDate: '2024-01-29',
        },
        {
          userName: 'op2',
          winner: 'op2',
          scoreDate: '2024-01-29',
        },
      ],
      friends: [],
      blockedUsers: [],
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

    if ($('#Friend_table')) {
      new Profile(profile, this.state, '/delete_friend.svg', '/block.svg');
    } else if ($('#Block_table')) {
      new Profile(profile, this.state, '', '/block.svg');
    }
    // tables
    const userHistoryTable = document.createElement('div');
    userHistoryTable.id = 'user_info_history';

    this.setUserHistoryTable(userHistoryTable);

    information.appendChild(userHistoryTable);

    new HistoryTable(userHistoryTable, this.state);

    const tbody = this.$target.querySelector('tbody');
    tbody.style.height = '410px';
  }

  setUserInfoContainer(info) {
    info.style.width = '100%';
    info.style.height = '100%';

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
    table.style.height = '500px';

    table.style.display = 'flex';
    table.style.overflow = 'hidden';

    table.style.borderRadius = '30px';
    table.style.boxShadow = '5px 5px 10px 0px rgba(0, 0, 0, 0.2)';
  }
}
