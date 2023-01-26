import { Tile } from "./tile"
import { Version } from "./version"
import { StyledPage, StyledTiles } from "./home-page.styles"

export const HomePage = () => {
  const demos = Array.from(Array(11).keys())
    .map(n => n + 1)
    .map(id => ({
      name: `Demo ${id}`,
      id
    }))

  return (
    <StyledPage>
      <StyledTiles>
        {demos.map((demo, index) => <Tile key={index} demo={demo} />)}
      </StyledTiles>
      <Version />
    </StyledPage>
  )
}
