import { $ } from '../utils/querySelector';

export default class Logo {
  constructor($target) {
    this.$target = $target;
    this.render();
  }

  render() {
    const logoBox = document.createElement('div');
    const app = $('#app');
    app.appendChild(logoBox);
    logoBox.innerHTML = `
      <img alt='logo' src='../../public/logo.png' class=' absolute h-16 top-2 left-4' /> 
    `;
  }
}
