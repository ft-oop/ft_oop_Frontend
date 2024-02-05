import Component from '../../core/Component';
import { $ } from '../../utils/querySelector';
import Logo from '../../core/Logo';
import Category from './Category';
import { navigate } from '../../utils/navigate.js';
import MakeRoom from '../MakeRoom/MakeRoom.js';

export default class Home extends Component {
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
    <div id='info' class='absolute flex top-10 right-6 text-3xl font-bold items-center gap-2 cursor-pointer'>
      <img alt='avator' src='image1.jpg' class='w-10 h-10 rounded-full shadow-md' />
      <span class='underline decoration-indigo-500 decoration-solid underline-offset-3 decoration-2 font-semibold text-2xl'>귀여운 수환</span>님
    </div>
    `;

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

    // 랜덤 매칭 버튼 클릭 시 이벤트
    this.addEvent('click', '#make-room', (e) => {
      const makeRoomModal = document.createElement('div');
      makeRoomModal.id = 'Modal_overlay';

      $('#app').appendChild(makeRoomModal);
      new MakeRoom(makeRoomModal);
    });
  }
}
