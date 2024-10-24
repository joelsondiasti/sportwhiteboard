'use client'
import bgfutebol from '@/assets/futebol.png'
import { useDraw } from '@/hooks/useDraw'
import { useViewport } from '@/hooks/useViewPort'
import { calculateDimensions } from '@/utils/dimensionCalc'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import DragAndDrop from './DragAndDrop'
import { SideToolbar } from './Toolbar'

export function Canva() {
  const { width, height, device } = useViewport()
  const [loading, setLoading] = useState<boolean>(true)
  const dimensions = calculateDimensions({ width, height, device })

  async function timeout() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    timeout()
  }, [loading])

  const [color, setColor] = useState<string>('#000')
  const [enableDraw, setEnableDraw] = useState<boolean>(false)
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine)

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint
    const lineColor = color
    const lineWidth = 5

    const startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()

    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx.fill()
  }

  function setPencilColor(color: string) {
    setColor(color)
  }

  function switchEnableDraw(status: boolean) {
    setEnableDraw(status)
  }

  return (
    <>
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="absolute top-0 left-0">
          <div
            className={`w-[${dimensions.width}px] h-[${dimensions.height}px] relative`}
          >
            <Image
              src={bgfutebol}
              alt="bg"
              height={dimensions.height}
              width={dimensions.width}
              className={`w-[${dimensions.width}px] h-[${dimensions.height}px] z-10`}
            />
            <canvas
              ref={canvasRef}
              onMouseDown={onMouseDown}
              width={dimensions.width}
              height={dimensions.height}
              className={`border border-black rounded-md absolute top-0 left-0 ${enableDraw ? 'z-30' : 'z-0'}`}
            />
            <DragAndDrop
              className={`absolute top-0 left-0 ${enableDraw ? 'z-20' : 'z-30'}`}
            />
            <SideToolbar
              className="absolute flex-row lg:-right-16 lg:top-4 "
              clear={clear}
              color={color}
              setPencilColor={setPencilColor}
              enableDraw={enableDraw}
              setEnableDraw={switchEnableDraw}
            />
          </div>
        </div>
      )}
    </>
  )
}
