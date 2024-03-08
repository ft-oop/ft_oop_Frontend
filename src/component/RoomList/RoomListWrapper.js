import Component from '../../core/Component';
import { $ } from '../../utils/querySelector';
import RoomListDetail from './RoomListDetail';
import { navigate } from '../../utils/navigate';

export default class RoomListWrapper extends Component {
  template() {
    return `
      <div class='w-full h-[80%] flex flex-col justify-start items-center'>
        <img id='goBack' src="/eva--arrow-back-fill.svg" alt="close" class='h-8 absolute top-6 left-6 rounded-full p-1 hover:shadow-md'/>
        <div class='text-3xl font-bold mb-4'>
          <span class='text-4xl mr-2'>🗒</span>방 목록
        </div>
        <div id='room-list-detail' class='w-full px-6 grid grid-cols-2 gap-3'></div>
      </div>
    `;
  }

  mounted() {
    this.addEvent('click', '#goBack', (e) => {
      navigate('/');
    });
    this.props = [
      {
        name: '방 이름 1',
        type: 1,
        max: 2,
        enter: 1,
        secret: false,
      },
      {
        name: '방 이름 2',
        type: 2,
        max: 8,
        enter: 2,
        secret: true,
      },
      {
        name: '방 이름 3',
        type: 1,
        max: 2,
        enter: 1,
        secret: false,
      },
    ];
    // 소켓으로 방 정보 받아오기.
    new RoomListDetail($('#room-list-detail'), this.props);
  }
}
