import Component from '../../core/Component.js';
import '../../style/MyPage.css';
import { $ } from '../../utils/querySelector.js';
import Table from './Table.js';
import Edit from './Edit.js';

export default class MyPage extends Component {
  setup() {
    this.state = {
      userName: 'user',
      picture: '',
      totalWinScore: 1,
      totalLoseScore: 1,
      matchHistories: [
        {
          userName: 'op1',
          winner: 'user',
          scoreDate: '2024-01-29',
        },
        {
          userName: 'op2',
          winner: 'op2',
          scoreDate: '2024-01-30',
        },
      ],
      friends: [
        {
          userName: 'friend1',
          picture: '',
        },
        {
          userName: 'friend2',
          picture: '',
        },
        {
          userName: 'friend3',
          picture: '',
        },
      ],
      blockedUsers: [
        {
          userName: 'block1',
          picture: '',
        },
        {
          userName: 'block2',
          picture: '',
        },
      ],
    };
  }

  mounted() {
    this.appendInfoWrapper();

    const $profile = this.$target.querySelector('.MyPage_profile');
    const $historyTable = this.$target.querySelector('.MyPage_info__history');
    const $friendTable = this.$target.querySelector('.MyPage_info__user_list');

    $profile.innerHTML = `
      <div class="w-[100px] h-[100px] rounded-full overflow-hidden">
        <img id="mypage_avatar" src="/image1.jpg" alt="profile" class="w-[100%] h-[100%] object-cover">
      </div>
      <div id="mypage_profile__wrapper">
        <div id="mypage_name">${this.state.userName}</div>
        <div id="mypage_winlose">${this.state.totalWinScore}승 ${this.state.totalLoseScore}패</div>
        </div>
      <img id="mypage_edit" src="/edit.svg" alt="edit">
    `;

    new Table($historyTable, '경기 기록', 1, this.state);
    new Table($friendTable, '친구 목록', 2, this.state);
  }

  appendInfoWrapper() {
    const $wrapper = document.createElement('div');
    $wrapper.className = 'MyPage_wrapper';
    this.$target.appendChild($wrapper);

    $wrapper.innerHTML = `
    <div class="w-full h-full flex flex-col items-start overflow-auto">
      <div class="w-[calc(100% - 400px)] min-w-[800px] max-w-[1200px] flex flex-col items-start m-auto">
        <div class="MyPage_profile_container">
          <div class="MyPage_profile"></div>
        </div>
        <div class="MyPage_info">
          <div class="MyPage_info__history"></div>
          <div class="MyPage_info__user_list"></div>
        </div>
      </div>
    </div>`;
  }

  setEvent() {
    this.$target.addEventListener('click', this.handleButton.bind(this));
    this.$target.addEventListener('submit', this.handleForm.bind(this));
  }

  handleButton(event) {
    const button = event.target;

    if (
      button.classList.contains('icon_right') ||
      button.classList.contains('icon_left')
    ) {
      this.handleTables(button);
    } else if (button.id === 'mypage_edit') {
      this.handleEdit(button);
    } else if (button.id === 'back') {
      console.log('back');
    } else if (
      button.classList.contains('user_avatar') ||
      button.classList.contains('user_name')
    ) {
      this.handleUser(button);
    } else if (button.classList.contains('user_dm')) {
      this.handleDM(button);
    } else if (button.classList.contains('user_delete')) {
      this.handleDelete(button);
    } else if (button.id === 'edit_close') {
      this.handleModalClose(button);
    } else if (button.id === 'avatar_upload_entry') {
      this.handleAvatarUpload(button);
    } else if (button.id === 'editSubmit') {
      console.log('edit submit');
      this.handleModalClose(button);
    }
  }

  handleTables(button) {
    if (this.$target.querySelector('.Friend_table')) {
      if (button.classList.contains('icon_right')) {
        const $blockTable = this.$target.querySelector(
          '.MyPage_info__user_list',
        );

        new Table($blockTable, '차단 목록', 3, this.state);
      }
    } else if (this.$target.querySelector('.Block_table')) {
      if (button.classList.contains('icon_left')) {
        const $userTable = this.$target.querySelector(
          '.MyPage_info__user_list',
        );

        new Table($userTable, '친구 목록', 2, this.state);
      }
    }
  }

  handleEdit(button) {
    console.log('edit');

    const modal = document.createElement('div');
    modal.className = 'Modal_overlay';

    this.$target.appendChild(modal);

    new Edit(modal, 'edit');
  }

  handleUser(button) {
    console.log('user');
  }

  handleDM(button) {
    console.log('DM');
  }

  handleDelete(button) {
    console.log('delete');
  }

  handleModalClose(button) {
    console.log('edit modal close');

    button.closest('.Modal_overlay').remove();
  }

  handleAvatarUpload(button) {
    console.log('avatar upload');

    $('#avatar_upload').click();

    $('#avatar_upload').addEventListener('change', (e) => {
      console.log('file name: ', e.target.value);
    });
  }

  handleForm(event) {
    event.preventDefault();
  }
}
