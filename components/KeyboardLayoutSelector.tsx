import { useState } from 'react'
import type { LayoutConfig } from '@/data/layouts'
import { layouts } from '@/data/layouts'

interface LayoutSelectorProps {
  onLayoutChange: (layout: LayoutConfig) => void
  currentLayout: LayoutConfig
}

function KeyboardLayoutSelector(props: LayoutSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span>{props.currentLayout.name}</span>
        <span className="text-gray-400">{props.currentLayout.preview}</span>
        <svg
          className={`w-5 h-5 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-56 mt-2 bg-white rounded-md shadow-lg">
          <div className="py-1">
            {layouts.map((layout) => (
              <button
                key={layout.id}
                onClick={() => {
                  props.onLayoutChange(layout)
                  setIsOpen(false)
                }}
                className={`flex items-center w-full px-4 py-2 text-sm ${
                  layout.id === props.currentLayout.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{layout.preview}</span>
                <span>{layout.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default KeyboardLayoutSelector
