import Chat from '../MyPage/Modal/Chat';

export default class GameChat extends Chat {
  template() {
    return `
    <div id="chat_wrapper" class="w-full h-full relative justify-center
    bg-white rounded-[30px] flex-col px-[30px] py-[20px]">
      <div id="chat_content_wrapper" class="w-full h-[800px] mb-[10px] overflow-y-auto">
        <div id="chat_content" class="w-full min-h-[800px] flex flex-col justify-end"></div>
      </div>
      <div class="w-full h-[60px] flex justify-center items-center">
        <input type="text" id="chat_input" class="w-full h-[40px] px-[15px] mr-[8px] rounded-[20px]
          focus:outline-none bg-[#e7eff8]"/>
        <img src="/bubble.png" alt="icon send" id="chat_send" class="w-[52px] h-[52px] cursor-pointer"/>
      </div>
    </div>
  </div>`;
  }
}
