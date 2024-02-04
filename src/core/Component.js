export default class Component {
  $target;
  props;
  state;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}
  mounted() {}

  template() {
    return `
      <div class="Wrapper">
        <div class="MyPage_container">
          <div class="MyPage_profile_container">
            <div class="MyPage_profile"></div>
          </div>
          <div class="MyPage_info">
            <div class="MyPage_info__history"></div>
            <div class="MyPage_info__user_list"></div>
          </div>
        </div>
        </div>
      <div id="Background">
        <img id="bubble1" src="/bubble.png" alt="bubble">
        <img id="bubble2" src="/bubble.png" alt="bubble">
        <img id="bubble3" src="/bubble.png" alt="bubble">
        <img id="bubble4" src="/bubble.png" alt="bubble">
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
      callback(event);
    });
  }
}
