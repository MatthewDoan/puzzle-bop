import Phaser from "phaser"
import { Tetromino } from "./tetromino"
import { TetrominoShape, createTetrisBoard } from "./tetrisUtils"

export class TetrisScene extends Phaser.Scene {
  tetromino?: Tetromino

  tetrominoContainer?: Phaser.GameObjects.Container

  board = createTetrisBoard()

  rotateLeftKey?: Phaser.Input.Keyboard.Key

  rotateRightKey?: Phaser.Input.Keyboard.Key

  moveLeftKey?: Phaser.Input.Keyboard.Key

  moveRightKey?: Phaser.Input.Keyboard.Key
  
  rotateLeftFlipFlop: boolean = false

  rotateRightFlipFlop: boolean = false

  moveLeftFlipFlop = false

  moveRightFlipFlop = false

  constructor() {
    super({})
    this.tetromino = new Tetromino(TetrominoShape.J)
  }

  preload() {}

  create() {
    this.rotateLeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
    this.rotateRightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)
    this.moveLeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    this.moveRightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

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
      (x * cellSize) + (cellSize / 2),
      (y * cellSize) + (cellSize / 2),
      cellSize,
      cellSize,
      color
    )
    rect.setStrokeStyle(0.5, 0x000000, 1)
    return rect
  }

  drawTetromino() {
    let tetrominoCells: Phaser.GameObjects.Rectangle[] = []
    if (this.tetromino) {
      this.tetromino.matrix.forEach((row, rowIndex) => {
        row.forEach((num, colIndex) => {
          if (num !== 0) {
            tetrominoCells.push(this.drawCell(colIndex, rowIndex, 20, 0, 0, 0xff0000))
          }
        })
      })

      tetrominoCells.forEach(cell =>  {
        cell.x -= this.tetromino!.matrix.length * 20 / 2
        cell.y -= this.tetromino!.matrix.length * 20 / 2
      })
    }
    const container = this.add.container(300 + 10, 300 + 10, tetrominoCells)
    // 
    return container
  }

  update() {
    if (this.tetrominoContainer) {
      if (this.tetrominoContainer.y < 700 - 10)
        this.tetrominoContainer.y += 0.5   
        
    }

    this.handleInput()
  }

  handleInput() {
    if (this.rotateLeftKey && this.tetromino && this.tetrominoContainer) {
      if (this.rotateLeftKey.isDown && !this.rotateLeftFlipFlop) {
        this.tetromino.rotateLeft([])
        this.tetrominoContainer.angle += 90
        this.rotateLeftFlipFlop = true
      }

      if(this.rotateLeftKey.isUp) {
        this.rotateLeftFlipFlop = false
      }
    }

    if (this.rotateRightKey && this.tetromino && this.tetrominoContainer) { 
      if (this.rotateRightKey.isDown && !this.rotateRightFlipFlop) {
        this.tetromino.rotateLeft([])
        this.tetrominoContainer.angle += 90
        this.rotateRightFlipFlop = true
      }

      if (this.rotateRightKey.isUp) {
        this.rotateRightFlipFlop = false
      }
    }

    if (this.moveRightKey && this.tetromino && this.tetrominoContainer) {
      if (this.moveRightKey.isDown && !this.moveRightFlipFlop) {
        this.tetrominoContainer.x += 20
        this.moveRightFlipFlop = true
      }

      if(this.moveRightKey.isUp) {
        this.moveRightFlipFlop = false
      }
    }

    if (this.moveLeftKey && this.tetromino && this.tetrominoContainer) {
      if (this.moveLeftKey.isDown && !this.moveLeftFlipFlop) {
        this.tetrominoContainer.x -= 20
        this.moveLeftFlipFlop = true
      }

      if(this.moveLeftKey.isUp) {
        this.moveLeftFlipFlop = false
      }
    }
  }
}
