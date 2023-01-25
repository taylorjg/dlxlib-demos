import { useHistory } from "react-router-dom"

import { StyledTile } from "./Tile.styles"

export type TileProps = {
  demo: { name: string }
}

export const Tile: React.FC<TileProps> = ({ demo }) => {
  const history = useHistory();
  return (
    <StyledTile onClick={() => history.push("/demo")}>
      {demo.name}
    </StyledTile>
  )
}
