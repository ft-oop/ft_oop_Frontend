import { $ } from "../../utils/querySelector.js"
import { BASE_URL} from '../../constant/routeInfo.js';
import { navigate } from '../../utils/navigate.js';

function Login($container) {
  this.$container = $container;

  this.setState = () => {
    this.render();
  }


  this.render = () => {
    this.$container.innerHTML = `
    <div class="flex flex-col justify-center items-center">
      <img
        src="/logo.png"
        alt="logo"
        class="pointer-events-none w-[500px] h-[500px]"
      />
      <div
        id="loginBtn"
        class="flex justify-center items-center text-2xl font-semibold hover:text-3xl hover:font-bold text-purple-400 w-[200px] h-[200px] bg-cover cursor-pointer"
        style="background-image: url(/bubble.png)"
      >
        Login
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
  }
  this.init = () => {
    this.render();
    $('#loginBtn').addEventListener('click', (e) => {
      const targetURL = window.location.href.replace(BASE_URL, "login");
      navigate(targetURL);
    });
  }


  this.init();
}

export  default Login;