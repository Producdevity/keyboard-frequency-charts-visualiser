import React from 'react'

function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container-app text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Keyboard Frequency Visualizer. All
          rights reserved.
        </p>
        <p className="text-xs mt-2 text-gray-500 dark:text-gray-500">
          Producdevity - Built with Next.js, Tailwind CSS, and Recharts
        </p>
      </div>
    </footer>
  )
}

export default Footer
