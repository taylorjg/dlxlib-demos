import { StyledTile } from "./Tile.styles"

export type TileProps = {
  demo: { name: string }
}

export const Tile: React.FC<TileProps> = ({ demo }) => {
  return (
    <StyledTile>
      {demo.name}
    </StyledTile>
  )
}
