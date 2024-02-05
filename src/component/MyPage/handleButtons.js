import Table from './Table.js';
import Edit from './Edit.js';
import Confirm from './Confirm.js';
import { $ } from '../../utils/querySelector.js';

let prevFileName = '';
let newFileName = '';

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
    handleModalClose($target, button, prevFileName);
  } else if (button.id === 'avatar_upload_entry') {
    prevFileName = $('#mypage_avatar').getAttribute('src');
    handleAvatarUpload($target, button);
  } else if (button.id === 'editSubmit') {
    console.log('edit submit');
    handleModalSubmmit($target, button);
  } else if (button.id === 'confirm_ok') {
    handleConfirmOK($target, state, button);
  } else if (button.id === 'confirm_close') {
    console.log('confirm close');
    button.closest('#Modal_overlay').remove();
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
  console.log('prev: ', prevFileName);

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
    new Confirm(confirm, 'friend', state.userName, sibling);
  } else {
    new Confirm(confirm, 'block', state.userName, sibling);
  }
}

function handleModalClose($target, button, prevFileName) {
  console.log('edit modal close');

  console.log(prevFileName === $('#mypage_avatar').getAttribute('src'));

  if (prevFileName !== $('#mypage_avatar').src) {
    $('#mypage_avatar').setAttribute('src', prevFileName);
    $('#edit_modal_avatar').setAttribute('src', prevFileName);
  }

  button.closest('#Modal_overlay').remove();
}

function handleModalSubmmit($target, button) {
  console.log('edit modal submit');

  if (newFileName !== '') {
    $('#mypage_avatar').setAttribute('src', newFileName);
    prevFileName = newFileName;
  }
  button.closest('#Modal_overlay').remove();
}

function handleAvatarUpload($target, button) {
  console.log('avatar upload');

  $('#avatar_upload').click();
  $('#avatar_upload').addEventListener('change', uploadImage.bind(this));
}

function uploadImage(e) {
  const maxSize = 1024 * 1024;

  const file = e.target.files[0];

  if (file.size > maxSize) {
    alert('1MB 이하의 파일만 업로드 가능합니다.');
    return;
  }

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = (e) => {
    newFileName = e.target.result;

    $('#edit_modal_avatar').setAttribute('src', e.target.result);
  };
}

function handleConfirmOK($target, state, button) {
  const modal = button.closest('#Modal_overlay');

  if (document.querySelector('#Friend_table')) {
    console.log('confirm_ok: delete friend');

    new Confirm(modal, 'friend', state.userName);
  } else {
    console.log('confirm_ok: delete block');

    new Confirm(modal, 'delete', state.userName);
  }

  //const final = button.closest('#Modal_overlay');
}
