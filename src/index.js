import Phaser from "phaser";
import Moet from "./assets/moet.png";
import WheelBarrow from "./assets/wheelbarrow.png"
import * as randomFunc from "./randomFunctions.js";
// vars
const gameState = {};

const movementSpeed = 3;

const numberOfBottles = 5;

const loopDelay = 150;
var currentTime = 0;


const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1000,
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
  }
};

var game = new Phaser.Game(config);

function preload() {
  gameState.moet = new Array();
  this.load.image('wheelBarrow', WheelBarrow);
  this.load.image('moet', Moet);
}

function create() {
  gameState.wheelBarrow = this.physics.add.sprite(300, 300, 'wheelBarrow');
}

function update() {
  if (currentTime == loopDelay) {
    generateBottles(this);
    currentTime = 0;
  }
  currentTime ++;

  moveBottles();
  
  
}

function generateBottles(obj) {
  for (let index = 0; index < numberOfBottles; index++) {
    gameState.moet.push(obj.physics.add.sprite(randomFunc.generateXCoord(config.width, 50), randomFunc.generateYCoord(150), 'moet'));
  }
}

function moveBottles() {
  for (let index = 0; index < gameState.moet.length; index++) {
    gameState.moet[index].y += movementSpeed;
  }
}


