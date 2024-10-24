import { useCallback, useLayoutEffect, useState } from 'react'

interface Viewport {
  width: number
  height: number
  device: 'mobile' | 'tablet' | 'desktop'
}
function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>({
    width: 0,
    height: 0,
    device: 'desktop',
  })

  const handleResize = useCallback(() => {
    setViewport({
      width: window.innerWidth,
      height: window.innerHeight,
      device: getDeviceType(),
    })
  }, [])

  useLayoutEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  const getDeviceType = (): Viewport['device'] => {
    const ua = navigator.userAgent
    if (ua.match(/mobile/i)) return 'mobile'
    if (ua.match(/tablet/i)) return 'tablet'
    return 'desktop'
  }

  return viewport
}

export { useViewport }
