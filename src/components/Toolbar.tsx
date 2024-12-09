import * as Toolbar from '@radix-ui/react-toolbar'
import * as Tooltip from '@radix-ui/react-tooltip'
import {
  Eraser,
  PenTool,
  PencilOff,
  PencilRuler,
  RefreshCcw,
  UserCircle2Icon,
} from 'lucide-react'
import { ReactNode } from 'react'
import { cyan, red, zinc } from 'tailwindcss/colors'
import { NodeTypes } from './Canva'

type SideToolbarProps = Partial<HTMLDivElement> & {
  clear: () => void
  color: string
  setPencilColor: (color: string) => void
  enableDraw: boolean
  setEnableDraw: (status: boolean) => void
  reset: () => void
  create: ({ type }: NodeTypes) => void
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

function ToolbarButton({
  children,
  label,
}: {
  children: ReactNode
  label: string
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>{children}</Tooltip.Trigger>
      <Tooltip.Content className="bg-black/70 ml-4 p-2 text-white" side="right">
        {label}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

export function SideToolbar({
  className,
  setPencilColor,
  color,
  clear,
  enableDraw,
  setEnableDraw,
  reset,
  create,
}: SideToolbarProps) {
  return (
    <Toolbar.Root
      className={` ${className} bg-white rounded-md flex mt-6 ml-6 lg:ml-0 lg:flex-col p-2 gap-4`}
      orientation="vertical"
    >
      <Tooltip.Provider delayDuration={800} skipDelayDuration={500}>
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

        <Toolbar.Separator className="border border-zinc-200" />

        <ToolbarButton label="Criar Jogador">
          <Toolbar.Button
            className="p-1 rounded-lg hover:bg-zinc-200"
            onClick={() => create({ type: 'circle' })}
          >
            <UserCircle2Icon className="text-teal-400" />
          </Toolbar.Button>
        </ToolbarButton>

        <ToolbarButton label="Criar Oponente">
          <Toolbar.Button
            className="p-1 rounded-lg hover:bg-zinc-200"
            onClick={() => create({ type: 'circle2' })}
          >
            <UserCircle2Icon className="text-red-600" />
          </Toolbar.Button>
        </ToolbarButton>

        <ToolbarButton label="Reset">
          <Toolbar.Button
            className="p-1 rounded-lg hover:bg-zinc-200"
            onClick={() => reset()}
          >
            <RefreshCcw />
          </Toolbar.Button>
        </ToolbarButton>
      </Tooltip.Provider>
    </Toolbar.Root>
  )
}
