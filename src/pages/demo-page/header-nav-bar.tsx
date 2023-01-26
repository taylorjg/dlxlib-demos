import { Link } from "react-router-dom"
import { AvailableDemo } from "../../types"
import { StyledHeaderNavBar } from "./header-nav-bar.styles"

export type HeaderNavBarProps = {
  demo: AvailableDemo
}

export const HeaderNavBar: React.FC<HeaderNavBarProps> = ({ demo }) => {
  return (
    <StyledHeaderNavBar data-testid="header-nav-bar">
      <Link to="/">Home</Link>
      <div>{demo.name}</div>
    </StyledHeaderNavBar>
  )
}
