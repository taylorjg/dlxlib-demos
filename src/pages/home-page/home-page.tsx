import { Tile } from "./tile"
import { Version } from "./version"
import { StyledPage, StyledTiles } from "./home-page.styles"
import { availableDemos } from "../../available-demos"

export const HomePage = () => {
  return (
    <StyledPage>
      <StyledTiles>
        {availableDemos.map((demo, index) => <Tile key={index} demo={demo} />)}
      </StyledTiles>
      <Version />
    </StyledPage>
  )
}
