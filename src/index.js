import Phaser from "phaser";
import Moet from "./assets/moet.png";
import WheelBarrow from "./assets/1.png"
import * as randomFunc from "./randomFunctions.js";
// vars
const gameState = {};

const movementSpeed = 3;

const numberOfBottles = 5;

const loopDelay = 150;
var currentTime = 0;

var mouseX;

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
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
  gameState.moet = new Array();
  this.load.image('wheelBarrow', WheelBarrow);
  this.load.image('moet', Moet);
}

function create() {
  gameState.wheelBarrow = this.physics.add.sprite(wheelBarrowWidth / 2, config.height - wheelBarrowHeight / 2, 'wheelBarrow');
  gameState.scoreText = this.add.text(32, 24, scoreString + score);
  gameState.livesText = this.add.text(32, 64, livesString + lives);
}

function update() {
  // get mouse coords
  if (lives > 0) {
    mouseX = this.input.mousePointer.x;
    

    if (currentTime == loopDelay) {
      generateBottles(this);
      currentTime = 0;
    }
    currentTime ++;

    moveBottles();
    movewheelBarrow();
    destroyBottles();

    gameState.scoreText.setText(scoreString + score);
    gameState.livesText.setText(livesString + lives);
  }
}

function generateBottles (obj) {
  for (let index = 0; index < numberOfBottles; index++) {

    gameState.moet.push(obj.physics.add.sprite(randomFunc.generateXCoord(config.width, bottleWidth), randomFunc.generateYCoord(bottleHeight), 'moet'));
    obj.physics.add.overlap(gameState.wheelBarrow, gameState.moet[index], collideWithWB, null, this);
  }
}

function moveBottles () {
  for (let index = 0; index < gameState.moet.length; index++) {

    gameState.moet[index].y += movementSpeed;
  }
}

function movewheelBarrow () {
  gameState.wheelBarrow.x = mouseX;
}

function destroyBottles () {
  for (let index = 0; index < gameState.moet.length; index++) {

    if (gameState.moet[index].y >= config.height) {

      let tmpContainer = gameState.moet[index];
      gameState.moet.splice(index, 1);
      tmpContainer.destroy();
      lives--;
    }
  }
}

function collideWithWB (wheelBarrow, bottle) {
  score += 100;
  bottle.destroy();
  
}

