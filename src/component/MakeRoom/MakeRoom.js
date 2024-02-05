import Component from '../../core/Component';

export default class MakeRoom extends Component {
  template() {
    return `
      <div>
        ${this.bootstrapInput('방 제목', '방 제목을 입력하세요')}
      </div>
    `;
  }

  mounted() {
    console.log('aaa');
  }

  
}
