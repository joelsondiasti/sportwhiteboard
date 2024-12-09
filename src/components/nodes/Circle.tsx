import { NodeProps } from '@xyflow/react'

interface DataType {
  label?: string
  // ... outras propriedades que você espera em data
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Circle({ id, data }: NodeProps & { data: DataType }) {
  return (
    <div
      className="bg-teal-400 border-4 rounded-full w-8 h-8 flex items-center justify-center"
      key={id}
    >
      {data.label && <span className="text-white">{data.label}</span>}
    </div>
  )
}
