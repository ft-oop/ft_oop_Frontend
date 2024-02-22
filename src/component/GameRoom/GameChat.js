import Component from '../../core/Component';

export default class GameChat extends Component {
  constructor($target, props, picture1, picture2) {
    super($target, props);
    this.$target = $target;
    this.props = this.props;
    this.picture1 = picture1;
    this.picture2 = picture2;
    this.setup();
    this.setEvent();
    this.render();
  }

  template() {
    return `
      <div class="w-full h-full flex-col justify-center m-auto">
          <div class="w-full h-[90%] mb-[10px] overflow-y-auto">
          <div class="w-full min-h-[630px] flex flex-col justify-end"></div>
        </div>
        <div class="w-[95%] h-[60px] flex justify-center items-center m-auto">
          <input type="text" id="chat_input" class="w-full h-[40px] px-[15px] mr-[8px] rounded-[20px]
            focus:outline-none bg-[#e7eff8]"/>
          <img src="/bubble.png" alt="icon send" id="chat_send" class="w-[52px] h-[52px] cursor-pointer"/>
        </div>
      </div>`;
  }
}
