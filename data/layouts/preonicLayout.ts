import { KeyboardLayout } from './types'

const preonicLayout: KeyboardLayout = [
  // First row
  [
    { key: 'Esc', label: 'Esc', position: { row: 1, col: 0 } },
    { key: '1', label: '1', position: { row: 1, col: 1 } },
    { key: '2', label: '2', position: { row: 1, col: 2 } },
    { key: '3', label: '3', position: { row: 1, col: 3 } },
    { key: '4', label: '4', position: { row: 1, col: 4 } },
    { key: '5', label: '5', position: { row: 1, col: 5 } },
    { key: '6', label: '6', position: { row: 1, col: 6 } },
    { key: '7', label: '7', position: { row: 1, col: 7 } },
    { key: '8', label: '8', position: { row: 1, col: 8 } },
    { key: '9', label: '9', position: { row: 1, col: 9 } },
    { key: '0', label: '0', position: { row: 1, col: 10 } },
    { key: 'delete', label: 'Del', position: { row: 1, col: 11 } },
  ],
  // Second row
  [
    { key: 'Esc', label: 'Esc', position: { row: 1, col: 0 } },
    { key: 'Q', label: 'Q', position: { row: 1, col: 1 } },
    { key: 'W', label: 'W', position: { row: 1, col: 2 } },
    { key: 'E', label: 'E', position: { row: 1, col: 3 } },
    { key: 'R', label: 'R', position: { row: 1, col: 4 } },
    { key: 'T', label: 'T', position: { row: 1, col: 5 } },
    { key: 'Y', label: 'Y', position: { row: 1, col: 6 } },
    { key: 'U', label: 'U', position: { row: 1, col: 7 } },
    { key: 'I', label: 'I', position: { row: 1, col: 8 } },
    { key: 'O', label: 'O', position: { row: 1, col: 9 } },
    { key: 'P', label: 'P', position: { row: 1, col: 10 } },
    { key: 'delete', label: 'Del', position: { row: 1, col: 11 } },
  ],
  // Third row
  [
    { key: 'Tab', label: 'Tab', position: { row: 2, col: 0 } },
    { key: 'A', label: 'A', position: { row: 2, col: 1 } },
    { key: 'S', label: 'S', position: { row: 2, col: 2 } },
    { key: 'D', label: 'D', position: { row: 2, col: 3 } },
    { key: 'F', label: 'F', position: { row: 2, col: 4 } },
    { key: 'G', label: 'G', position: { row: 2, col: 5 } },
    { key: 'H', label: 'H', position: { row: 2, col: 6 } },
    { key: 'J', label: 'J', position: { row: 2, col: 7 } },
    { key: 'K', label: 'K', position: { row: 2, col: 8 } },
    { key: 'L', label: 'L', position: { row: 2, col: 9 } },
    { key: ';', label: ';', position: { row: 2, col: 10 } },
    { key: "'", label: "'", position: { row: 2, col: 11 } },
  ],
  // Fourth row
  [
    { key: 'shift', label: 'Shift', position: { row: 3, col: 0 } },
    { key: 'Z', label: 'Z', position: { row: 3, col: 1 } },
    { key: 'X', label: 'X', position: { row: 3, col: 2 } },
    { key: 'C', label: 'C', position: { row: 3, col: 3 } },
    { key: 'V', label: 'V', position: { row: 3, col: 4 } },
    { key: 'B', label: 'B', position: { row: 3, col: 5 } },
    { key: 'N', label: 'N', position: { row: 3, col: 6 } },
    { key: 'M', label: 'M', position: { row: 3, col: 7 } },
    { key: ',', label: ',', position: { row: 3, col: 8 } },
    { key: '.', label: '.', position: { row: 3, col: 9 } },
    { key: '/', label: '/', position: { row: 3, col: 10 } },
    { key: 'Return', label: 'Enter', position: { row: 3, col: 11 } },
  ],
  // Fifth row
  [
    { key: 'Fn', label: 'Fn', position: { row: 4, col: 0 }, isModifier: true },
    {
      key: 'ctrl',
      label: 'Ctrl',
      position: { row: 4, col: 1 },
      isModifier: true,
    },
    {
      key: 'alt',
      label: 'Alt',
      position: { row: 4, col: 2 },
      isModifier: true,
    },
    {
      key: 'cmd',
      label: 'Cmd',
      position: { row: 4, col: 3 },
      isModifier: true,
    },
    { key: 'L1', label: 'L1', position: { row: 4, col: 4 }, isModifier: true },
    { key: 'space', label: 'Space', position: { row: 4, col: 5, width: 2 } },
    { key: 'L2', label: 'L2', position: { row: 4, col: 7 }, isModifier: true },
    { key: 'left', label: '🠈', position: { row: 4, col: 8 }, isModifier: true },
    { key: 'down', label: '🠋', position: { row: 4, col: 9 }, isModifier: true },
    { key: 'up', label: '🠉', position: { row: 4, col: 10 }, isModifier: true },
    {
      key: 'right',
      label: '🠊',
      position: { row: 4, col: 11 },
      isModifier: true,
    },
  ],
]
export default preonicLayout
