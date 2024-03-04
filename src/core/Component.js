export default class Component {
  $target;
  props;
  state;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setup();
    // this.setEvent();
    // this.render();
  }

  async setup() {
    await this.asyncInitialization();

    this.setEvent();
    this.render();
  }

  async asyncInitialization() {
    await new Promise((resolve) => setTimeout(resolve, 1));
  }

  mounted() {}

  template() {
    return `
      <div id="Background">
        <img id="bubble1" src="/bubble.png" alt="bubble" class="absolute h-auto w-[800px] -bottom-[30%] -right-[20%] -z-10">
        <img id="bubble2" src="/bubble.png" alt="bubble" class="absolute h-auto w-[400px] top-1/3 left-[87%] -z-10">
        <img id="bubble3" src="/bubble.png" alt="bubble" class="absolute h-auto w-[300px] -top-[18%] left-[40%] -z-10">
        <img id="bubble4" src="/bubble.png" alt="bubble" class="absolute h-auto w-[1000px] top-1/3 -left-[20%] -z-10">
      </div>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  setEvent() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      event.stopImmediatePropagation();
      callback(event);
    });
  }
}
