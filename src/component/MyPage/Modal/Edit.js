import Component from '../../../core/Component.js';
import { $ } from '../../../utils/querySelector.js';

export default class Edit extends Component {
  // this.props에 userName
  template() {
    return `
      <form name="editInfo" class="w-[500px] h-[300px] flex justify-center
        px-[40px] bg-white rounded-[30px] flex-col">
        <div class="w-full h-[170px] flex flex-col mb-3">
          ${this.createImageEdit()}
          ${this.createInputNickName()}
        </div>
        <div class="w-full h-[40px] flex flex-row-reverse">
          ${this.createButtons()}
        </div>
      </form>
    `;
  }

  createImageEdit() {
    const fileName = $('#mypage_avatar').getAttribute('src');
    return `
    <div class="w-full h-[120px] flex mb-[10px] p-[10px]">
      ${/* Image */ ''}
      <div class="relative w-[100px] h-[100px]">
        <div class="absolute w-full h-full rounded-full overflow-hidden">
          <div class="flex w-full h-full justify-center items-center">
            <img src="${fileName}" id="edit_modal_avatar" alt="user avatar" class="w-[100%] h-[100%] object-cover"/>
          </div>
        </div>
        ${/* Edit Icon */ ''}
        <div class="absolute w-full h-full bg-white opacity-70">
        <input type="file" id="avatar_upload" name="avatar_upload" style="display:none"
        accept="image/*"/>
          <img id="avatar_upload_entry" src="/edit.svg" alt="edit icon" class="w-full p-[28px] cursor-pointer">
        </div>
      </div>
      ${/* Text */ ''}
      <div class="h-full flex grow flex-col justify-center ml-[20px]">
        <div class="text-2xl font-semibold">이미지 편집</div>
        <div class="text-lg mt-[8px]">최대 용량 1MB</div>
      </div>
    </div>`;
  }

  createInputNickName() {
    return `
      <div class="input-group mb-3">
        <span class="input-group-text" id="input_nickname">이름 입력</span>
        <input type="text" id="nickname_upload" class="form-control" placeholder="input name" aria-label="NickName" aria-describedby="input_nickname">
        <input type="text" style="display:none;">${
          /* submit 시 새로고침 방지 */ ''
        }
      </div>
    `;
  }

  createButtons() {
    return `
      <button id="edit_submit" type="button" class="btn btn-primary" style="background-color:#007bff; margin-left:8px; border-radius: 8px; padding-left:30px; padding-right:30px">확인</button>
      <button type="button" id="edit_modal_close" class="btn btn-secondary" style="background-color:#6c757d; border-radius: 8px; padding-left:30px; padding-right:30px">취소</button>
    `;
  }
}
