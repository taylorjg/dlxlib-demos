import { Container } from "@mui/material";
import { availableDemos } from "available-demos";
import { Tile } from "./tile";
import { StyledPage, StyledTiles } from "./home-page.styles";

export const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <StyledPage>
        <StyledTiles>
          {availableDemos.map((demo) => (
            <Tile key={demo.shortName} demo={demo} />
          ))}
        </StyledTiles>
      </StyledPage>
    </Container>
  );
};
