import Component from '../../core/Component';
import { $ } from '../../utils/querySelector';
import Logo from '../../core/Logo';
import Category from './Category';

export default class Home extends Component {
  mounted() {
    const $category = document.createElement('div');
    $category.id = 'category';
    $category.className =
      'flex justify-center items-center w-full h-full gap-6';
    $category.innerHTML = `
    <div id='room-list'></div>
    <div id='make-room'></div>
    <div id='random-match'></div>
    `;

    $('#app').appendChild($category);

    new Logo();
    new Category($('#room-list'), { title: '방 목록', emoji: '🗒️' });
    new Category($('#make-room'), { title: '방 만들기', emoji: '🏡' });
    new Category($('#random-match'), { title: '랜덤 매칭', emoji: '🤝' });
  }
}
