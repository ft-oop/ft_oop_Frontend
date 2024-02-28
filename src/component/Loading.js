import '../style/Loading.css';
import Component from '../core/Component.js';
import { $ } from '../utils/querySelector.js';

export default class Loading extends Component {
  template() {
    return `
    `;
  }

  mounted() {
    const wrapper = document.createElement('div');
    wrapper.id = 'LoadingWrapper';

    wrapper.style.width = '100%';
    wrapper.style.height = '100%';

    this.$target.appendChild(wrapper);

    for (let i = 0; i < 10; i++) {
      this.createBubbles();
    }
  }

  createBubbles() {
    const bubble = document.createElement('div');
    $('#LoadingWrapper').appendChild(bubble);

    bubble.classList.add('Loading');
    this.setBubbleStyle(bubble);

    bubble.innerHTML = `
      <img src="/bubble.png" alt="bubbles" class="w-full h-full"/>
    `;
  }

  setBubbleStyle(bubble) {
    const size = Math.floor(Math.random() * 400) + 200;
    const delay = Math.random() * 5;
    const speed = Math.floor(Math.random() * 5) + 5;

    // 버블 사이의 간격과 위치 배열 생성
    const distanceBetweenBubbles = 10; // 버블 사이의 간격
    const numberOfBubbles = Math.floor(100 / distanceBetweenBubbles); // 버블 개수
    const locations = Array.from(
      { length: numberOfBubbles },
      (_, index) => index * distanceBetweenBubbles,
    ); // 버블 위치 목록

    // 랜덤하게 위치를 선택
    const randomIndex = Math.floor(Math.random() * locations.length);
    const location = locations[randomIndex];

    bubble.style.bottom = `-${size}px`;
    bubble.style.left = `${location}%`;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.animationDelay = `${delay}s, ${delay}s`;
    bubble.style.animationDuration = `5s, ${speed}s`;

    const style = document.createElement('style');
    document.head.appendChild(style);

    // @keyframes shaking 추가
    style.sheet.insertRule(`@keyframes shaking {
      0% {
        transform: translateX(-${size * 0.02}%);
      }
      50% {
        transform: translateX(${size * 0.02}%);
      }
      100% {
        transform: translateX(-${size * 0.02}%);
      }
    }`);

    // @keyframes goUp 추가
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
