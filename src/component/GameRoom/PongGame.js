import * as THREE from 'https://unpkg.com/three/build/three.module.js';

export default class PongGame {
  user1 = {
    posY: 0,
    upPressed: false,
    downPressed: false,
    skill: false,
    skillpower: 0,
    score: 0,
  };

  user2 = {
    posY: 0,
    upPressed: false,
    downPressed: false,
    skill: false,
    skillpower: 0,
    score: 0,
  };

  ball_info = {
    radius: 5,
    dx: 1,
    dy: -1,
  };

  pong() {
    let VIEW_ANGLE = 70;
    let WIDTH = 1668;
    let HEIGTH = 733.59;
    let ASPECT = WIDTH / HEIGTH;
    let NEAR = 0.1;
    let FAR = 10000;
    let container, renderer, camera, scene;
    let x_plane = 500,
      y_plane = 300,
      x_cube = 10,
      y_cube = 50;
    let plane, player_1, player_2, ball;

    function setRenderer() {
      container = document.getElementById('myCanvas');

      renderer = new THREE.WebGLRenderer({ canvas: container });
      renderer.setSize(WIDTH, HEIGTH);
      renderer.setClearColor('#9ca3af');
    }

    function user1_keyDownHandler(e) {
      //console.log(player_1.position.y);
      if (e.keyCode == 83) {
        this.user1.downPressed = true;
      } else if (e.keyCode == 87) {
        this.user1.upPressed = true;
      } else if (e.keyCode == 32) {
        this.user1.skill = true;
      }
    }

    function user1_keyUpHandler(e) {
      if (e.keyCode == 83) {
        this.user1.downPressed = false;
      } else if (e.keyCode == 87) {
        this.user1.upPressed = false;
      } else if (e.keyCode == 32) {
        this.user1.skill = false;
        this.user1.skillpower = 0;
      }
    }

    function user2_keyDownHandler(e) {
      if (e.keyCode == 40) {
        this.user2.downPressed = true;
      } else if (e.keyCode == 38) {
        this.user2.upPressed = true;
      } else if (e.keyCode == 13) {
        this.user2.skill = true;
      }
    }

    function user2_keyUpHandler(e) {
      if (e.keyCode == 40) {
        this.user2.downPressed = false;
      } else if (e.keyCode == 38) {
        this.user2.upPressed = false;
      } else if (e.keyCode == 13) {
        this.user2.skill = false;
        this.user2.skillpower = 0;
      }
    }

    function setEventHandler() {
      document.addEventListener('keydown', user1_keyDownHandler, false);
      document.addEventListener('keyup', user1_keyUpHandler, false);
      document.addEventListener('keydown', user2_keyDownHandler, false);
      document.addEventListener('keyup', user2_keyUpHandler, false);
    }

    function setCamera() {
      camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
      camera.position.set(0, 0, 300);
    }

    function setScene() {
      scene = new THREE.Scene();
    }

    function setLights() {
      let light = new THREE.AmbientLight(0xffffff);
      scene.add(light);
    }

    function setWorld() {
      // 필드
      var geometry = new THREE.BoxGeometry(x_plane, y_plane, 0.01);
      var material = new THREE.MeshPhongMaterial({ color: 0x2222ff });
      plane = new THREE.Mesh(geometry, material);
      scene.add(plane);

      // 중앙분리
      var geometry = new THREE.BoxGeometry(5, y_plane, 1);
      var material = new THREE.MeshBasicMaterial({ color: 0x888888 });
      var centerbar = new THREE.Mesh(geometry, material);
      scene.add(centerbar);

      // 데코 1
      var geometry = new THREE.BoxGeometry(x_plane + 10, 5, 5);
      var material = new THREE.MeshBasicMaterial({
        color: 0xcccccc,
        side: THREE.DoubleSide,
      });
      var dec2 = new THREE.Mesh(geometry, material);
      dec2.position.y = y_plane / 2 + 0.025;
      scene.add(dec2);

      // 데코 2
      var geometry = new THREE.BoxGeometry(x_plane + 10, 5, 5);
      var material = new THREE.MeshBasicMaterial({
        color: 0xcccccc,
        side: THREE.DoubleSide,
      });
      var dec3 = new THREE.Mesh(geometry, material);
      dec3.position.y = -y_plane / 2 - 0.025;
      scene.add(dec3);

      // player_1
      var geometry = new THREE.BoxGeometry(x_cube, y_cube, 10);
      var material = new THREE.MeshPhongMaterial({ color: 0x005000 });
      player_1 = new THREE.Mesh(geometry, material);
      player_1.position.x = -x_plane / 2;
      player_1.position.y = this.user1.posY;
      //console.log(player_1.position);
      scene.add(player_1);

      // player_2
      var geometry = new THREE.BoxGeometry(x_cube, y_cube, 10);
      var material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
      player_2 = new THREE.Mesh(geometry, material);
      player_2.position.y = this.user1.posY;
      player_2.position.x = x_plane / 2;
      scene.add(player_2);

      // 공
      var geometry = new THREE.SphereGeometry(this.ball_info.radius, 32, 32);
      var material = new THREE.MeshPhongMaterial({ color: 0xffffff });
      ball = new THREE.Mesh(geometry, material);
      ball.position.z = 0.05;
      scene.add(ball);
    }

    function player1Move() {
      if (
        this.user1.upPressed &&
        player_1.position.y + y_cube / 2 + 5 < y_plane / 2
      ) {
        player_1.position.y += 3;
      } else if (
        this.user1.downPressed &&
        player_1.position.y - y_cube / 2 - 5 > -y_plane / 2
      ) {
        player_1.position.y -= 3;
      }
      if (this.user1.skill == true) this.user1.skillpower++;
    }

    function player2Move() {
      if (
        this.user2.upPressed &&
        player_2.position.y + y_cube / 2 + 5 < y_plane / 2
      ) {
        player_2.position.y += 3;
      } else if (
        this.user2.downPressed &&
        player_2.position.y - y_cube / 2 - 5 > -y_plane / 2
      ) {
        player_2.position.y -= 3;
      }
      if (this.user2.skill == true) this.user2.skillpower++;
    }
    function ballMove() {
      ball.position.x += this.ball_info.dx;
      ball.position.y += this.ball_info.dy;
      if (ball.position.y <= -y_plane / 2 + this.ball_info.radius) {
        this.ball_info.dy = -this.ball_info.dy;
      } else if (ball.position.y >= y_plane / 2 - this.ball_info.radius) {
        this.ball_info.dy = -this.ball_info.dy;
      }
      if (
        this.ball_info.dx >= 0 &&
        ball.position.x + x_cube / 2 + this.ball_info.radius >=
          player_2.position.x &&
        ball.position.y >= player_2.position.y - y_cube / 2 &&
        ball.position.y <= player_2.position.y + y_cube / 2 &&
        this.user2.skillpower >= 100
      ) {
        this.ball_info.dx = -2;
      } else if (
        this.ball_info.dx >= 0 &&
        ball.position.x + x_cube / 2 + this.ball_info.radius >=
          player_2.position.x &&
        ball.position.y >= player_2.position.y - y_cube / 2 &&
        ball.position.y <= player_2.position.y + y_cube / 2
      ) {
        this.ball_info.dx = -1;
      }
      if (
        this.ball_info.dx <= 0 &&
        ball.position.x - x_cube / 2 - this.ball_info.radius <=
          player_1.position.x &&
        ball.position.y >= player_1.position.y - y_cube / 2 &&
        ball.position.y <= player_1.position.y + y_cube / 2 &&
        this.user1.skillpower >= 100
      ) {
        this.ball_info.dx = 2;
      } else if (
        this.ball_info.dx <= 0 &&
        ball.position.x - x_cube / 2 - this.ball_info.radius <=
          player_1.position.x &&
        ball.position.y >= player_1.position.y - y_cube / 2 &&
        ball.position.y <= player_1.position.y + y_cube / 2
      ) {
        this.ball_info.dx = 1;
      }
    }

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function resetWorld() {
      ball.position.x = 0;
      if (Math.abs(this.ball_info.dx) > 1) {
        this.ball_info.dx = this.ball_info.dx / 2;
      }
      ball.position.y = rand(-140, 140);
    }

    function winOrLose() {
      if (ball.position.x + this.ball_info.radius >= x_plane / 2) {
        resetWorld();
      }
      if (ball.position.x - this.ball_info.radius <= -x_plane / 2) {
        resetWorld();
      }
    }

    function start() {
      setRenderer();
      setCamera();
      setEventHandler();
      setScene();
      setLights();
      setWorld();
    }

    function skill() {
      if (this.user1.skillpower >= 100) {
        player_1.material.color.setHex(0x000000);
      } else {
        player_1.material.color.setHex(0x005000);
      }
      if (this.this.user2.skillpower >= 100) {
        player_2.material.color.setHex(0x000000);
      } else {
        player_2.material.color.setHex(0xff0000);
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      player1Move();
      player2Move();
      ballMove();
      winOrLose();
      skill();
      console.log(this.ball_info.dx);
      renderer.render(scene, camera);
    }

    function init() {
      container = document.getElementById('myCanvas');

      renderer = new THREE.WebGLRenderer({ canvas: container });
      renderer.setSize(WIDTH, HEIGTH);
      renderer.setClearColor(0x808080);
      setScene();
      setCamera();
      setLights();
      renderer.render(scene, camera);
    }

    init();
    start();
    animate();
  }
}
