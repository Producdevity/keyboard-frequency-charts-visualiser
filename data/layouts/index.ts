import planckLayout from './planckLayout'
import preonicLayout from './preonicLayout'

export interface LayoutConfig {
  id: string
  name: string
  description: string
  layout: typeof planckLayout
}

export const layouts: LayoutConfig[] = [
  {
    id: 'planck',
    name: 'Planck',
    description: 'Ortholinear 40% keyboard layout',
    layout: planckLayout,
  },
  {
    id: 'preonic',
    name: 'Preonic',
    description: 'Ortholinear 50% keyboard layout',
    layout: preonicLayout,
  },
]

export const defaultLayout = layouts[0] 