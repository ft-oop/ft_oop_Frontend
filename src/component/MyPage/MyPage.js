import Component from '../../core/Component.js';
import '../../style/myPage.css';
import Profile from './Profile.js';
import HistoryTable from './Table/HistoryTable.js';
import UserTable from './Table/UserTable.js';
import { tableNumbers } from '../../constant/tableNumbers.js';
import handleButtons from './handleButtons.js';
import { navigate } from '../../utils/navigate.js';
import apiController from '../../utils/apiController.js';

export default class MyPage extends Component {
  async getMyPageInfo() {
    try {
      const params = {
        userName: 'suhwpark',
      };

      const queryString = Object.keys(params)
        .map(
          (key) =>
            encodeURIComponent(key) + '=' + encodeURIComponent(params[key]),
        )
        .join('&');

      const config = {
        method: 'get',
        url: '/mypage?' + queryString,
        // data: {
        //   userName: 'suhwpark',
        // },
      };
      const res = await apiController(config);
      const { data } = res;

      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async setup() {
    this.state = await this.getMyPageInfo();

    this.setEvent();
    this.render();
  }

  mounted() {
    this.appendInfoWrapper();

    const $profile = this.$target.querySelector('#MyPage_profile');
    const $historyTable = this.$target.querySelector('#MyPage_info__history');
    const $friendTable = this.$target.querySelector('#MyPage_info__user_list');

    console.log(this.state);

    new Profile($profile, this.state, '', '/edit.svg');
    new HistoryTable($historyTable, this.state);
    new UserTable($friendTable, '친구 목록', tableNumbers.FRIEND, this.state);
  }

  appendInfoWrapper() {
    const $wrapper = document.createElement('div');
    $wrapper.id = 'MyPage_wrapper';
    this.$target.appendChild($wrapper);

    $wrapper.style.height = '100vh';

    $wrapper.innerHTML = `
    <div class="w-full h-full flex flex-col overflow-auto">
      <img id='goBack' src="/eva--arrow-back-fill.svg" alt="close" class='h-8 absolute top-6 left-6 rounded-full p-1 hover:shadow-md'/>
      <div class="w-[calc(100% - 400px)] h-[870px] px-[100px] pb-[50px] min-w-[800px] max-w-[1200px] flex flex-col  m-auto">
          <div id="MyPage_profile_container">
            <div id="MyPage_profile"></div>
          </div>
          <div id="MyPage_info">
            <div id="MyPage_info__history"></div>
            <div id="MyPage_info__user_list"></div>
        </div>
      </div>
    </div>`;

    this.addEvent('click', '#goBack', (e) => {
      navigate('/');
    });
  }

  setEvent() {
    if (this.$target.classList.contains('MyPageEvents')) return;

    this.$target.classList.add('MyPageEvents');
    this.$target.addEventListener('click', this.handleButton.bind(this));
  }

  handleButton(event) {
    const button = event.target;

    handleButtons(this.$target, this.state, button);
  }
}
