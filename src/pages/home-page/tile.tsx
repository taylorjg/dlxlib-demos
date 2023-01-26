import { useHistory } from "react-router-dom"
import { AvailableDemo } from "../../types"

import { StyledTile } from "./tile.styles"

export type TileProps = {
  demo: AvailableDemo
}

export const Tile: React.FC<TileProps> = ({ demo }) => {
  const history = useHistory()
  return (
    <StyledTile onClick={() => history.push(`/demo/${demo.id}`)}>
      {demo.name}
    </StyledTile>
  )
}
