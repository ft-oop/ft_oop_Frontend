import Component from '../../core/Component';
import { bootstrapInput } from '../../utils/bootstrap';
import { $ } from '../../utils/querySelector';

export default class MakeRoom extends Component {
  template() {
    return `
      <form id="makeRoomForm" method="post">
      <div class='bg-white w-[500px] h-[600px] rounded-xl shadow-lg flex flex-col justify-between items-center'>
        <div class='ml-2 mt-2 self-start'>
          <span class='text-5xl'>🏡</span>
          <span class='text-2xl font-bold'>방 만들기</span>
        </div>
        <div class='flex flex-col justify-center items-center w-2/3 flex-1 space-y-8 drop-shadow'>
        <div class="input-group">
          <span class="input-group-text w-20 flex justify-center font-medium rounded-r-none">이름</span>
          <input type="text" class="form-control" id="roomName" placeholder="회원님의 방" aria-label="NickName" aria-describedby="input_nickname" required>
        </div>
        <div class="input-group w-full flex ">
          <label class="input-group-text w-20 flex justify-center font-medium rounded-r-none" for="inputGroupSelect01">타입</label>
          <select class="form-select flex-1 border px-[10px]" id="inputGroupSelect01" aria-label="Default select example" required>
            <option selected></option>
            <option value="1">1:1 대전</option>
            <option value="2">토너먼트</option>
          </select>
        </div>
        <div class="input-group w-full flex">
          <label class="input-group-text w-20 flex justify-center font-medium rounded-r-none" for="inputGroupSelect01">인원수</label>
          <select class="form-select flex-1 border px-[10px]" id="inputGroupSelect02" required>
            <option selected></option>
            <option value="1">4명</option>
            <option value="2">8명</option>
          </select>
        </div>
        <div class="w-full flex flex-col">
          <div class="input-group">
            <span class="input-group-text w-20 flex justify-center font-medium rounded-r-none">비밀번호</span>
            <input id="passwordInputBox" type="text" pattern="[0-9]+" class="form-control invalid:border-red-500" id="c" placeholder="비밀방 원하면 입력해" aria-label="NickName" aria-describedby="input_nickname">
          </div>
          <span class="mt-[5px] ml-20 flex text-sm">
            비밀번호는 숫자로만 입력해주세요.
          </span>
        </div>
        </div>
        <div class='mb-10 space-x-8'>
          <button type="button" id='cancelBtn' class="btn btn-secondary bg-gray-500 px-5 py-2">취소</button>
          <button type="submit" id='confirmBtn' class="btn btn-primary bg-blue-500 px-5 py-2">확인</button>
        </div>
      </div>
      </form>
    `;
  }

  mounted() {
    this.addEvent('click', '#cancelBtn', (e) => {
      this.$target.remove();
    });
  }

  setEvent() {
    this.addEvent('change', '#inputGroupSelect01', (e) => {
      if (e.target.value === '1') {
        const select = $('#inputGroupSelect02');
        select.setAttribute('disabled', true);
        select.value = '';
      } else if (e.target.value === '2') {
        $('#inputGroupSelect02').removeAttribute('disabled', false);
      }
    });

    this.addEvent('submit', '#makeRoomForm', (e) => {
      // 정보 검증
      // this.checkValid(e);

      console.log('room has been made');
      // 방 정보 전송

      this.$target.remove();
      e.preventDefault();
    });
  }

  checkValid(e) {
    // 왜 새로고침 되지..
    const roomName = $('#roomName').value;
    const roomType = $('#inputGroupSelect01').value;
    const roomSize = $('#inputGroupSelect02').value;
    const roomPassword = $('#c').value;

    console.log('roomName: ', roomName);
    console.log('roomType: ', roomType);
    console.log('roomSize: ', roomSize);
    console.log('roomPassword: ', roomPassword);
  }
}
