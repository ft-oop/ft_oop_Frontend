import Edit from './Modal/Edit.js';
import Confirm from './Modal/Confirm.js';
import UserInfo from './Modal/UserInfo.js';
import Chat from './Modal/Chat.js';
import { $ } from '../../utils/querySelector.js';
import UserTable from './Table/UserTable.js';
import { tableNumbers } from '../../constant/tableNumbers.js';
import apiController from '../../utils/apiController.js';

let prevFileName = '/image1.jpg';
let newFileName = '';

export default async function handleButtons($target, state, button) {
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
    const data = await handleModalSubmmit($target, state, button);

    console.log(data);

    button.closest('#Modal_overlay').remove();

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
    const res = handleAddFriendOfUserModal($target, state, button);
    const modalOrigin = button.closest('#Modal_overlay');

    if (res.state == 200 && res.data === 'OK')
      new UserInfo(modalOrigin, userName, '/delete_friend.svg', '/block.svg');

    // 친구 삭제
  } else if (button.id === 'icon_delete_friend') {
    const res = await handleDeleteFriendOfUserModal($target, state, button);
    const modalOrigin = button.closest('#Modal_overlay');

    if (res.state == 200 && res.data === 'OK')
      new UserInfo(modalOrigin, userName, '/add_friend.svg', '/block.svg');

    // 사용자 차단
  } else if (button.id === 'icon_block') {
    const res = await handleBlockUsefOfUserModal($target, state, button);
    const modalOrigin = button.closest('#Modal_overlay');

    if (res.state == 200 && res.data === 'OK')
      new UserInfo(modalOrigin, userName, '', '/unblock.svg');

    // 차단 해제
  } else if (button.id === 'icon_unblock') {
    const res = await handleUnblockUsefOfUserModal($target, state, button);
    const modalOrigin = button.closest('#Modal_overlay');

    if (res.state == 200 && res.data === 'OK')
      new UserInfo(modalOrigin, userName, '/add_friend.svg', '/block.svg');

    /*** 테이블 내 아이콘 핸들링 ***/
    // DM
  } else if (button.classList.contains('user_dm')) {
    handleDM($target, state, button);

    // 삭제
  } else if (button.classList.contains('user_delete')) {
    handleDelete($target, state, button);

    /*** 확인 모달 ***/
    // 확인 모달 열기
  } else if (button.id === 'confirm_ok') {
    handleConfirmOK($target, state, button);

    // 확인 모달 닫기
  } else if (button.id === 'modal_close') {
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

async function handleModalSubmmit($target, state, button) {
  console.log('edit modal submit');

  if (newFileName !== '') {
    $('#mypage_avatar').setAttribute('src', newFileName);
    prevFileName = newFileName;
  }

  const data = await postEditInfo(state, newFileName);

  return data;
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

async function handleAddFriendOfUserModal($target, state, button) {
  console.log('add friend');

  const modalOrigin = button.closest('#Modal_overlay');
  const userName = modalOrigin.querySelector('#mypage_name').textContent;

  const config = {
    method: 'post',
    url: '/friend/add',
    data: {
      userName: state.userName,
      friendName: userName,
    },
  };

  const res = await apiController(config);

  return res;
}

async function handleDeleteFriendOfUserModal($target, state, button) {
  console.log('delete friend');

  const modalOrigin = button.closest('#Modal_overlay');
  const userName = modalOrigin.querySelector('#mypage_name').textContent;

  const config = {
    method: 'delete',
    url: '/friend/delete',
    data: {
      userName: state.userName,
      friendName: userName,
    },
  };

  const res = await apiController(config);
  return res;
}

async function handleBlockUsefOfUserModal($target, state, button) {
  console.log('block user');

  const modalOrigin = button.closest('#Modal_overlay');
  const userName = modalOrigin.querySelector('#mypage_name').textContent;

  const config = {
    method: 'post',
    url: '/friend/ban-list/add',
    data: {
      userName: state.userName,
      blockName: userName,
    },
  };

  const res = await apiController(config);

  return res;
}

async function handleUnblockUsefOfUserModal($target, state, button) {
  console.log('unblock user');

  const modalOrigin = button.closest('#Modal_overlay');
  const userName = modalOrigin.querySelector('#mypage_name').textContent;

  const config = {
    method: 'post',
    url: '/friend/ban-list/delete',
    data: {
      userName: state.userName,
      blockName: userName,
    },
  };

  const res = apiController(config);

  return res;
}

function handleDM($target, state, button) {
  console.log('DM');

  const chat = document.createElement('div');
  chat.id = 'Modal_overlay';

  $target.appendChild(chat);

  const friendName =
    button.parentNode.previousSibling.previousSibling.textContent;
  console.log(friendName);

  new Chat(chat, friendName);
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

  if (modal && modal.id === 'Modal_overlay') {
    if (document.querySelector('#Friend_table')) {
      console.log('confirm_ok: delete friend');

      new Confirm(modal, 'friend', state.userName);
    } else {
      console.log('confirm_ok: delete block');

      new Confirm(modal, 'delete', state.userName);
    }
  }
}

async function postEditInfo(state, newFileName) {
  try {
    const newNick = $('#nickname_upload').value;

    console.log('userName: ', state.userName);
    console.log('newNick: ', newNick);
    console.log('newFileName: ', newFileName);

    const config = {
      method: 'post',
      url: '/mypage/editor',
      data: {
        userName: state.userName,
        nickName: newNick,
        picture: newFileName,
      },
    };

    const res = await apiController(config);
    const { data } = res;

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
