import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

function App(props: AppProps) {
  useEffect(() => {
    // Check for system preference on initial load
    if (typeof window !== 'undefined') {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        document.documentElement.classList.add('dark')
      }

      // Check if user has previously set a theme preference
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  return <props.Component {...props.pageProps} />
}

export default App
