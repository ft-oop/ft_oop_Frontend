import Component from '../../core/Component';

export default class Category extends Component {
  constructor($target, props) {
    super($target, props);
  }

  template() {
    return `
      <div class='bg-neutral-100 bg-opacity-60 shadow-md rounded-md w-[30vw] h-[60vh] hover:animate-pulse cursor-pointer group'>
        <div class='relative flex flex-col justify-center items-center h-full drop-shadow space-y-2'>
          <div class='text-7xl'>
            ${this.props.emoji}
          </div>
          <div class='text-2xl font-semibold group-hover:font-bold group-hover:text-purple-500'>
            ${this.props.title}
          </div>
          <img src="/bubble.png" alt="img" class="absolute bottom-2 right-2 pointer-events-none drop-shadow w-[25px] h-[25px]" />
        </div>
      </div>
    `;
  }
}
