
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    this.car;
    this.cursors;
    this.ballSpeed;
    this.MAX_SPEED = 800;
    this.DRAG = 800;
    this.ACCELERATION = 1900;
};

BasicGame.Game.prototype = {

  create: function () {

    this.background = this.add.sprite(0, 0, 'court');
    this.car = this.game.add.sprite(this.game.width/2 - 32, this.game.height - 200, 'car');

    this.game.physics.enable(this.car, Phaser.Physics.ARCADE);
    this.car.body.collideWorldBounds = true;
    this.car.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED);
    this.car.body.drag.setTo(this.DRAG, this.DRAG);

    this.ballSpeed = 175;
    this.ball = this.game.add.sprite(this.game.width/2 - 11, 10, 'ball');
    this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);
    this.ball.body.collideWorldBounds = true;
    this.ball.body.bounce.set(1);
    this.ball.body.maxVelocity.setTo(this.ballSpeed, this.ballSpeed);

    this.hitSound = this.add.audio('hit');
    this.cursors = this.input.keyboard.createCursorKeys();
  },

  update: function () {

    this.physics.arcade.collide(this.car, this.ball, this.carHitBall, null, this);

    if (this.cursors.up.isDown) {
      this.car.body.acceleration.y = -this.ACCELERATION;
    } else if (this.cursors.down.isDown) {
      this.car.body.acceleration.y = this.ACCELERATION;
    } else {
      this.car.body.acceleration.y = 0;
    }
    if (this.cursors.left.isDown) {
      this.car.body.acceleration.x = -this.ACCELERATION;
    } else if (this.cursors.right.isDown) {
      this.car.body.acceleration.x = this.ACCELERATION;
    } else {
      this.car.body.acceleration.x = 0;
    }
    if (this.car.body.y < 100) {
      this.car.body.velocity.y = 50;
      this.car.body.y = 105;
    }

    this.updateBall()

  },

  updateBall: function() {
    if (this.ball.body.y > this.game.height - 24) {
      this.resetGame();
    }
    if (this.ball.body.velocity.y === 0) {
      this.ball.body.velocity.y = -this.ballSpeed;
      this.ball.body.velocity.x = this.rnd.pick([-100, -50, 50, 100]);
    }
  },

  carHitBall: function() {
    this.ballSpeed += this.ballSpeed <= 500 ? 10 : 0;
    this.ball.body.maxVelocity.setTo(this.ballSpeed, this.ballSpeed);
    if (this.ball.body.velocity.y >= 0) {
      this.ball.body.velocity.y = -this.ballSpeed;
    } else {
      this.ball.body.velocity.y = this.ballSpeed;
    }
    this.hitSound.play();
  },

  resetGame: function () {
      this.state.restart();
  }

};
