import { KeyData } from './keyboardLayout'

export const planckLayout: KeyData[][] = [
  // First row
  [
    { key: 'Esc', label: 'Esc', position: { row: 0, col: 0 } },
    { key: 'Q', label: 'Q', position: { row: 0, col: 1 } },
    { key: 'W', label: 'W', position: { row: 0, col: 2 } },
    { key: 'E', label: 'E', position: { row: 0, col: 3 } },
    { key: 'R', label: 'R', position: { row: 0, col: 4 } },
    { key: 'T', label: 'T', position: { row: 0, col: 5 } },
    { key: 'Y', label: 'Y', position: { row: 0, col: 6 } },
    { key: 'U', label: 'U', position: { row: 0, col: 7 } },
    { key: 'I', label: 'I', position: { row: 0, col: 8 } },
    { key: 'O', label: 'O', position: { row: 0, col: 9 } },
    { key: 'P', label: 'P', position: { row: 0, col: 10 } },
    { key: 'delete', label: 'Del', position: { row: 0, col: 11 } },
  ],
  // Second row
  [
    { key: 'Tab', label: 'Tab', position: { row: 1, col: 0 } },
    { key: 'A', label: 'A', position: { row: 1, col: 1 } },
    { key: 'S', label: 'S', position: { row: 1, col: 2 } },
    { key: 'D', label: 'D', position: { row: 1, col: 3 } },
    { key: 'F', label: 'F', position: { row: 1, col: 4 } },
    { key: 'G', label: 'G', position: { row: 1, col: 5 } },
    { key: 'H', label: 'H', position: { row: 1, col: 6 } },
    { key: 'J', label: 'J', position: { row: 1, col: 7 } },
    { key: 'K', label: 'K', position: { row: 1, col: 8 } },
    { key: 'L', label: 'L', position: { row: 1, col: 9 } },
    { key: ';', label: ';', position: { row: 1, col: 10 } },
    { key: "'", label: "'", position: { row: 1, col: 11 } },
  ],
  // Third row
  [
    { key: 'shift', label: 'Shift', position: { row: 2, col: 0 } },
    { key: 'Z', label: 'Z', position: { row: 2, col: 1 } },
    { key: 'X', label: 'X', position: { row: 2, col: 2 } },
    { key: 'C', label: 'C', position: { row: 2, col: 3 } },
    { key: 'V', label: 'V', position: { row: 2, col: 4 } },
    { key: 'B', label: 'B', position: { row: 2, col: 5 } },
    { key: 'N', label: 'N', position: { row: 2, col: 6 } },
    { key: 'M', label: 'M', position: { row: 2, col: 7 } },
    { key: ',', label: ',', position: { row: 2, col: 8 } },
    { key: '.', label: '.', position: { row: 2, col: 9 } },
    { key: '/', label: '/', position: { row: 2, col: 10 } },
    { key: 'Return', label: 'Enter', position: { row: 2, col: 11 } },
  ],
  // Fourth row
  [
    { key: 'Fn', label: 'Fn', position: { row: 3, col: 0 }, isModifier: true },
    { key: 'ctrl', label: 'Ctrl', position: { row: 3, col: 1 }, isModifier: true },
    { key: 'alt', label: 'Alt', position: { row: 3, col: 2 }, isModifier: true },
    { key: 'cmd', label: 'Cmd', position: { row: 3, col: 3 }, isModifier: true },
    { key: 'L1', label: 'L1', position: { row: 3, col: 4 }, isModifier: true },
    { key: 'space', label: 'Space', position: { row: 3, col: 5, width: 2 } },
    { key: 'L2', label: 'L2', position: { row: 3, col: 7 }, isModifier: true },
    { key: 'left', label: '🠈', position: { row: 3, col: 8 }, isModifier: true },
    { key: 'down', label: '🠋', position: { row: 3, col: 9 }, isModifier: true },
    { key: 'up', label: '🠉', position: { row: 3, col: 10 }, isModifier: true },
    { key: 'right', label: '🠊', position: { row: 3, col: 11 }, isModifier: true },
  ],
]
