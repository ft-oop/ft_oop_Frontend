import Component from '../../core/Component';
import { $ } from '../../utils/querySelector';
import Logo from '../../core/Logo';
import Category from './Category';

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
    <div class='absolute flex top-10 right-6 text-3xl font-bold items-start gap-2'>
      <img alt='avator' src='image1.jpg' class='w-10 h-10 rounded-full shadow-md' />
      <span class='underline decoration-indigo-500 decoration-solid underline-offset-3 decoration-2 font-semibold text-2xl'>yongmipa</span>님
    </div>
    `;

    $('#app').appendChild($info);
    new Logo();
    new Category($('#room-list'), { title: '방 목록', emoji: '🗒️' });
    new Category($('#make-room'), { title: '방 만들기', emoji: '🏡' });
    new Category($('#random-match'), { title: '랜덤 매칭', emoji: '🤝' });
  }
}
