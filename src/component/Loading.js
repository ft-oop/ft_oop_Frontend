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
      this.createBubbles(i);
    }
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
    let size = (Math.floor(Math.random() * 40) + 10) * 10;
    let speedRandom = Math.random() * 10 + 3;
    let speed = parseFloat(speedRandom.toFixed(3));
    const delay = Math.floor(Math.random() * 7);

    // 버블 사이의 간격과 위치 배열 생성
    const distanceBetweenBubbles = 10; // 버블 사이의 간격
    const numberOfBubbles = Math.floor(100 / distanceBetweenBubbles); // 버블 개수
    const locations = Array.from(
      { length: numberOfBubbles },
      (_, index) => index * distanceBetweenBubbles,
    ); // 버블 위치 목록

    // 랜덤하게 위치를 선택
    const location = locations[i];
    console.log(size, delay, speed, location);

    bubble.style.bottom = `-${size}px`;
    bubble.style.left = `${location}%`;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.animationDelay = `${delay}s, ${delay}s`;
    bubble.style.animationDuration = `5s, ${speed}s`;

    const style = document.createElement('style');
    document.head.appendChild(style);

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

    style.sheet.insertRule(`@keyframes goUp {
      0% {
        bottom: -${size}px;
      }
      100% {
        bottom: 100%;
      }
    }`);
  }

  isSimilarValueExists(value, array, threshold) {
    for (let i = 0; i < array.length; i++) {
      if (Math.abs(value - array[i]) <= threshold) {
        return true;
      }
    }
    return false;
  }
}
