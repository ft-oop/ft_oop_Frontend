import Table from './Table.js';
import Edit from './Edit.js';
import Confirm from './Confirm.js';

export default function handleButtons($target, state, button) {
  if (
    button.classList.contains('icon_right') ||
    button.classList.contains('icon_left')
  ) {
    handleTables($target, state, button);
  } else if (button.id === 'mypage_edit') {
    handleEdit($target, state, button);
  } else if (button.id === 'back') {
    console.log('back');
  } else if (
    button.classList.contains('user_avatar') ||
    button.classList.contains('user_name')
  ) {
    handleUser($target, button);
  } else if (button.classList.contains('user_dm')) {
    handleDM($target, button);
  } else if (button.classList.contains('user_delete')) {
    handleDelete($target, state, button);
  } else if (button.id === 'modal_close') {
    handleModalClose($target, button);
  } else if (button.id === 'avatar_upload_entry') {
    handleAvatarUpload($target, button);
  } else if (button.id === 'editSubmit') {
    console.log('edit submit');
    handleModalClose($target, button);
  } else if (button.id === 'confirm_ok') {
    handleConfirm($target, state, button);
  }
}

function handleTables($target, state, button) {
  if ($target.querySelector('#Friend_table')) {
    if (button.classList.contains('icon_right')) {
      const $blockTable = $target.querySelector('#MyPage_info__user_list');

      new Table($blockTable, '차단 목록', 3, state);
    }
  } else if ($target.querySelector('#Block_table')) {
    if (button.classList.contains('icon_left')) {
      const $userTable = $target.querySelector('#MyPage_info__user_list');

      new Table($userTable, '친구 목록', 2, state);
    }
  }
}

function handleEdit($target, state, button) {
  console.log('edit');

  const modal = document.createElement('div');
  modal.id = 'Modal_overlay';

  $target.appendChild(modal);

  new Edit(modal, state.userName);
}

function handleUser($target, button) {
  console.log('user');
}

function handleDM($target, button) {
  console.log('DM');
}

function handleDelete($target, state, button) {
  console.log('delete');

  const confirm = document.createElement('div');
  confirm.id = 'Modal_overlay';

  $target.appendChild(confirm);

  const sibling =
    button.parentNode.previousSibling.previousSibling.previousSibling
      .previousSibling.textContent;

  if (document.querySelector('#Friend_table')) {
    new Confirm(confirm, 'friend', sibling, state.userName);
  } else {
    new Confirm(confirm, 'block', sibling, state.userName);
  }
}

function handleModalClose($target, button) {
  console.log('edit modal close');

  button.closest('#Modal_overlay').remove();
}

function handleAvatarUpload($target, button) {
  console.log('avatar upload');

  $('#avatar_upload').click();

  $('#avatar_upload').addEventListener('change', (e) => {
    console.log('file name: ', e.target.value);
  });
}

function handleConfirm($target, state, button) {
  if (document.querySelector('#Friend_table')) {
    console.log('delete friend');
  } else {
    console.log('delete block');
  }

  //const final = button.closest('#Modal_overlay');
}
