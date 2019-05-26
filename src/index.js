import Phaser from "phaser";
import Moet from "./assets/moet.png";
import WheelBarrow from "./assets/wheelbarrow.png"
import Background from "./assets/background.jpg"
import invisibleObj from "./assets/floor.png"
import * as randomFunc from "./randomFunctions.js";

// vars
const gameState = {};

var movementSpeed = 150;
const maxBottles = 10;
var numberOfBottles = 5;

var loopDelay = 100;
var currentTime = 0;

var called = false;

var mouseX;

var gameRunning = true;
var gameEnds = false;

const wheelBarrowWidth = 200;
const wheelBarrowHeight = 118;
const bottleWidth = 50;
const bottleHeight = 90;

var score = 0;
var lives = 3;

const scoreString = 'Score: ';
const livesString = 'Lives: ';


const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image('invisibleObj', invisibleObj);
  this.load.image('wheelBarrow', WheelBarrow);
  this.load.image('moet', Moet);
  this.load.image('background', Background);
}

function create() {
  
  this.backgroundSprite = this.add.tileSprite(config.width / 2, config.height / 2, 0, 0, 'background');

  gameState.bottles = this.add.group();

  gameState.wheelBarrow = this.physics.add.sprite(wheelBarrowWidth / 2, config.height - wheelBarrowHeight / 2, 'wheelBarrow');

  gameState.scoreText = this.add.text(32, 24, scoreString + score, {color: '#000000'});
  gameState.livesText = this.add.text(32, 44, livesString + lives, {color: '#000000'});

  gameState.floor = this.physics.add.sprite(400, config.height + 30, 'invisibleObj');
}

function update() {
  // get mouse coords
  if (lives == 0) {
    gameRunning = false;
    stopBottles();
    gameEnds = true;
  } 
  if (gameRunning ==  true) {
    mouseX = this.input.mousePointer.x;
  
    if (currentTime == loopDelay) {
      generateBottles(this);
      currentTime = 0;
    }
    currentTime ++;

    moveBottles();
    movewheelBarrow();

    if (score % 1000 == 0 && score > 0  && called == false) {
      makeItHarder();
      called = true;
    }
    else if (score % 1000 != 0 && called == true) {
      called = false;
    }
  }

  gameState.scoreText.setText(scoreString + score);
  gameState.livesText.setText(livesString + lives);
}

function generateBottles (obj) {

  for (let index = 0; index < numberOfBottles; index++) {
    let bottle = obj.physics.add.sprite(randomFunc.generateXCoord(config.width, bottleWidth), randomFunc.generateYCoord(bottleHeight), 'moet');
    gameState.bottles.add(bottle);
  }

  gameState.bottles.children.iterate(function (bottle) {
    obj.physics.add.overlap(gameState.wheelBarrow, bottle, collideWithWB, null, obj);
    obj.physics.add.overlap(gameState.floor, bottle, collideWithFloor, null, obj);
  });
}

function moveBottles () {

  gameState.bottles.children.iterate(function (bottle) {
    bottle.setVelocityY(movementSpeed);
  });
}

function stopBottles () {
  gameState.bottles.children.iterate(function (bottle) {
    bottle.setVelocityY(0);
  });
}

function movewheelBarrow () {
  if (mouseX < config.width - wheelBarrowWidth / 3 && mouseX > 0 + wheelBarrowWidth / 3 ) {
    gameState.wheelBarrow.x = mouseX;
  }
}

function collideWithWB (wheelBarrow, bottle) {
  score += 100;
  bottle.destroy();
  
}

function collideWithFloor (floor, bottle) {
  lives--;
  bottle.destroy();
}

function makeItHarder () {
  movementSpeed += 30;
  if (numberOfBottles < maxBottles) numberOfBottles += 1;
}

