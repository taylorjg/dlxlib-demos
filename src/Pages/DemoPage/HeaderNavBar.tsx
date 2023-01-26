import { Link } from "react-router-dom"
import { StyledHeaderNavBar } from "./HeaderNavBar.styles"

export type HeaderNavBarProps = {
  id: number
}

export const HeaderNavBar: React.FC<HeaderNavBarProps> = ({ id }) => {
  return (
    <StyledHeaderNavBar data-testid="header-nav-bar">
      <Link to="/">Home</Link>
      <div>Demo {id}</div>
    </StyledHeaderNavBar>
  )
}
