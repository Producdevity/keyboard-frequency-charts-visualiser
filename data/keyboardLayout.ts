export interface KeyPosition {
  row: number
  col: number
  width?: number
}

export interface KeyData {
  key: string
  position: KeyPosition
  isModifier?: boolean
}

export const keyboardLayout: KeyData[][] = [
  // First row
  [
    { key: '`', position: { row: 0, col: 0 } },
    { key: '1', position: { row: 0, col: 1 } },
    { key: '2', position: { row: 0, col: 2 } },
    { key: '3', position: { row: 0, col: 3 } },
    { key: '4', position: { row: 0, col: 4 } },
    { key: '5', position: { row: 0, col: 5 } },
    { key: '6', position: { row: 0, col: 6 } },
    { key: '7', position: { row: 0, col: 7 } },
    { key: '8', position: { row: 0, col: 8 } },
    { key: '9', position: { row: 0, col: 9 } },
    { key: '0', position: { row: 0, col: 10 } },
    { key: '-', position: { row: 0, col: 11 } },
    { key: '=', position: { row: 0, col: 12 } },
  ],
  // Second row
  [
    { key: 'Tab', position: { row: 1, col: 0 }, isModifier: true },
    { key: 'Q', position: { row: 1, col: 1 } },
    { key: 'W', position: { row: 1, col: 2 } },
    { key: 'E', position: { row: 1, col: 3 } },
    { key: 'R', position: { row: 1, col: 4 } },
    { key: 'T', position: { row: 1, col: 5 } },
    { key: 'Y', position: { row: 1, col: 6 } },
    { key: 'U', position: { row: 1, col: 7 } },
    { key: 'I', position: { row: 1, col: 8 } },
    { key: 'O', position: { row: 1, col: 9 } },
    { key: 'P', position: { row: 1, col: 10 } },
    { key: '[', position: { row: 1, col: 11 } },
    { key: ']', position: { row: 1, col: 12 } },
    { key: '\\', position: { row: 1, col: 13 } },
  ],
  // Third row
  [
    { key: 'Caps', position: { row: 2, col: 0 }, isModifier: true },
    { key: 'A', position: { row: 2, col: 1 } },
    { key: 'S', position: { row: 2, col: 2 } },
    { key: 'D', position: { row: 2, col: 3 } },
    { key: 'F', position: { row: 2, col: 4 } },
    { key: 'G', position: { row: 2, col: 5 } },
    { key: 'H', position: { row: 2, col: 6 } },
    { key: 'J', position: { row: 2, col: 7 } },
    { key: 'K', position: { row: 2, col: 8 } },
    { key: 'L', position: { row: 2, col: 9 } },
    { key: ';', position: { row: 2, col: 10 } },
    { key: "'", position: { row: 2, col: 11 } },
    { key: 'Enter', position: { row: 2, col: 12, width: 2 }, isModifier: true },
  ],
  // Fourth row
  [
    { key: 'Shift', position: { row: 3, col: 0 }, isModifier: true },
    { key: 'Z', position: { row: 3, col: 1 } },
    { key: 'X', position: { row: 3, col: 2 } },
    { key: 'C', position: { row: 3, col: 3 } },
    { key: 'V', position: { row: 3, col: 4 } },
    { key: 'B', position: { row: 3, col: 5 } },
    { key: 'N', position: { row: 3, col: 6 } },
    { key: 'M', position: { row: 3, col: 7 } },
    { key: ',', position: { row: 3, col: 8 } },
    { key: '.', position: { row: 3, col: 9 } },
    { key: '/', position: { row: 3, col: 10 } },
    { key: 'Shift', position: { row: 3, col: 11 }, isModifier: true },
  ],
  // Fifth row
  [
    { key: 'Ctrl', position: { row: 4, col: 0 }, isModifier: true },
    { key: 'Win', position: { row: 4, col: 1 }, isModifier: true },
    { key: 'Alt', position: { row: 4, col: 2 }, isModifier: true },
    { key: 'Space', position: { row: 4, col: 3, width: 6 } },
    { key: 'Alt', position: { row: 4, col: 9 }, isModifier: true },
    { key: 'Win', position: { row: 4, col: 10 }, isModifier: true },
    { key: 'Ctrl', position: { row: 4, col: 11 }, isModifier: true },
  ],
] 