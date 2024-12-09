'use client'
import bgfutebol from '@/assets/futebol.png'
import { useDraw } from '@/hooks/useDraw'
import { useViewport } from '@/hooks/useViewPort'
import { calculateDimensions } from '@/utils/dimensionCalc'
import { type Edge, type Node as FlowNode, useNodesState } from '@xyflow/react'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import DragAndDrop from './DragAndDrop'
import { SideToolbar } from './Toolbar'
import { Circle } from './nodes/Circle'
import { Circle2 } from './nodes/Circle2'

interface CustomNode extends FlowNode {
  data: {
    label: string
  }
}
export interface NodeTypes {
  type: 'circle' | 'circle2'
}

export function Canva() {
  const { width, height, device } = useViewport()
  const dimensions = calculateDimensions({ width, height, device })
  const [loading, setLoading] = useState<boolean>(true)

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
  const [nodeNumber, setNodeNumber] = useState(3)
  const [stateOfNodes, setStateOfNodes] = useState([])

  const NODE_TYPES = {
    circle: Circle,
    circle2: Circle2,
  }

  function addTshirtNumber() {
    const number = nodeNumber
    setNodeNumber(number + 1)
    return String(number)
  }

  const INITIAL_NODES = [
    {
      id: crypto.randomUUID(),
      position: { x: 0, y: 0 },
      data: { label: '1' },
      type: 'circle',
    },
    {
      id: crypto.randomUUID(),
      position: { x: 0, y: 100 },
      data: { label: '2' },
      type: 'circle',
    },
  ] satisfies FlowNode[]

  const initialEdges = [
    // { id: 'e1-2', source: '1', target: '2' }
  ] satisfies Edge[]

  const [nodes, setNodes, onNodesChange] =
    useNodesState<CustomNode>(INITIAL_NODES)

  function resetNodes() {
    setNodes(INITIAL_NODES)
  }

  function createNode({ type }: NodeTypes) {
    const newNode = {
      id: crypto.randomUUID(),
      position: { x: 0, y: 100 },
      data: { label: addTshirtNumber() },
      type,
    }
    setNodes([...nodes, newNode])
  }

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
              className={`border border-black rounded-md absolute top-0 left-0 ${enableDraw ? 'z-30' : 'z-20'}`}
            />

            <DragAndDrop
              className={`absolute top-0 left-0 ${enableDraw ? 'z-20 ' : 'z-30'}`}
              nodes={nodes}
              nodeTypes={NODE_TYPES}
              edges={initialEdges}
              onNodesChange={onNodesChange} // Atualiza para usar a nova função
            />

            <SideToolbar
              className="absolute flex-row lg:-right-16 lg:top-4 "
              clear={clear}
              color={color}
              setPencilColor={setPencilColor}
              enableDraw={enableDraw}
              setEnableDraw={switchEnableDraw}
              reset={resetNodes}
              create={createNode}
            />
          </div>
        </div>
      )}
    </>
  )
}
