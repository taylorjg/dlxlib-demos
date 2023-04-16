import { useHistory } from "react-router-dom";

import { AvailableDemo } from "types";
import { sendAnalyticsClickEvent } from "analytics";
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

  const onTileClick = () => {
    history.push(`/demo/${demo.shortName}`);
    sendAnalyticsClickEvent("tile_click", demo);
  };

  return (
    <StyledTile onClick={onTileClick}>
      <StyledLeftColumn>
        <StyledDrawingWrapper hideBorder={demo.hideBorder}>
          <demo.Thumbnail />
        </StyledDrawingWrapper>
      </StyledLeftColumn>
      <StyledRightColumn>{demo.name}</StyledRightColumn>
    </StyledTile>
  );
};
