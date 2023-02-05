import { DrawingProps } from "types"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100

export const Drawing: React.FC<DrawingProps<{}, {}>> = () => {

  const drawBackground = (): JSX.Element => {
    return <rect x={0} y={0} width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="white" />
  }

  const drawMessage = (): JSX.Element => {
    const cx = VIEWBOX_WIDTH / 2
    const cy = VIEWBOX_HEIGHT / 2

    return (
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
      >
        TODO
      </text>
    )
  }

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      {drawBackground()}
      {drawMessage()}
    </svg>
  )
}
