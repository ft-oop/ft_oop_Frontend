import Component from '../../core/Component.js';
import { $ } from '../../utils/querySelector.js';
import apiController from '../../utils/apiController.js';
import { navigate } from '../../utils/navigate.js';

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
        <p id="InvalidCode" class="my-[10px] text-white text-sm">잘못된 코드입니다.</p>
        <form name="2FA">
          <input
            type="text" id="TwoFA_form__input"
            class="bg-transparent w-[300px] h-[100px] border-b border-black text-center text-5xl
              m-[20px] required:border-red-500"
          >
          <input type="text" style="display:none;">${
            /* submit 시 새로고침 방지 */ ''
          }
        </form>
        <span class="text-sm text-center">
          2차 인증 코드를 42에 등록된 이메일로 발송하였습니다.<br />
          상단에 인증 코드를 입력해 주세요.
        </span>
      </div>
      <div
        id="TwoFA_form__submit"
        class="flex justify-center items-center text-2xl font-semibold hover:text-3xl hover:font-bold text-purple-400 w-[200px] h-[200px] bg-cover cursor-pointer"
        style="background-image: url(../../../public/bubble.png)"
      >
        Login
      </div>
    </div>
    `;
  }

  setEvent() {
    this.$target.addEventListener('click', (e) => {
      if (e.target.id === 'TwoFA_form__submit') {
        this.checkValid();
      }
    });

    this.$target.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.id === 'TwoFA_form__input') {
        if (e.isComposing) return;
        this.checkValid();
      }
    });
  }

  checkValid() {
    const input = $('#TwoFA_form__input');

    console.log('input.value: ', input.value);

    if (input.value === '') {
      input.classList.add('border-red-500');
      input.focus();
      return;
    }

    this.handleCode(input);
  }

  set2FAWrapper($form) {
    $form.style.width = '100vw';
    $form.style.height = '100vh';
    $form.style.display = 'flex';
    $form.style.flexDirection = 'column';
    $form.style.justifyContent = 'center';
    $form.style.alignItems = 'center';
  }

  async handleCode(input) {
    try {
      const code = input.value;

      const config = {
        method: 'POST',
        url: '/oauth/login/2FA',
        data: { code },
      };

      console.log(config);

      // 여기 loading을 넣는다면?

      const res = await apiController(config);

      if (res && res.status === 200) {
        navigate('/');
      }
    } catch (e) {
      if (e.status === 400) {
        console.log('2차인증에 실패했습니다.');
        input.value = '';
        $('#InvalidCode').classList.remove('text-white');
        $('#InvalidCode').classList.add('text-red-500');
        input.classList.add('border-red-500');
        input.focus();
      }
    }
  }
}
