import * as THREE from 'https://unpkg.com/three/build/three.module.js';

export default class PongGame {
  constructor() {
    this.user1 = {
      posY: 0,
      upPressed: false,
      downPressed: false,
      skill: false,
      skillpower: 0,
      score: 0,
    };

    this.user2 = {
      posY: 0,
      upPressed: false,
      downPressed: false,
      skill: false,
      skillpower: 0,
      score: 0,
    };

    this.ball_info = {
      radius: 5,
      posX: 0,
      posY: 0,
      dx: 1,
      dy: -1,
    };

    this.VIEW_ANGLE = 70;
    this.WIDTH = 1668;
    this.HEIGTH = 733.59;
    this.ASPECT = this.WIDTH / this.HEIGTH;
    this.NEAR = 0.1;
    this.FAR = 10000;
    this.container, this.renderer, this.camera, this.scene;
    (this.x_plane = 500),
      (this.y_plane = 300),
      (this.x_cube = 10),
      (this.y_cube = 50);
    this.plane, this.player_1, this.player_2, this.ball;
  }

  setRenderer() {
    console.log(this.user1.upPressed);
    this.container = document.getElementById('myCanvas');

    this.renderer = new THREE.WebGLRenderer({ canvas: this.container });
    this.renderer.setSize(this.WIDTH, this.HEIGTH);
    this.renderer.setClearColor('#9ca3af');
  }

  user1_keyDownHandler(e, user1) {
    if (e.keyCode == 83) {
      this.user1.downPressed = true;
    } else if (e.keyCode == 87) {
      this.user1.upPressed = true;
    } else if (e.keyCode == 32) {
      this.user1.skill = true;
    }
  }

  user1_keyUpHandler(e) {
    if (e.keyCode == 83) {
      this.user1.downPressed = false;
    } else if (e.keyCode == 87) {
      this.user1.upPressed = false;
    } else if (e.keyCode == 32) {
      this.user1.skill = false;
      this.user1.skillpower = 0;
    }
  }

  user2_keyDownHandler(e) {
    if (e.keyCode == 40) {
      this.user2.downPressed = true;
    } else if (e.keyCode == 38) {
      this.user2.upPressed = true;
    } else if (e.keyCode == 13) {
      this.user2.skill = true;
    }
  }

  user2_keyUpHandler(e) {
    if (e.keyCode == 40) {
      this.user2.downPressed = false;
    } else if (e.keyCode == 38) {
      this.user2.upPressed = false;
    } else if (e.keyCode == 13) {
      this.user2.skill = false;
      this.user2.skillpower = 0;
    }
  }

  setEventHandler() {
    document.addEventListener('keydown', this.user1_keyDownHandler, false);
    document.addEventListener('keyup', this.user1_keyUpHandler, false);
    document.addEventListener('keydown', this.user2_keyDownHandler, false);
    document.addEventListener('keyup', this.user2_keyUpHandler, false);
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      this.VIEW_ANGLE,
      this.ASPECT,
      this.NEAR,
      this.FAR,
    );
    this.camera.position.set(0, 0, 300);
  }

  setScene() {
    this.scene = new THREE.Scene();
  }

  setLights() {
    let light = new THREE.AmbientLight(0xffffff);
    this.scene.add(light);
  }

  setWorld() {
    // 필드
    var geometry = new THREE.BoxGeometry(this.x_plane, this.y_plane, 0.01);
    var material = new THREE.MeshPhongMaterial({ color: 0x2222ff });
    this.plane = new THREE.Mesh(geometry, material);
    this.scene.add(this.plane);

    // 중앙분리
    var geometry = new THREE.BoxGeometry(5, this.y_plane, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x888888 });
    var centerbar = new THREE.Mesh(geometry, material);
    this.scene.add(centerbar);

    // 데코 1
    var geometry = new THREE.BoxGeometry(this.x_plane + 10, 5, 5);
    var material = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      side: THREE.DoubleSide,
    });
    var dec2 = new THREE.Mesh(geometry, material);
    dec2.position.y = this.y_plane / 2 + 0.025;
    this.scene.add(dec2);

    // 데코 2
    var geometry = new THREE.BoxGeometry(this.x_plane + 10, 5, 5);
    var material = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      side: THREE.DoubleSide,
    });
    var dec3 = new THREE.Mesh(geometry, material);
    dec3.position.y = -this.y_plane / 2 - 0.025;
    this.scene.add(dec3);

    // player_1
    var geometry = new THREE.BoxGeometry(this.x_cube, this.y_cube, 10);
    var material = new THREE.MeshPhongMaterial({ color: 0x005000 });
    this.player_1 = new THREE.Mesh(geometry, material);
    this.player_1.position.x = -this.x_plane / 2;
    this.player_1.position.y = this.user1.posY;
    this.scene.add(this.player_1);

    // player_2
    var geometry = new THREE.BoxGeometry(this.x_cube, this.y_cube, 10);
    var material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    this.player_2 = new THREE.Mesh(geometry, material);
    this.player_2.position.y = this.user1.posY;
    this.player_2.position.x = this.x_plane / 2;
    this.scene.add(this.player_2);

    // 공
    var geometry = new THREE.SphereGeometry(this.ball_info.radius, 32, 32);
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    this.ball = new THREE.Mesh(geometry, material);
    this.ball.position.z = 0.05;
    this.scene.add(this.ball);
  }

  player1Move() {
    if (
      this.user1.upPressed &&
      this.player_1.position.y + this.y_cube / 2 + 5 < this.y_plane / 2
    ) {
      this.player_1.position.y += 3;
    } else if (
      this.user1.downPressed &&
      this.player_1.position.y - this.y_cube / 2 - 5 > -this.y_plane / 2
    ) {
      this.player_1.position.y -= 3;
    }
    if (this.user1.skill == true) this.user1.skillpower++;
  }

  player2Move() {
    if (
      this.user2.upPressed &&
      this.player_2.position.y + this.y_cube / 2 + 5 < this.y_plane / 2
    ) {
      this.player_2.position.y += 3;
    } else if (
      this.user2.downPressed &&
      this.player_2.position.y - this.y_cube / 2 - 5 > -this.y_plane / 2
    ) {
      this.player_2.position.y -= 3;
    }
    if (this.user2.skill == true) this.user2.skillpower++;
  }
  ballMove() {
    this.ball.position.x += this.ball_info.dx;
    this.ball.position.y += this.ball_info.dy;
    if (this.ball.position.y <= -this.y_plane / 2 + this.ball_info.radius) {
      this.ball_info.dy = -this.ball_info.dy;
    } else if (
      this.ball.position.y >=
      this.y_plane / 2 - this.ball_info.radius
    ) {
      this.ball_info.dy = -this.ball_info.dy;
    }
    if (
      this.ball_info.dx >= 0 &&
      this.ball.position.x + this.x_cube / 2 + this.ball_info.radius >=
        this.player_2.position.x &&
      this.ball.position.y >= this.player_2.position.y - this.y_cube / 2 &&
      this.ball.position.y <= this.player_2.position.y + this.y_cube / 2 &&
      this.user2.skillpower >= 100
    ) {
      this.ball_info.dx = -2;
    } else if (
      this.ball_info.dx >= 0 &&
      this.ball.position.x + this.x_cube / 2 + this.ball_info.radius >=
        this.player_2.position.x &&
      this.ball.position.y >= this.player_2.position.y - this.y_cube / 2 &&
      this.ball.position.y <= this.player_2.position.y + this.y_cube / 2
    ) {
      this.ball_info.dx = -1;
    }
    if (
      this.ball_info.dx <= 0 &&
      this.ball.position.x - this.x_cube / 2 - this.ball_info.radius <=
        this.player_1.position.x &&
      this.ball.position.y >= this.player_1.position.y - this.y_cube / 2 &&
      this.ball.position.y <= this.player_1.position.y + this.y_cube / 2 &&
      this.user1.skillpower >= 100
    ) {
      this.ball_info.dx = 2;
    } else if (
      this.ball_info.dx <= 0 &&
      this.ball.position.x - this.x_cube / 2 - this.ball_info.radius <=
        this.player_1.position.x &&
      this.ball.position.y >= this.player_1.position.y - this.y_cube / 2 &&
      this.ball.position.y <= this.player_1.position.y + this.y_cube / 2
    ) {
      this.ball_info.dx = 1;
    }
  }

  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  resetWorld() {
    this.ball.position.x = 0;
    if (Math.abs(this.ball_info.dx) > 1) {
      this.ball_info.dx = this.ball_info.dx / 2;
    }
    this.ball.position.y = this.rand(-140, 140);
  }

  winOrLose() {
    if (this.ball.position.x + this.ball_info.radius >= this.x_plane / 2) {
      this.resetWorld();
    }
    if (this.ball.position.x - this.ball_info.radius <= -this.x_plane / 2) {
      this.resetWorld();
    }
  }

  start() {
    this.setRenderer();
    this.setCamera();
    this.setEventHandler();
    this.setScene();
    this.setLights();
    this.setWorld();
  }

  skill() {
    if (this.user1.skillpower >= 100) {
      this.player_1.material.color.setHex(0x000000);
    } else {
      this.player_1.material.color.setHex(0x005000);
    }
    if (this.user2.skillpower >= 100) {
      this.player_2.material.color.setHex(0x000000);
    } else {
      this.player_2.material.color.setHex(0xff0000);
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.player1Move();
    this.player2Move();
    this.ballMove();
    this.winOrLose();
    //console.log(this.player_1.position);
    this.skill();
    //console.log(this.ball_info.dx);
    this.renderer.render(this.scene, this.camera);
  }

  init() {
    this.container = document.getElementById('myCanvas');

    this.renderer = new THREE.WebGLRenderer({ canvas: this.container });
    this.renderer.setSize(this.WIDTH, this.HEIGTH);
    this.renderer.setClearColor(0x808080);
    this.setScene();
    this.setCamera();
    this.setLights();
    this.renderer.render(this.scene, this.camera);
  }

  pong() {
    this.init();
    this.start();
    this.animate();
  }
}
