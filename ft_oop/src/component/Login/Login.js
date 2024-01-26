export default function Login() {
  return /*html*/ `
  <div class="flex flex-col justify-center items-center">
    <img
      src="/logo.png"
      alt="logo"
      class="pointer-events-none w-[500px] h-[500px]"
    />
    <div
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
