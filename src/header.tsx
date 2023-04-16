import { useTheme } from "@mui/material";
import { Version } from "version";
import { StyledHeader } from "./header.styles";

export const Header = () => {
  const theme = useTheme();

  return (
    <StyledHeader bgcolor={theme.palette.background.default}>
      <Version />
    </StyledHeader>
  );
};
