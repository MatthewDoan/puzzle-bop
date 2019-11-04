import Phaser from "phaser"
import { TetrominoShape, createTetrominoMatrix } from "./tetrisUtils"

export class Tetromino {
  shape: TetrominoShape

  matrix: number[][]

  boardLocation: {
    x: number
    y: number
  }

  constructor(shape: TetrominoShape) {
    this.shape = shape
    this.matrix = createTetrominoMatrix(shape)

    const matrixLength = this.matrix.length

    if (matrixLength === 4) {
      this.boardLocation = { x: 3, y: 18.0 }
    } else {
      this.boardLocation = { x: 2, y: 19.0 }
    }
  }

  rotateLeft(board: number[][]) {
    if (this.shape === TetrominoShape.O) return
    this.matrix = Phaser.Utils.Array.Matrix.RotateLeft(this.matrix)
    // TODO: SRS Kick
  }

  rotateRight(board: number[][]) {
    if (this.shape === TetrominoShape.O) return
    this.matrix = Phaser.Utils.Array.Matrix.RotateRight(this.matrix)
    // TODO: SRS Kick
  }

  moveLeft(board: number[][]) {
    if (this.boardLocation.x > 0) {
      // TODO: Check position against stack

      this.boardLocation.x -= 1
    }
  }

  moveRight(board: number[][]) {
    if (this.boardLocation.x < 9) {
      // TODO: Check position against stack
      this.boardLocation.x += 1
    }
  }
}
