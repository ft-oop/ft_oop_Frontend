import Component from '../../core/Component.js';

export default class RandomMatch extends Component {
  template() {
    return `
      <div class='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-3xl shadow-2xl flex flex-col justify-center items-center gap-6'>
        <img src="/eva--arrow-back-fill.svg" alt="close" id="goBack" class='h-8 absolute top-6 left-6 rounded-full p-1 hover:shadow-md'/>
        <div class='text-xl font-bold'>
          <span class='text-4xl mr-2'>🤝</span>1:1 랜덤 매칭
        </div>
        <img alt='logo' src='logo.png' class=' h-[150px]' /> 
        <div class='animate-pulse text-lg font-semibold text-gray-700'>
          상대를 찾을 때까지 숨참는 중...
        </div>
      </div>
    `;
  }

  mounted() {
    this.addEvent('click', '#goBack', (e) => {
      this.$target.remove();
    });
  }
}
