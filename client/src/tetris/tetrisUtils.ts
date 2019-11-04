export enum TetrominoShape {
  I = 1,
  J,
  L,
  O,
  S,
  T,
  Z
}

export const createTetrominoMatrix = (shape: TetrominoShape) => {
  const s = shape
  switch (s) {
    case TetrominoShape.I:
      return [[0, 0, 0, 0], [s, s, s, s], [0, 0, 0, 0], [0, 0, 0, 0]]
    case TetrominoShape.J:
      return [[s, 0, 0], [s, s, s], [0, 0, 0]]
    case TetrominoShape.L:
      return [[0, 0, s], [s, s, s], [0, 0, 0]]
    case TetrominoShape.O:
      return [[0, s, s, 0], [0, s, s, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    case TetrominoShape.S:
      return [[0, s, s], [s, s, 0], [0, 0, 0]]
    case TetrominoShape.Z:
      return [[s, s, 0], [0, s, s], [0, 0, 0]]
    case TetrominoShape.T:
      return [[0, s, 0], [s, s, s], [0, 0, 0]]
    default:
      return []
  }
}

export const createTetrisBoard = () => {
  const rows = 22
  const cols = 10
  const matrix: number[][] = new Array(rows).fill(0).map(() => new Array(cols).fill(0))
  return matrix
}
