import { useEffect, useRef, useState } from 'react'

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void,
) => {
  const [mouseDown, setMouseDown] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prevPoint = useRef<null | Point>(null)

  const onMouseDown = () => setMouseDown(true)
  const onTouchStart = () => setMouseDown(true)

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!mouseDown) return

      const currentPoint = computePointInCanvas(e)

      const ctx = canvasRef.current?.getContext('2d')
      if (!ctx || !currentPoint) return

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current })
      prevPoint.current = currentPoint
    }

    const computePointInCanvas = (e: MouseEvent | TouchEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()

      // Suporte para toque e mouse
      const clientX =
        (e as TouchEvent).touches?.[0]?.clientX ?? (e as MouseEvent).clientX
      const clientY =
        (e as TouchEvent).touches?.[0]?.clientY ?? (e as MouseEvent).clientY

      const x = clientX - rect.left
      const y = clientY - rect.top

      return { x, y }
    }

    const mouseUpHandler = () => {
      setMouseDown(false)
      prevPoint.current = null
    }

    // Adicionar eventos de mouse e toque
    canvasRef.current?.addEventListener('mousemove', handler)
    canvasRef.current?.addEventListener('touchmove', handler)
    canvasRef.current?.addEventListener('mousedown', onMouseDown)
    canvasRef.current?.addEventListener('touchstart', onTouchStart)
    window.addEventListener('mouseup', mouseUpHandler)
    window.addEventListener('touchend', mouseUpHandler)

    // Remover os eventos ao desmontar o componente
    return () => {
      canvasRef.current?.removeEventListener('mousemove', handler)
      canvasRef.current?.removeEventListener('touchmove', handler)
      canvasRef.current?.removeEventListener('mousedown', onMouseDown)
      canvasRef.current?.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('mouseup', mouseUpHandler)
      window.removeEventListener('touchend', mouseUpHandler)
    }
  }, [onDraw])

  return { canvasRef, onMouseDown, onTouchStart, clear }
}
