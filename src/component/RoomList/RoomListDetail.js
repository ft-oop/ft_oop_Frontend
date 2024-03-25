import Component from '../../core/Component.js';

export default class RoomListDetail extends Component {
  template() {
    return this.props.map(
      ({ name, type, max, enter, secret }) => `
    <div class='bg-zinc-100 h-[100px] rounded-xl shadow-md flex justify-between items-center px-4 hover:bg-zinc-200'>
      <div class='flex flex-col'>
        <span class='text-xl font-semibold text-gray-700'>${name}</span>
        <span class='text-sm text-gray-600'>${
          type === 1 ? '1:1' : '토너먼트'
        }</span>
      </div>
      <div class='flex flex-col items-end text-lg text-gray-800'>
        <div>
          <span>${enter}</span> / <span>${max}</span>
        </div>
        ${
          secret
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32M540 701v53c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8v-53a48.01 48.01 0 1 1 56 0m152-237H332V240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56z"/></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M832 464H332V240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v68c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-68c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32M540 701v53c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8v-53a48.01 48.01 0 1 1 56 0"/></svg>'
        }
      </div>
    </div>
    `
    ).join('');
  }

  mounted() {}
}
