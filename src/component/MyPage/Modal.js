import Component from '../../core/Component';
import '../../style/Modal.css';

export default class Modal extends Component {
  template() {
    return `
        <div class="Modal">
          <h1>Modal</h1>
          <div id="icon_close" class="Modal_close">X</div>
          <div class="Modal_body">
            <p>Modal Body</p>
          </div>
        </div>
    `;
  }
}
