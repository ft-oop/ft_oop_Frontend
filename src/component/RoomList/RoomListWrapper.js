import Component from '../../core/Component';
import { $ } from '../../utils/querySelector';
import RoomListDetail from './RoomListDetail';

export default class RoomListWrapper extends Component {
  template() {
    return `
      <div class='w-full h-[80%] flex flex-col justify-between items-center'>
        <img id='goBack' src="/eva--arrow-back-fill.svg" alt="close" class='h-8 absolute top-6 left-6 rounded-full p-1 hover:shadow-md'/>
        <div class='text-xl font-bold mb-4'>
          <span class='text-4xl mr-2'>🗒</span>방 목록
        </div>
        <div id='room-list-detail' class='flex-1 w-full h-full px-6'></div>
      </div>
    `;
  }

  mounted() {
    this.addEvent('click', '#goBack', (e) => {
      history.back();
    });

    // 소켓으로 방 정보 받아오기.
    new RoomListDetail($('#room-list-detail'), this.props);
  }
}
