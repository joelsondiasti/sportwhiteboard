import { type Edge, type Node, ReactFlow, useNodesState } from '@xyflow/react'

import '@xyflow/react/dist/style.css'
type DragAndDropProps = Partial<HTMLDivElement>

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
] satisfies Node[]

const initialEdges = [
  // { id: 'e1-2', source: '1', target: '2' }
] satisfies Edge[]

export default function DragAndDrop({ className }: DragAndDropProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
 
  return (
    <div className={`${className} w-full h-full`}>
      <ReactFlow
        nodes={nodes}
        edges={initialEdges}
        onNodesChange={onNodesChange}
        panOnScroll={false} // Desabilita o pan no scroll
        zoomOnScroll={false} // Desabilita o zoom com scroll
        zoomOnPinch={false} // Desabilita o zoom no pinch em touch
      />
    </div>
  )
}
