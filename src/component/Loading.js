import '../style/Loading.css';
import Component from '../core/Component.js';
import { $ } from '../utils/querySelector.js';

export default class Loading extends Component {
  template() {
    return ``;
  }

  mounted() {
    const wrapper = document.createElement('div');
    wrapper.id = 'LoadingWrapper';

    this.$target.appendChild(wrapper);

    for (let i = 0; i < 20; i++) {
      this.createBubbles(i);
    }

    const loading = document.createElement('div');
    loading.id = 'TitleWrapper';
    loading.style.position = 'absolute';
    loading.style.zIndex = '100';

    this.$target.appendChild(loading);

    loading.innerHTML = `
      <div id="Loading" class="w-[100vw] h-[100vh] flex flex-col justify-center item-center">
        <h1 id="LoadingTitle"
          class="
            flex align-center item-center justify-center
            text-8xl text-gray-600 font-bold
            my-[20px]
          "
        >
          <img src="/bubbles_emoji.png" alt="bubbles"
            class="w-20 h-20 my-auto mx-[20px] flex justify-center item-center align-center"
          />
          Loading...
          <img src="/bubbles_emoji.png" alt="bubbles"
            class="w-20 h-20 my-auto mx-[20px] flex justify-center item-center align-center"
          />
        </h1>
      </div>
    `;

    // . .. ... . .. ...
    // const loadingText = document.getElementById('LoadingTitle');
    // let dots = '.';

    // setInterval(function () {
    //   dots += '.';
    //   if (dots.length > 3) dots = '';

    //   loadingText.innerHTML = `
    //     <img src="/bubbles_emoji.png" alt="bubbles" class="w-20 h-20 my-auto mx-[20px] flex justify-center item-center align-center"/>
    //     Loading${dots}
    //     <img src="/bubbles_emoji.png" alt="bubbles" class="w-20 h-20 my-auto mx-[20px] flex justify-center item-center align-center"/>
    // `;
    // }, 500);
  }

  createBubbles(i) {
    const bubble = document.createElement('div');
    $('#LoadingWrapper').appendChild(bubble);

    bubble.classList.add('Loading');
    this.setBubbleStyle(bubble, i);

    bubble.innerHTML = `
      <img src="/bubble.png" alt="bubbles" class="w-full h-full"/>
    `;
  }

  setBubbleStyle(bubble, i) {
    // let size = Math.floor(Math.random() * 61) + 30; // 30 ~ 90
    let size = (Math.floor(Math.random() * 31) + 10) * 10; // 100 ~ 40
    let speedRandom = Math.random() * 10 + 3;
    let speed = parseFloat(speedRandom.toFixed(3));
    const delay = Math.floor(Math.random() * 7);

    // 버블 사이의 간격과 위치 균등하게 설정
    const distanceBetweenBubbles = 5; // 버블 사이의 간격
    const numberOfBubbles = Math.floor(100 / distanceBetweenBubbles); // 버블 개수
    const locations = Array.from(
      { length: numberOfBubbles },
      (_, index) => index * distanceBetweenBubbles,
    ); // 버블 위치 목록

    const location = locations[i];
    console.log(size, delay, speed, location);

    // 버블 스타일 설정
    bubble.style.bottom = `-${size}px`;
    bubble.style.left = `${location}%`;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.animationDelay = `${delay}s, ${delay}s`;
    bubble.style.animationDuration = `5s, ${speed}s`;
    bubble.style.opacity = `${size / 400}`;

    // 버블 애니메이션 설정
    const style = document.createElement('style');
    document.head.appendChild(style);

    style.sheet.insertRule(`@keyframes shaking {
      0% {
        transform: translateX(-${size * 0.05}%);
      }
      50% {
        transform: translateX(${size * 0.05}%);
      }
      100% {
        transform: translateX(-${size * 0.05}%);
      }
    }`);

    style.sheet.insertRule(`@keyframes goUp {
      0% {
        bottom: -${size}px;
      }
      100% {
        bottom: 100%;
      }
    }`);
  }
}
