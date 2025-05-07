import planckLayout from './planckLayout'
import preonicLayout from './preonicLayout'
import { KeyboardLayout } from './types'

export interface LayoutConfig {
  id: string
  name: string
  description: string
  layout: KeyboardLayout
  preview: string
}

export const layouts: LayoutConfig[] = [
  {
    id: 'planck',
    name: 'Planck',
    description: 'Ortholinear 40% keyboard layout',
    layout: planckLayout,
    preview: '⌨️',
  },
  {
    id: 'preonic',
    name: 'Preonic',
    description: 'Ortholinear 50% keyboard layout',
    layout: preonicLayout,
    preview: '⌨️',
  },
]
