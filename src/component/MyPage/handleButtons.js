import Edit from './Modal/Edit.js';
import Confirm from './Modal/Confirm.js';
import UserInfo from './Modal/UserInfo.js';
import { $ } from '../../utils/querySelector.js';
import UserTable from './Table/UserTable.js';
import { tableNumbers } from '../../constant/tableNumbers.js';

let prevFileName = '/image1.jpg';
let newFileName = '';

export default function handleButtons($target, state, button) {
  /*** 친구, 차단 목록 테이블 전환 ***/
  if (
    button.classList.contains('icon_right') ||
    button.classList.contains('icon_left')
  ) {
    handleTables($target, state, button);

    /*** 사용자 정보 편짐 모달 ***/
    // 편집 모달 열기
  } else if (button.id === 'edit_modal_open') {
    handleEdit($target, state, button);

    // 이미지 편집 아이콘 클릭
  } else if (button.id === 'avatar_upload_entry') {
    prevFileName = $('#mypage_avatar').getAttribute('src');
    handleAvatarUpload($target, button);

    // 제출
  } else if (button.id === 'edit_submit') {
    console.log('edit submit');
    handleModalSubmmit($target, button);

    // 편집 닫기
  } else if (button.id === 'edit_modal_close') {
    handleEditModalClose($target, button, prevFileName);

    /*** 친구, 차단 목록 사용자 정보 모달 ***/
    // 사용자 정보 열기
  } else if (
    button.classList.contains('user_avatar') ||
    button.classList.contains('user_name')
  ) {
    handleUser($target, button);

    // 아이콘 클릭 이벤트 발생 시 상황에 맞는 모달 새로 넣어야 함..
    // 친구 추가
  } else if (button.id === 'icon_add_friend') {
    handleAddFriendOfUserModal($target, state, button);

    // 친구 삭제
  } else if (button.id === 'icon_delete_friend') {
    handleDeleteFriendOfUserModal($target, state, button);

    // 사용자 차단
  } else if (button.id === 'icon_block') {
    handleBlockUsefOfUserModal($target, state, button);

    // 차단 해제
  } else if (button.id === 'icon_unblock') {
    handleUnblockUsefOfUserModal($target, state, button);

    /*** 테이블 내 아이콘 핸들링 ***/
    // DM
  } else if (button.classList.contains('user_dm')) {
    handleDM($target, button);

    // 삭제
  } else if (button.classList.contains('user_delete')) {
    handleDelete($target, state, button);

    /*** 확인 모달 ***/
    // 확인 모달 열기
  } else if (button.id === 'confirm_ok') {
    handleConfirmOK($target, state, button);

    // 확인 모달 닫기
  } else if (button.id === 'confirm_close') {
    console.log('modal close');

    button.closest('#Modal_overlay').remove();
  }
}

function handleTables($target, state, button) {
  if ($target.querySelector('#Friend_table')) {
    if (button.classList.contains('icon_right')) {
      const $blockTable = $target.querySelector('#MyPage_info__user_list');

      new UserTable($blockTable, '차단 목록', tableNumbers.BLOCK, state);
    }
  } else if ($target.querySelector('#Block_table')) {
    if (button.classList.contains('icon_left')) {
      const $userTable = $target.querySelector('#MyPage_info__user_list');

      new UserTable($userTable, '친구 목록', tableNumbers.FRIEND, state);
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

function handleModalSubmmit($target, button) {
  console.log('edit modal submit');

  if (newFileName !== '') {
    $('#mypage_avatar').setAttribute('src', newFileName);
    prevFileName = newFileName;
  }
  button.closest('#Modal_overlay').remove();
}

function handleEditModalClose($target, button, prevFileName) {
  console.log('edit modal close');

  if (prevFileName !== $('#mypage_avatar').src) {
    $('#mypage_avatar').setAttribute('src', prevFileName);
    $('#edit_modal_avatar').setAttribute('src', prevFileName);
  }
  if (prevFileName !== newFileName) {
    newFileName = '';
  }

  button.closest('#Modal_overlay').remove();
}

function handleUser($target, button) {
  console.log('user info');

  const userInfo = document.createElement('div');
  userInfo.id = 'Modal_overlay';
  $target.appendChild(userInfo);

  let userName = '';

  if (button.id.includes('avatar')) {
    userName = button.id.slice(14);
  } else {
    userName = button.textContent;
  }

  if (document.querySelector('#Friend_table')) {
    new UserInfo(userInfo, userName, '/delete_friend.svg', '/block.svg');
  }
  if (document.querySelector('#Block_table')) {
    new UserInfo(userInfo, userName, '', '/unblock.svg');
  }
}

function handleAddFriendOfUserModal($target, state, button) {
  console.log('add friend');

  const modalOrigin = button.closest('#Modal_overlay');
  const userName = modalOrigin.querySelector('#mypage_name').textContent;

  new UserInfo(modalOrigin, userName, '/delete_friend.svg', '/block.svg');
}

function handleDeleteFriendOfUserModal($target, state, button) {
  console.log('delete friend');

  const modalOrigin = button.closest('#Modal_overlay');
  const userName = modalOrigin.querySelector('#mypage_name').textContent;

  new UserInfo(modalOrigin, userName, '/add_friend.svg', '/block.svg');
}

function handleBlockUsefOfUserModal($target, state, button) {
  console.log('block user');

  const modalOrigin = button.closest('#Modal_overlay');
  const userName = modalOrigin.querySelector('#mypage_name').textContent;

  new UserInfo(modalOrigin, userName, '', '/unblock.svg');
}

function handleUnblockUsefOfUserModal($target, state, button) {
  console.log('unblock user');

  const modalOrigin = button.closest('#Modal_overlay');
  const userName = modalOrigin.querySelector('#mypage_name').textContent;

  new UserInfo(modalOrigin, userName, '/add_friend.svg', '/block.svg');
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

function handleConfirmOK($target, state, button) {
  const modal = button.closest('#Modal_overlay');

  if (document.querySelector('#Friend_table')) {
    console.log('confirm_ok: delete friend');

    new Confirm(modal, 'friend', state.userName);
  } else {
    console.log('confirm_ok: delete block');

    new Confirm(modal, 'delete', state.userName);
  }
}
