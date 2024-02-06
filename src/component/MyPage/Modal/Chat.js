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
          <div id="chat_content"
            class="w-full h-[630px] mb-[10px] flex flex-col
            justify-end overflow-y-auto"
          >
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

  setEvent() {
    this.$target.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.id === 'chat_input') {
        if (e.isComposing) return;
        if (e.target.value === '') return;
        this.sendMessage(e.target.value);
        e.target.value = '';
      }
    });
  }

  sendMessage(message) {
    const chatContent = this.$target.querySelector('#chat_content');

    const chat = document.createElement('div');
    chat.class = 'my_chat_bubble';

    this.setMyChatBubbleStyle(chat, message);

    chatContent.appendChild(chat);

    const closest = chat.previousElementSibling;
    if (closest && closest.class === 'my_chat_bubble') {
      closest.style.borderBottomRightRadius = '20px';
    }
  }

  setMyChatBubbleStyle(chat, message) {
    chat.style.width = 'fit-content';
    chat.style.height = 'fit-content';
    chat.style.maxWidth = '60%';
    chat.style.padding = '10px';
    chat.style.paddingLeft = '20px';
    chat.style.paddingRight = '20px';
    chat.style.borderRadius = '20px';
    chat.style.borderBottomRightRadius = '0px';
    chat.style.backgroundColor = '#ABC2EF';
    chat.style.marginBottom = '2px';
    chat.style.marginLeft = 'auto';

    chat.style.overflowWrap = 'break-word';
    chat.textContent = message;
  }

  setSentChatBubbleStyle(chat, message) {
    chat.style.width = 'fit-content';
    chat.style.height = 'fit-content';
    chat.style.maxWidth = '60%';
    chat.style.padding = '10px';
    chat.style.paddingLeft = '20px';
    chat.style.paddingRight = '20px';
    chat.style.borderRadius = '20px';
    chat.style.borderBottomLeftRadius = '0px';
    chat.style.backgroundColor = '#E7E7E7';
    chat.style.marginBottom = '2px';
    chat.style.marginRight = 'auto';

    chat.style.overflowWrap = 'break-word';
    chat.textContent = message;
  }
}
