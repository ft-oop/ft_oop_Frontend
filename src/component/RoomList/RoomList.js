import Component from '../../core/Component.js';
import Logo from '../../core/Logo.js';
import { $ } from '../../utils/querySelector.js';
import RoomListWrapper from './RoomListWrapper.js';

export default class RoomList extends Component {
  mounted() {
    const $roomList = document.createElement('div');
    $roomList.id = 'room-list';
    $roomList.className =
      'fixed top-1/2 left-1/2 transform -translate-x-1/2 flex justify-center items-center -translate-y-1/2 bg-white w-2/3 h-3/4 shadow-lg rounded-3xl';
    $('#app').appendChild($roomList);

    new Logo();
    new RoomListWrapper($roomList);
  }
}
