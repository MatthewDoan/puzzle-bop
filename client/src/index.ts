import "./styles/index.scss"
import Phaser from "phaser"
import { TetrisScene } from "./tetris/tetrisScene"

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: TetrisScene
})
