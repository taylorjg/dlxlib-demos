import { useHistory } from "react-router-dom";

import { AvailableDemo } from "types";
import {
  StyledTile,
  StyledLeftColumn,
  StyledRightColumn,
  StyledDrawingWrapper,
} from "./tile.styles";

export type TileProps = {
  demo: AvailableDemo;
};

export const Tile: React.FC<TileProps> = ({ demo }) => {
  const history = useHistory();
  return (
    <StyledTile onClick={() => history.push(`/demo/${demo.shortName}`)}>
      <StyledLeftColumn>
        <StyledDrawingWrapper hideBorder={demo.hideBorder}>
          <demo.Thumbnail />
        </StyledDrawingWrapper>
      </StyledLeftColumn>
      <StyledRightColumn>{demo.name}</StyledRightColumn>
    </StyledTile>
  );
};
