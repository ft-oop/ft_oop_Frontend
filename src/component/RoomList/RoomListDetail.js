import Component from '../../core/Component';

export default class RoomListDetail extends Component {
  template() {
    return `
    <div class='bg-zinc-100 w-[50%] h-[100px] rounded-xl shadow-md flex justify-between items-center px-4 hover:bg-zinc-200 mx-2'>
      <div class='flex flex-col'>
        <span class='text-xl font-semibold text-gray-700'>고수 기다림</span>
        <span class='text-sm text-gray-600'>1:1 매칭</span>
      </div>
      <div class='flex flex-col items-end text-lg text-gray-800'>
        <div>
          <span>1</span> / <span>2</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32M540 701v53c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8v-53a48.01 48.01 0 1 1 56 0m152-237H332V240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56z"/></svg>
      </div>
    </div>
    `;
  }

  mounted() {}
}
