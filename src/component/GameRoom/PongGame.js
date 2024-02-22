import Component from '../../core/Component';
import { $ } from '../../utils/querySelector';

export default class PongGame extends Component {
  constructor($target, props) {
    super($target, props);
    this.$target = $target;
    this.props = this.props;
    this.pong();
    this.render();
  }

  pong() {
    const canvas = $('#myCanvas');
    const ctx = canvas.getContext('2d');

    //ball position
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    const ballRadius = 2;

    //centerbar info
    let centerbarWidth = 3;
    let centerbarHeight = 10;
    let centerBardy = 0;
    let paddleHeight = 30;
    let paddleWidth = 5;

    //user1 info
    let user1_dx = 3;
    let user1_dy = -3;
    let user1_paddleY = (canvas.height - paddleHeight) / 2;
    let user1_upPressed = false;
    let user1_downPressed = false;

    //user2 info
    let dx = 0.8;
    let dy = -0.8;
    let user2_paddleY = (canvas.height - paddleHeight) / 2;
    let user2_upPressed = false;
    let user2_downPressed = false;

    //key event
    document.addEventListener('keydown', user1_keyDownHandler, false);
    document.addEventListener('keyup', user1_keyUpHandler, false);
    document.addEventListener('keydown', user2_keyDownHandler, false);
    document.addEventListener('keyup', user2_keyUpHandler, false);

    function drawCenterbar() {
      ctx.beginPath();
      while (centerBardy < 720) {
        ctx.rect(
          (canvas.width - centerbarWidth) / 2,
          centerBardy,
          centerbarWidth,
          centerbarHeight,
        );
        ctx.fillStyle = 'white';
        ctx.fill();
        centerBardy += 20;
      }
      centerBardy = 0;
      ctx.closePath();
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
    }

    function User1_drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleWidth + 10, user1_paddleY, paddleWidth, paddleHeight);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
      if (user1_upPressed && user1_paddleY < canvas.height - paddleHeight) {
        user1_paddleY += 3;
      } else if (user1_downPressed && user1_paddleY > 0) {
        user1_paddleY -= 3;
      }
    }

    function User2_drawPaddle() {
      ctx.beginPath();
      ctx.rect(
        canvas.width - paddleWidth - 10,
        user2_paddleY,
        paddleWidth,
        paddleHeight,
      );
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
      if (user2_upPressed && user2_paddleY < canvas.height - paddleHeight) {
        user2_paddleY += 3;
      } else if (user2_downPressed && user2_paddleY > 0) {
        user2_paddleY -= 3;
      }
    }

    function User1_gameover() {
      if (x + dx < ballRadius) {
        alert('USER2 WIN');
        clearInterval(interval);
        document.location.reload();
      } else if (x + dx > canvas.width - ballRadius - 15) {
        if (
          y > user2_paddleY &&
          y < user2_paddleY + paddleHeight &&
          x < canvas.width - ballRadius - 5
        )
          dx = -dx;
      }
    }

    function User2_gameover() {
      if (x + dx > canvas.width - ballRadius) {
        alert('USER1 WIN');
        clearInterval(interval);
        document.location.reload();
      } else if (x + dx < ballRadius + paddleWidth + 15) {
        if (
          y > user1_paddleY &&
          y < user1_paddleY + paddleHeight &&
          x > ballRadius + 5
        )
          dx = -dx;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawCenterbar();
      User1_drawPaddle();
      User2_drawPaddle();
      x += dx;
      y += dy;
      User1_gameover();
      User2_gameover();
      if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
      }
    }

    function user1_keyDownHandler(e) {
      if (e.keyCode == 83) {
        user1_upPressed = true;
      } else if (e.keyCode == 87) {
        user1_downPressed = true;
      }
    }

    function user1_keyUpHandler(e) {
      if (e.keyCode == 83) {
        user1_upPressed = false;
      } else if (e.keyCode == 87) {
        user1_downPressed = false;
      }
    }

    function user2_keyDownHandler(e) {
      if (e.keyCode == 40) {
        user2_upPressed = true;
      } else if (e.keyCode == 38) {
        user2_downPressed = true;
      }
    }

    function user2_keyUpHandler(e) {
      if (e.keyCode == 40) {
        user2_upPressed = false;
      } else if (e.keyCode == 38) {
        user2_downPressed = false;
      }
    }

    let interval = setInterval(draw, 10);
  }

  render() {}
}