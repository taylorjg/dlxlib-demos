import { Tile } from "./Tile"
import { Version } from "./Version"
import { StyledPage, StyledTiles } from "./HomePage.styles"

export const HomePage = () => {
  const demos = Array.from(Array(11).keys()).map(n => ({ name: `Demo ${n + 1}` }))

  return (
    <StyledPage>
      <StyledTiles>
        {demos.map((demo, index) => <Tile key={index} demo={demo} />)}
      </StyledTiles>
      <Version />
    </StyledPage>
  )
}
