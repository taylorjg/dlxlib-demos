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

export const Tile: React.FunctionComponent<TileProps> = ({
  demo,
}: TileProps) => {
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
