import Component from '../../../core/Component';
import apiController from '../../../utils/apiController';
import Profile from '../Profile';
import HistoryTable from '../Table/HistoryTable';

export default class UserInfo extends Component {
  constructor($target, props, icon1, icon2) {
    super($target, props);
    this.$target = $target;
    this.props = props;
    this.icon1 = icon1;
    this.icon2 = icon2;
    this.iconID1 = '';
    this.iconID2 = '';
    this.setup();
  }

  async setup() {
    this.state = await this.getUserInfo();

    this.setEvent();
    this.render();
  }

  async getUserInfo() {
    const config = {
      url: '/users/info',
      params: {
        userName: this.props,
      },
    };

    const res = await apiController(config);
    const { data } = res;

    return data;
  }

  template() {
    return `
      <div class="w-[800px] h-[800px] relative justify-center
        bg-white rounded-[30px] flex-col p-[50px]">
        <img src="/eva--close-fill.svg" alt="icon close" id="modal_close"
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

    // if ($('#Friend_table')) {
    //   new Profile(profile, this.state, '/delete_friend.svg', '/block.svg');
    // } else if ($('#Block_table')) {
    //   new Profile(profile, this.state, '', '/block.svg');
    // }
    new Profile(profile, this.state, this.icon1, this.icon2);

    // tables
    const userHistoryTable = document.createElement('div');
    userHistoryTable.id = 'user_info_history';

    this.setUserHistoryTable(userHistoryTable);

    information.appendChild(userHistoryTable);

    new HistoryTable(userHistoryTable, this.state);
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
