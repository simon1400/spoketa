import '../styles/main.scss'
import UIkit from 'uikit'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Suppress hydration warnings from UIKit
    const originalError = console.error
    const originalWarn = console.warn

    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('Hydration') ||
          args[0].includes('did not match') ||
          args[0].includes('Extra attributes from the server'))
      ) {
        return
      }
      originalError.call(console, ...args)
    }

    console.warn = (...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('Hydration') || args[0].includes('did not match'))
      ) {
        return
      }
      originalWarn.call(console, ...args)
    }

    return () => {
      console.error = originalError
      console.warn = originalWarn
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
