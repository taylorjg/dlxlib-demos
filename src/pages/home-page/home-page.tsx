import { availableDemos } from "available-demos"
import { Tile } from "./tile"
import { Version } from "./version"
import { StyledPage, StyledTiles } from "./home-page.styles"

export const HomePage = () => {
  return (
    <StyledPage>
      <StyledTiles>
        {availableDemos.map(demo => <Tile key={demo.shortName} demo={demo} />)}
      </StyledTiles>
      <Version />
    </StyledPage>
  )
}
