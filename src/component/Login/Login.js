import Component from '../../core/Component.js';
import { navigate } from '../../utils/navigate.js';
import apiController from '../../utils/apiController.js';
import Loading from '../Loading.js';

export default class Login extends Component {
  template() {
    return `
    <div class="flex flex-col justify-center items-center h-full">
    <img
    src="../../../public/logo.png"
    alt="logo"
    class="pointer-events-none w-[500px] h-[500px] animate-bounce"
    />
    <div
    id="loginBtn"
    class="flex justify-center items-center text-2xl font-semibold hover:text-3xl hover:font-bold text-purple-400 w-[200px] h-[200px] bg-cover cursor-pointer"
    style="background-image: url(../../../public/bubble.png)"
    >
    
        <a
          href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-80593f2ca92d09f7d42166593b99cc335953a89bc775c0596ac93a9eb3bc4c44&redirect_uri=http%3A%2F%2Flocalhost%2Flogin&response_type=code"
          class="w-full h-full justify-center hover:text-3xl hover:text-purple-400"
        >
          <span class="w-full h-full rounded-full flex items-center justify-center align-middle">
            Login
          </span>
        </a>
      </div>
      <div class="-z-10">
        <img
          src="../../../public/bubble.png"
          alt="img"
          class="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px]"
        />
        <img
          src="../../../public/bubble.png"
          alt="img"
          class="pointer-events-none absolute -bottom-28 -right-40 w-[600px] h-[600px]"
        />
        <img
          src="../../../public/bubble.png"
          alt="img"
          class="pointer-events-none absolute bottom-80 -right-10 w-[200px] h-[200px]"
        />
      </div>
    </div>;
    `;
  }

  mounted() {
    this.handleCode();
  }

  async handleCode() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (!code) return;

    const config = {
      method: 'POST',
      url: '/oauth/login/',
      data: {
        code,
      },
    };

    new Loading(this.$target, this.state);

    const { data, status } = await apiController(config);

    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);

    if (status === 200) {
      navigate('/');
    } else if (status === 201) {
      const config = {
        url: '/oauth/login/2FA/email',
      };

      apiController(config);
      navigate('/2FA');
    }
  }
}

// async function handleCode() {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const code = urlParams.get('code');

//   if (!code) return;

//   const data = {
//     code,
//   };

//   const response = await fetch(`${BASE_URL}/oauth/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });

//   if (response.ok) {
//     const result = await response.json();
//     console.log('res: ', result);

//     // 2차인증이 or HOME
//   } else {
//     console.log('로그인에 실패했습니다.');
//     return;
//   }
// }
