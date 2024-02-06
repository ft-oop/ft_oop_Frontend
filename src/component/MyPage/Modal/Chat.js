import Component from '../../../core/Component';
import { $ } from '../../../utils/querySelector';

export default class Chat extends Component {
  template() {
    return `
      <div id="chat_wrapper" class="w-[800px] h-[800px] relative justify-center
        bg-white rounded-[30px] flex-col px-[30px] py-[20px]">
        <div class="w-full h-full flex-col justify-center">
          <div class="w-100% h-[50px] mb-[10px] flex justify-center items-center">
            <span class="w-[720px] text-center text-[24px] font-bold">${this.props}</span>
            <img src="/game.svg" alt="icon game" id="chat_game"
              class="cursor-pointer mx-[10px]">
            <img src="/eva--close-fill.svg" alt="icon close" id="modal_close"
              class="cursor-pointer"/>
          </div>
          <div id="chat_content" class="w-full h-[630px] mb-[10px]">
          </div>
          <div class="w-full h-[60px] flex justify-center items-center">
            <input type="text" id="chat_input" class="w-full h-[40px] px-[15px] mr-[8px] rounded-[20px]
              focus:outline-none bg-[#e7eff8]"/>
            <img src="/bubble.png" alt="icon send" id="chat_send" class="w-[52px] h-[52px] cursor-pointer"/>
          </div>
        </div>
      </div>
    `;
  }
}
