import Component from '../../core/Component';
import { $ } from '../../utils/querySelector';
import Profile from './Profile';

export default class UserInfo extends Component {
  constructor($target, props) {
    super($target, props);
    this.$target = $target;
    this.props = props;
    console.log('props: ', this.props);
    this.setup();
    this.setEvent();
    this.render();
  }

  setState() {
    this.state = {
      userName: this.props.userName,
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
        bg-white rounded-[30px] flex-col p-[20px]">
        <img src="/eva--close-fill.svg" alt="icon close" id="confirm_close"
          class="absolute top-[20px] right-[20px] w-[40px] h-[40px] cursor-pointer"
        />
        <div id="user_info_container"
          class="bg-[#dddddd] w-[100%] h-[100%]"
        >
        </div>
      </div>
      `;
  }

  mounted() {
    const information = this.$target.querySelector('#user_info_container');
    const profile = document.createElement('div');
    profile.id = 'user_info_profile';

    information.appendChild(profile);

    new Profile(profile, this.state);
  }
}
