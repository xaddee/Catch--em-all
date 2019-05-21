import Phaser from "phaser";
import Moet from "./assets/moet.png";
import {generateXCoord, generateYCoord} from "./randomFunctions.js";
// vars
const gameState = {};

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1000,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image('moet', Moet);
}

function create() {
  gameState.moet = this.add.sprite(generateXCoord(), generateYCoord(), 'moet')
}

function update() {
  gameState.moet.y += 1;
}


