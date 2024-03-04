import Component from '../../core/Component';
import { $ } from '../../utils/querySelector';
import Logo from '../../core/Logo';
import Category from './Category';
import { navigate } from '../../utils/navigate.js';
import MakeRoom from '../MakeRoom/MakeRoom.js';
import RandomMatch from '../RandomMatch/RandomMatch.js';
import apiController from '../../utils/apiController.js';

export default class Home extends Component {
  async setup() {
    this.state = await this.getUserInfo();

    this.setEvent();
    this.render();
  }

  async getUserInfo() {
    const config = {
      url: '/main', // /HOME??
    };

    const res = await apiController(config);
    const { data } = res;

    console.log(data);

    return data;
  }

  mounted() {
    const $category = document.createElement('div');
    const $info = document.createElement('div');

    $category.id = 'category';
    $category.className =
      'flex justify-center items-center w-full h-full gap-6';
    $category.innerHTML = `
    <div id='room-list'></div>
    <div id='make-room'></div>
    <div id='random-match'></div>
    `;
    $('#app').appendChild($category);

    $info.id = 'info';
    $info.className = '';
    $info.innerHTML = `
    <div id='info' class='absolute flex top-10 right-6 text-3xl font-bold items-center gap-2 cursor-pointer group'>
      <img alt='avator' src='${this.state.picture}' class='w-10 h-10 rounded-full shadow-md group-hover:w-11 group-hover:h-11' />
      <span class='underline decoration-indigo-500 decoration-solid underline-offset-3 decoration-2 font-semibold text-2xl group-hover:text-gray-500'>${this.state.username}</span>님
    </div>
    `;

    // window.URL.revokeObjectURL(url);

    // 마이페이지 버튼 클릭 시 이벤트
    this.addEvent('click', '#info', (e) => {
      const targetURL = '/mypage';
      navigate(targetURL);
    });

    $('#app').appendChild($info);
    new Logo();
    new Category($('#room-list'), { title: '방 목록', emoji: '🗒️' });
    new Category($('#make-room'), { title: '방 만들기', emoji: '🏡' });
    new Category($('#random-match'), { title: '랜덤 매칭', emoji: '🤝' });

    // 방만들기 버튼 클릭 시 이벤트
    this.addEvent('click', '#make-room', (e) => {
      const makeRoomModal = document.createElement('div');
      makeRoomModal.id = 'Modal_overlay';

      $('#app').appendChild(makeRoomModal);
      new MakeRoom(makeRoomModal);
    });

    // 랜덤매칭 버튼 클릭 시 이벤트
    this.addEvent('click', '#random-match', (e) => {
      const randomMatchModal = document.createElement('div');
      randomMatchModal.id = 'Modal_overlay';

      $('#app').appendChild(randomMatchModal);
      new RandomMatch(randomMatchModal);
    });

    // 방 목록 클릭 시 이벤트
    this.addEvent('click', '#room-list', (e) => {
      const targetURL = '/room-list';
      navigate(targetURL);
    });
  }
}
