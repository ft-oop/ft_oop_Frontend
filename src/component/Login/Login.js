import { navigate } from '../../utils/navigate.js';
import apiController from '../../utils/apiController.js';

function Login($container) {
  this.$container = $container;

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    handleCode();

    this.$container.innerHTML = `
    <div class="flex flex-col justify-center items-center h-full">
      <img
        src="/logo.png"
        alt="logo"
        class="pointer-events-none w-[500px] h-[500px] animate-bounce"
      />
      <div
        id="loginBtn"
        class="flex justify-center items-center text-2xl font-semibold hover:text-3xl hover:font-bold text-purple-400 w-[200px] h-[200px] bg-cover cursor-pointer"
        style="background-image: url(/bubble.png)"
      >
        <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-80593f2ca92d09f7d42166593b99cc335953a89bc775c0596ac93a9eb3bc4c44&redirect_uri=http%3A%2F%2F10.13.6.7%3A5173%2Flogin&response_type=code"
          class="w-full h-full justify-center hover:text-3xl hover:text-purple-400"
        >
          <span class="w-full h-full rounded-full flex items-center justify-center align-middle">
            Login
          </span>
        </a>
      </div>
    <div class="-z-10">
      <img
        src="/bubble.png"
        alt="img"
        class="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px]"
      />
      <img
        src="/bubble.png"
        alt="img"
        class="pointer-events-none absolute -bottom-28 -right-40 w-[600px] h-[600px]"
      />
      <img
        src="/bubble.png"
        alt="img"
        class="pointer-events-none absolute bottom-80 -right-10 w-[200px] h-[200px]"
      />
    </div>
  </div>
    `;
  };
  this.init = () => {
    this.render();
  };

  this.init();
}

async function handleCode() {
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

  // 여기 loading을 넣는다면?

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

export default Login;
