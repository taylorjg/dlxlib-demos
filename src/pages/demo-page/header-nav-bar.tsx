import { useHistory } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

import { AvailableDemo } from "types"
import {
  StyledHeaderNavBar,
  StyledBackLink,
  StyledBackLinkArrow,
  // StyledBackLinkText,
  StyledDemoName
} from "./header-nav-bar.styles"

export type HeaderNavBarProps = {
  availableDemo: AvailableDemo
}

export const HeaderNavBar: React.FC<HeaderNavBarProps> = ({ availableDemo }) => {
  const history = useHistory()

  const onBack = () => history.push("/")

  return (
    <StyledHeaderNavBar data-testid="header-nav-bar">
      <StyledBackLink onClick={onBack}>
        <StyledBackLinkArrow>
          <ArrowBackIcon />
        </StyledBackLinkArrow>
        {/* <StyledBackLinkText>Back</StyledBackLinkText> */}
      </StyledBackLink>
      <StyledDemoName>{availableDemo.name}</StyledDemoName>
    </StyledHeaderNavBar>
  )
}
