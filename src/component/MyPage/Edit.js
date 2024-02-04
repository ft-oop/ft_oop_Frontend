import Component from '../../core/Component';
import '../../style/Edit.css';

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
    return `
    <div class="w-full h-[120px] flex mb-[10px] p-[10px]">
      ${/* Image */ ''}
      <div class="relative w-[100px] h-[100px]">
        <div class="absolute w-full h-full rounded-full overflow-hidden">
          <div class="flex w-full h-full justify-center items-center bg-blue-200">
            <img src="/image1.jpg" alt="user avatar" class="w-[100%] h-[100%] object-cover"/>
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
        <div class="text-lg mt-[8px]">최대 용량 5MB</div>
      </div>
    </div>`;
  }

  createInputNickName() {
    return `
      <div class="input-group mb-3">
        <span class="input-group-text" id="input_nickname">닉네임 입력</span>
        <input type="text" id="nickname_upload" class="form-control" placeholder="NickName" aria-label="NickName" aria-describedby="input_nickname">
      </div>
    `;
  }

  createButtons() {
    return `
    <button id="editSubmit" type="submit" class="btn btn-primary" style="background-color:#007bff; margin-left:8px; border-radius: 8px; padding-left:30px; padding-right:30px">확인</button>
    <button type="button" id="modal_close" class="btn btn-secondary" style="background-color:#6c757d; border-radius: 8px; padding-left:30px; padding-right:30px">취소</button>
    `;
  }
}
