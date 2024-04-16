import { useCallback, useEffect, useState } from 'react'

export default function useWindowDimensions() {
  const hasWindow = typeof window !== 'undefined'

  const getWindowDimensions = useCallback(() => {
    const width = hasWindow ? window.innerWidth : null
    const height = hasWindow ? window.innerHeight : null
    return {
      width: width || 0,
      height: height || 0,
    }
  }, [hasWindow])

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [hasWindow, getWindowDimensions])

  return windowDimensions
}
