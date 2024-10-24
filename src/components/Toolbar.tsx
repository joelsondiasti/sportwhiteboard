import * as Toolbar from '@radix-ui/react-toolbar'
import { Eraser, PenTool, PencilOff, PencilRuler } from 'lucide-react'
import { cyan, red, zinc } from 'tailwindcss/colors'

type SideToolbarProps = Partial<HTMLDivElement> & {
  clear: () => void
  color: string
  setPencilColor: (color: string) => void
  enableDraw: boolean
  setEnableDraw: (status: boolean) => void
}

type PenProps = Partial<HTMLDivElement> & {
  selectColor: string
  penColor: string
  enableDraw: boolean
  setPencilColor: (color: string) => void
}

function Pen({ selectColor, penColor, enableDraw, setPencilColor }: PenProps) {
  return (
    <Toolbar.Button
      className={`${selectColor === penColor && 'bg-zinc-100'} disabled:opacity-15 disabled:cursor-not-allowed p-1 rounded-lg hover:bg-zinc-200`}
      onClick={() => setPencilColor(penColor)}
      disabled={!enableDraw}
    >
      <PenTool
        className={`text-[${penColor}] disabled:text-zinc-950`}
        style={{ color: penColor }}
      />
    </Toolbar.Button>
  )
}

export function SideToolbar({
  className,
  setPencilColor,
  color,
  clear,
  enableDraw,
  setEnableDraw,
}: SideToolbarProps) {
  return (
    <Toolbar.Root
      className={` ${className} bg-white rounded-md flex mt-6 ml-6 lg:ml-0 lg:flex-col p-2 gap-4`}
      orientation="vertical"
    >
      <Toolbar.Button
        className="p-1 rounded-lg hover:bg-zinc-200"
        onClick={() => setEnableDraw(!enableDraw)}
      >
        {enableDraw ? <PencilOff /> : <PencilRuler />}
      </Toolbar.Button>

      {/* Pen Colors */}

      <Pen
        enableDraw={enableDraw}
        penColor={zinc['950']}
        selectColor={color}
        setPencilColor={setPencilColor}
      />
      <Pen
        enableDraw={enableDraw}
        penColor={cyan['500']}
        selectColor={color}
        setPencilColor={setPencilColor}
      />
      <Pen
        enableDraw={enableDraw}
        penColor={red['500']}
        selectColor={color}
        setPencilColor={setPencilColor}
      />

      <Toolbar.Separator className="border border-zinc-200" />

      <Toolbar.Button
        className="p-1 rounded-lg hover:bg-zinc-200"
        onClick={() => clear()}
      >
        <Eraser />
      </Toolbar.Button>
    </Toolbar.Root>
  )
}
