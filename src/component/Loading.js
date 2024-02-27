// import '../style/Loading.css';
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
    this.$target.appendChild(wrapper);

    this.createBubbles();
  }

  createBubbles() {
    const bubble = document.createElement('div');
    $('#LoadingWrapper').appendChild(bubble);

    bubble.innerHTML = `
      <img src="/bubble.png" alt="bubbles"
        class="
          w-200 h-200 my-auto mx-[20px] flex justify-center item-center align-center
          animate-wiggle
        "
      />
    `;
  }
}