import Phaser from "phaser"
import { Tetromino } from "./tetromino"
import { TetrominoShape, createTetrisBoard } from "./tetrisUtils"

export class TetrisScene extends Phaser.Scene {
  tetromino?: Tetromino

  tetrominoContainer?: Phaser.GameObjects.Container

  board = createTetrisBoard()

  rotateLeftKey?: Phaser.Input.Keyboard.Key
  

  constructor() {
    super({})
    this.tetromino = new Tetromino(TetrominoShape.O)
  }

  preload() {}

  create() {
    this.rotateLeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
    

    const gridX = 500
    const gridY = 500
    const cellSize = 20

    const createTetrisGrid = (gridX: number, gridY: number, cellSize: number) =>
      this.add.grid(
        gridX,
        gridY,
        cellSize * 10,
        cellSize * 20,
        cellSize,
        cellSize,
        0xbdab7b,
        1,
        0x5e4e22,
        1
      )

    createTetrisGrid(gridX, gridY, cellSize)

    

    this.tetrominoContainer = this.drawTetromino()
  }

  drawCell (
    x: number,
    y: number,
    cellSize: number,
    gridX: number,
    gridY: number,
    color: number
  ) {
    const rect = this.add.rectangle(
      gridX - cellSize * 5 + cellSize / 2 + (x * cellSize),
      gridY - cellSize * 10 + cellSize / 2 + (y * cellSize),
      cellSize,
      cellSize,
      color
    )
    rect.setStrokeStyle(0.5, 0x000000, 1)
    return rect
  }

  drawTetromino() {
    let tetrominoCells: Phaser.GameObjects.GameObject[] = []
    if (this.tetromino) {
      this.tetromino.matrix.forEach((row, rowIndex) => {
        row.forEach((num, colIndex) => {
          if (num !== 0) {
            tetrominoCells.push(this.drawCell(colIndex, rowIndex, 20, 0, 0, 0xff0000))
          }
        })
      })
    }
    return this.add.container(500, 500, tetrominoCells)
  }

  update() {
    if (this.tetrominoContainer) {
      if (this.tetrominoContainer.y < 500 + 20 * 20)
        this.tetrominoContainer.y += 1
    }

    if (this.rotateLeftKey && this.tetromino && this.tetrominoContainer) {
      if (this.rotateLeftKey.isDown) {
        this.tetromino.rotateLeft([])
        this.tetrominoContainer.destroy()
        this.tetrominoContainer = this.drawTetromino()
      }
    }
  }
}
