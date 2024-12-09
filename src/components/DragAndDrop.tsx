import { useViewport } from '@/hooks/useViewPort'
import { calculateDimensions } from '@/utils/dimensionCalc'
import {
  ReactFlow,
  ReactFlowProps,
  ReactFlowProvider,
  type Edge,
  type Node as FlowNode,
  type NodeTypes,
  type OnNodesChange,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
// import { Circle } from './nodes/Circle'
type DragAndDropProps<T extends FlowNode = FlowNode> = {
  nodes: T[]
  nodeTypes: NodeTypes
  edges: Edge[]
  onNodesChange: OnNodesChange<T>
  className?: string
}
interface FlowProps extends ReactFlowProps {
  className?: string
}
// const NODE_TYPES = {
//   circle: Circle,
// }

// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }, type: 'circle' },
//   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' }, type: 'circle' },
// ] satisfies Node[]

// const initialEdges = [
//   // { id: 'e1-2', source: '1', target: '2' }
// ] satisfies Edge[]

function Flow(props: FlowProps) {
  const INITIAL_VIEW = { x: 0, y: 0, zoom: 1 }
  return (
    <ReactFlow
      {...props}
      // nodes={nodes}
      // nodeTypes={NODE_TYPES}
      // edges={initialEdges}
      // onNodesChange={onNodesChange} // Atualiza para usar a nova função
      defaultViewport={INITIAL_VIEW}
      viewport={INITIAL_VIEW}
      panOnDrag={false} // Desabilita o Pan no click do mouse
      panOnScroll={false} // Desabilita o pan no scroll
      zoomOnScroll={false} // Desabilita o zoom com scroll
      zoomOnPinch={false} // Desabilita o zoom no pinch em touch
    />
  )
}

function FlowWithProvider(props: FlowProps) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  )
}

export default function DragAndDrop<T extends FlowNode = FlowNode>({
  nodes,
  nodeTypes,
  edges,
  onNodesChange,
  className,
}: DragAndDropProps<T & FlowNode>) {
  const { width, height, device } = useViewport()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dimensions = calculateDimensions({ width, height, device })

  return (
    <div className={`${className} w-full h-full`}>
      <FlowWithProvider
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
      />
    </div>
  )
}
