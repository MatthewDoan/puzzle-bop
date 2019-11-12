import { Tetromino } from "./tetromino"
import { TetrominoShape, createTetrisBoard } from "./tetrisUtils"
 
export class Tetris {
  public tetromino: Tetromino

  public board: number[][]

  public tetrominoFallDistance: number  = 0.1

  public heldTetrominoShape: TetrominoShape

  public canHold: boolean

  public constructor() {
    this.tetromino = new Tetromino(TetrominoShape.I)
    this.board = createTetrisBoard()
    this.heldTetrominoShape = TetrominoShape.EMPTY
    this.canHold = true
  }

  public moveLeft() {
    this.tetromino.moveLeft(this.board)
  }

  public moveRight() {
    this.tetromino.moveRight(this.board)
  }

  public rotateLeft() {
    this.tetromino.rotateLeft(this.board)
  }

  public rotateRight() {
    this.tetromino.rotateRight(this.board)
  }

  public hardDrop() {
    // Update board

    this.tetromino = new Tetromino(TetrominoShape.J)
  }

  public hold() {
    this.heldTetrominoShape = this.tetromino.shape
    this.canHold = false
    this.tetromino = new Tetromino(TetrominoShape.J)
  }

  public fastFall(isFastFalling: boolean) {
    this.tetromino.fastFalling = isFastFalling
  }

  public update() {
    this.tetrominoFall()
  }

  private tetrominoFall() {
    if (this.tetromino.fastFalling) {
      this.tetromino.boardLocation.y -= this.tetrominoFallDistance * 2
    } else {
      this.tetromino.boardLocation.y -= this.tetrominoFallDistance
    }
  }

  private dropTetromino() {
    this.canHold = true
    this.tetromino = new Tetromino(TetrominoShape.J)
  }
}
