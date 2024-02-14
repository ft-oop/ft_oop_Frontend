import Component from '../../core/Component';
import { navigate } from '../../utils/navigate.js';
import { $ } from '../../utils/querySelector';

export default class TwoFA extends Component {
  mounted() {
    const $form = document.createElement('div');
    $form.id = 'TwoFA_form';
    this.$target.appendChild($form);

    this.set2FAWrapper($form);

    $form.innerHTML = `
      <div id="TwoFA_form__wrapper"
        class="w-[640px] h-[380px] m-[100px] mt-[150px] flex flex-col items-center justify-center
          bg-white rounded-[30px] shadow-[5px_5px_10px_0px_rgba(0,0,0,0.2)] text-2xl"
      >
        <h1>2차 인증 코드</h1>
        <form name="2FA">
          <input
            type="text" id="TwoFA_form__input"
            class="bg-transparent w-[300px] h-[100px] border-b border-black text-center text-5xl
              m-[20px] required:border-red-500"
          >
        </form>
        <span class="text-sm text-center">
          2차 인증 코드를 42에 등록된 이메일로 발송하였습니다.<br />
          상단에 인증 코드를 입력해 주세요.
        </span>
      </div>
      <div
        id="TwoFA_form__submit"
        class="flex justify-center items-center text-2xl font-semibold hover:text-3xl hover:font-bold text-purple-400 w-[200px] h-[200px] bg-cover cursor-pointer"
        style="background-image: url(/bubble.png)"
      >
        Login
      </div>
    </div>
    `;
  }

  setEvent() {
    this.$target.addEventListener('click', (e) => {
      if (e.target.id === 'TwoFA_form__submit') {
        e.preventDefault();
        this.checkValid();
      }
    });
  }

  checkValid() {
    const input = $('#TwoFA_form__input');

    if (input.value === '') {
      input.classList.add('border-red-500');
      input.focus();
      return;
    }

    // 코드 일치 여부 확인 후 로그인

    navigate('/');
  }

  set2FAWrapper($form) {
    $form.style.width = '100vw';
    $form.style.height = '100vh';
    $form.style.display = 'flex';
    $form.style.flexDirection = 'column';
    $form.style.justifyContent = 'center';
    $form.style.alignItems = 'center';
  }
}
