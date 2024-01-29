import '../../style/MyPage.css';

export default function MyPage({ $target }) {
  const $myPage = document.createElement('div');
  $myPage.className = 'MyPage';
  $target.appendChild($myPage);

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    $myPage.innerHTML = `
      <img id="back" src="/eva--arrow-back-fill.svg" alt="back arrow">
      <div class="MyPage_container">
        <div class="MyPage_profile_container">
          <div class="MyPage_profile"></div>
        </div>
        <div class="MyPage_info">
          <div class="MyPage_info__history"></div>
          <div class="MyPage_info__friend_list"></div>
        </div>
      </div>
    `;
  };

  this.render();
}
