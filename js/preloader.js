
BasicGame.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;

  this.ready = false;

};

BasicGame.Preloader.prototype = {

  preload: function () {

    this.background = this.add.sprite(0, 0, 'preloaderbackground');
    this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('court', 'assets/tennis.jpg');
    this.load.image('car', 'assets/car.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.audio('hit', ['assets/hit.ogg', 'assets/hit.mp3']);
  },

  create: function () {

    //  Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
    this.preloadBar.cropEnabled = false;

  },

  update: function () {

    //  You don't actually need to do this, but I find it gives a much smoother game experience.
    //  Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
    //  You can jump right into the menu if you want and still play the music, but you'll have a few
    //  seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
    //  it's best to wait for it to decode here first, then carry on.

    //  If you don't have any music in your game then put the game.state.start line into the create function and delete
    //  the update function completely.

    this.state.start('Game');
    if (this.cache.isSoundDecoded('titleMusic') && this.ready == false) {
      this.ready = true;
    }

  }

};
