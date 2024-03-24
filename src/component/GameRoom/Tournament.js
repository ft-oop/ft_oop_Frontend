import Component from '../../core/Component';
import { $ } from '../../utils/querySelector';
import '../../style/GameRoom.css';
import { navigate } from '../../utils/navigate.js';

export default class Tournament extends Component {
  constructor($target, props) {
    super($target, props);
    this.setup();
  }

  mounted() {
    this.appendInfoWrapper();
  }

  appendInfoWrapper() {
    const $wrapper = document.createElement('div');
    $wrapper.id = 'GameRoom_wrapper';
    this.$target.appendChild($wrapper);

    $wrapper.style.height = '100vh';

    $wrapper.innerHTML = `
      <div class="w-full h-full flex">
      <img id='goBack' src="/eva--arrow-back-fill.svg" alt="close" class='h-8 absolute top-6 left-6 rounded-full p-1 hover:shadow-md'/>
        <div class="w-[1728px] h-[1117px] m-auto">
          <div class="w-full h-[100px] flex"></div>
          <div class="w-full h-[917px] flex">
            <div id="gameScreenContainer">
            <div class="w-full h-1/4 flex justify-center items-center bg-white">
                <div class="w-[125px] h-[125px]">
                    <div class="w-[100px] h-[100px] rounded-full mx-auto bg-gray-300 shadow-xl"></div>
                    <p class="text-center">hunpark</p>
                </div>
            </div>
            <div class="w-full h-1/4 flex justify-center items-center bg-white">
                <div class="w-[125px] h-[125px] mx-40">
                    <div class="w-[100px] h-[100px] rounded-full mx-auto bg-gray-300 shadow-xl"></div>
                    <p class="text-center">hunpark</p>
                </div>
                <div class="w-[125px] h-[125px] mx-40">
                    <div class="w-[100px] h-[100px] rounded-full mx-auto bg-gray-300 shadow-xl"></div>
                    <p class="text-center">hunpark</p>
                </div>
            </div>
            <div class="w-full h-1/4 flex justify-center items-center bg-white">
                <div class="w-[125px] h-[125px] mx-20">
                    <div class="w-[100px] h-[100px] rounded-full mx-auto bg-gray-300 shadow-xl"></div>
                    <p class="text-center">hunpark</p>
                </div>
                <div class="w-[125px] h-[125px] mx-20">
                    <div class="w-[100px] h-[100px] rounded-full mx-auto bg-gray-300 shadow-xl"></div>
                    <p class="text-center">hunpark</p>
                </div>
                <div class="w-[125px] h-[125px] mx-20">
                    <div class="w-[100px] h-[100px] rounded-full mx-auto bg-gray-300 shadow-xl"></div>
                    <p class="text-center">hunpark</p>
                </div>
                <div class="w-[125px] h-[125px] mx-20">
                    <div class="w-[100px] h-[100px] rounded-full mx-auto bg-gray-300 shadow-xl"></div>
                    <p class="text-center">hunpark</p>
                </div>
            </div>
            <div class="w-full h-1/4 flex justify-center items-center bg-white">
                <div class="w-[125px] h-[125px] mx-10">
                    <div class="w-[100px] h-[100px] rounded-full mx-auto bg-gray-300 shadow-xl"></div>
                    <p class="text-center">hunpark</p>
                </div>
                <div class="w-[125px] h-[125px] mx-10">
                    <div class="w-[100px] h-[100px] rounded-full mx-auto bg-gray-300 shadow-xl"></div>
                    <p class="text-center">hunpark</p>
                </div>
                <div class="w-[125px] h-[125px] mx-10">
                    <div class="w-[100px] h-[100px] rounded-full mx-auto bg-gray-300 shadow-xl"></div>
                    <p class="text-center">hunpark</p>
                </div>
                <div class="w-[125px] h-[125px] mx-10">
                    <div class="w-[100px] h-[100px] rounded-full mx-auto bg-gray-300 shadow-xl"></div>
                    <p class="text-center">hunpark</p>
                </div>
                <div class="w-[125px] h-[125px] mx-10">
                    <div class="w-[100px] h-[100px] rounded-full mx-auto bg-gray-300 shadow-xl"></div>
                    <p class="text-center">hunpark</p>
                </div>
                <div class="w-[125px] h-[125px] mx-10">
                    <div class="w-[100px] h-[100px] rounded-full mx-auto bg-gray-300 shadow-xl"></div>
                    <p class="text-center">hunpark</p>
                </div>
                <div class="w-[125px] h-[125px] mx-10">
                    <div class="w-[100px] h-[100px] rounded-full mx-auto bg-gray-300 shadow-xl"></div>
                    <p class="text-center">hunpark</p>
                </div>
                <div class="w-[125px] h-[125px] mx-10">
                    <div class="w-[100px] h-[100px] rounded-full mx-auto bg-gray-300 shadow-xl"></div>
                    <p class="text-center">hunpark</p>
                </div>
            </div>
            </div>
          </div>
          <div class="w-full h-[125px] grid place-items-center">
            <button id = "ready" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">준비</button>
          </div>
        </div>
      </div>`;

    this.addEvent('click', '#goBack', (e) => {
      navigate('/');
    });
  }

  //   setEvent() {
  //     if (this.$target.classList.contains('GameRoomEvents')) return;

  //     this.$target.classList.add('GameRoomEvents');
  //     this.$target.addEventListener('click', this.handleButton.bind(this));
  //   }

  handleButton(event) {
    const button = event.target;

    //handleButtons(this.$target, this.state, button);
  }
}
