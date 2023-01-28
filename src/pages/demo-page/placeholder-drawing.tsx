import { DrawingProps } from "types"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100

export const PlaceholderDrawing: React.FC<DrawingProps> = () => {
  const cx = VIEWBOX_WIDTH / 2
  const cy = VIEWBOX_HEIGHT / 2

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      <rect x={0} y={0} width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="white" />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">TODO</text>
    </svg>
  )
}
