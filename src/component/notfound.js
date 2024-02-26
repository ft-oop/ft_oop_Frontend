import Component from '../core/Component.js';

export default class NotFound extends Component {
  mounted() {
    const $wrapper = document.createElement('div');
    $wrapper.id = 'NotFoundWrapper';
    this.$target.appendChild($wrapper);

    $wrapper.innerHTML = `
      <div id="NotFound" class="w-[100vw] h-[100vh] flex flex-col justify-center item-center">
        <h1 id="NotFoundTitle"
          class="
            flex align-center item-center justify-center
            text-8xl text-gray-600 font-bold
            my-[20px]
          "
          >
          <img src="/bubbles_emoji.png" alt="bubbles"
            class="w-20 h-20 my-auto mx-[20px] flex justify-center item-center align-center"
          />
          404 Not Found
          <img src="/bubbles_emoji.png" alt="bubbles"
            class="w-20 h-20 my-auto mx-[20px] flex justify-center item-center align-center"
          />
        </h1>
        <p id="NotFoundDescription"
          class="
            flex align-center item-center justify-center
            text-3xl text-gray-600 font-semibold
            my-[20px]
          "
          >
          페이지를 찾을 수 없습니다.
        </p>
      </div>
    `;
  }
}
