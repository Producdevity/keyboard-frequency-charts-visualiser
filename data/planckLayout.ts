import { KeyData } from './keyboardLayout'

export const planckLayout: KeyData[][] = [
  // First row
  [
    { key: 'Q', position: { row: 0, col: 0 } },
    { key: 'W', position: { row: 0, col: 1 } },
    { key: 'E', position: { row: 0, col: 2 } },
    { key: 'R', position: { row: 0, col: 3 } },
    { key: 'T', position: { row: 0, col: 4 } },
    { key: 'Y', position: { row: 0, col: 5 } },
    { key: 'U', position: { row: 0, col: 6 } },
    { key: 'I', position: { row: 0, col: 7 } },
    { key: 'O', position: { row: 0, col: 8 } },
    { key: 'P', position: { row: 0, col: 9 } },
  ],
  // Second row
  [
    { key: 'A', position: { row: 1, col: 0 } },
    { key: 'S', position: { row: 1, col: 1 } },
    { key: 'D', position: { row: 1, col: 2 } },
    { key: 'F', position: { row: 1, col: 3 } },
    { key: 'G', position: { row: 1, col: 4 } },
    { key: 'H', position: { row: 1, col: 5 } },
    { key: 'J', position: { row: 1, col: 6 } },
    { key: 'K', position: { row: 1, col: 7 } },
    { key: 'L', position: { row: 1, col: 8 } },
    { key: ';', position: { row: 1, col: 9 } },
  ],
  // Third row
  [
    { key: 'Z', position: { row: 2, col: 0 } },
    { key: 'X', position: { row: 2, col: 1 } },
    { key: 'C', position: { row: 2, col: 2 } },
    { key: 'V', position: { row: 2, col: 3 } },
    { key: 'B', position: { row: 2, col: 4 } },
    { key: 'N', position: { row: 2, col: 5 } },
    { key: 'M', position: { row: 2, col: 6 } },
    { key: ',', position: { row: 2, col: 7 } },
    { key: '.', position: { row: 2, col: 8 } },
    { key: '/', position: { row: 2, col: 9 } },
  ],
  // Fourth row
  [
    { key: 'Ctrl', position: { row: 3, col: 0 }, isModifier: true },
    { key: 'Win', position: { row: 3, col: 1 }, isModifier: true },
    { key: 'Alt', position: { row: 3, col: 2 }, isModifier: true },
    { key: 'Space', position: { row: 3, col: 3, width: 4 } },
    { key: 'Alt', position: { row: 3, col: 7 }, isModifier: true },
    { key: 'Win', position: { row: 3, col: 8 }, isModifier: true },
    { key: 'Ctrl', position: { row: 3, col: 9 }, isModifier: true },
  ],
] 