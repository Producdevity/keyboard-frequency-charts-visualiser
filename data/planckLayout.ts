import { KeyData } from './keyboardLayout'

export const planckLayout: KeyData[][] = [
  // First row
  [
    { key: 'Esc', position: { row: 0, col: 0 } },
    { key: 'Q', position: { row: 0, col: 1 } },
    { key: 'W', position: { row: 0, col: 2 } },
    { key: 'E', position: { row: 0, col: 3 } },
    { key: 'R', position: { row: 0, col: 4 } },
    { key: 'T', position: { row: 0, col: 5 } },
    { key: 'Y', position: { row: 0, col: 6 } },
    { key: 'U', position: { row: 0, col: 7 } },
    { key: 'I', position: { row: 0, col: 8 } },
    { key: 'O', position: { row: 0, col: 9 } },
    { key: 'P', position: { row: 0, col: 10 } },
    { key: '<-', position: { row: 0, col: 11 } },
  ],
  // Second row
  [
    { key: 'Tab', position: { row: 1, col: 0 } },
    { key: 'A', position: { row: 1, col: 1 } },
    { key: 'S', position: { row: 1, col: 2 } },
    { key: 'D', position: { row: 1, col: 3 } },
    { key: 'F', position: { row: 1, col: 4 } },
    { key: 'G', position: { row: 1, col: 5 } },
    { key: 'H', position: { row: 1, col: 6 } },
    { key: 'J', position: { row: 1, col: 7 } },
    { key: 'K', position: { row: 1, col: 8 } },
    { key: 'L', position: { row: 1, col: 9 } },
    { key: ';', position: { row: 1, col: 10 } },
    { key: "'", position: { row: 1, col: 11 } },
  ],
  // Third row
  [
    { key: 'Shift', position: { row: 2, col: 0 } },
    { key: 'Z', position: { row: 2, col: 1 } },
    { key: 'X', position: { row: 2, col: 2 } },
    { key: 'C', position: { row: 2, col: 3 } },
    { key: 'V', position: { row: 2, col: 4 } },
    { key: 'B', position: { row: 2, col: 5 } },
    { key: 'N', position: { row: 2, col: 6 } },
    { key: 'M', position: { row: 2, col: 7 } },
    { key: ',', position: { row: 2, col: 8 } },
    { key: '.', position: { row: 2, col: 9 } },
    { key: '/', position: { row: 2, col: 10 } },
    { key: 'Enter', position: { row: 2, col: 11 } },
  ],
  // Fourth row
  [
    { key: 'Fn', position: { row: 3, col: 0 }, isModifier: true },
    { key: 'Win', position: { row: 3, col: 1 }, isModifier: true },
    { key: 'Alt', position: { row: 3, col: 2 }, isModifier: true },
    { key: 'Super', position: { row: 3, col: 3 }, isModifier: true },
    { key: 'L1', position: { row: 3, col: 4 }, isModifier: true },
    { key: 'Space', position: { row: 3, col: 5, width: 2 } },
    { key: 'L2', position: { row: 3, col: 7 }, isModifier: true },
    { key: '🠈', position: { row: 3, col: 8 }, isModifier: true },
    { key: '🠋', position: { row: 3, col: 9 }, isModifier: true },
    { key: '🠉', position: { row: 3, col: 10 }, isModifier: true },
    { key: '🠊', position: { row: 3, col: 11 }, isModifier: true },
  ],
]
