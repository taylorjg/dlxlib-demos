import { useHistory } from "react-router-dom"
import HomeIcon from "@mui/icons-material/Home"
import { AvailableDemo } from "../../types"
import { StyledHeaderNavBar } from "./header-nav-bar.styles"

export type HeaderNavBarProps = {
  demo: AvailableDemo
}

export const HeaderNavBar: React.FC<HeaderNavBarProps> = ({ demo }) => {
  const history = useHistory()

  const onHome = () => history.push("/")

  return (
    <StyledHeaderNavBar data-testid="header-nav-bar">
      <div>
        <div style={{ display: "flex", cursor: "pointer" }} onClick={onHome}>
          <div style={{ display: "flex", alignItems: "center", marginRight: "0.5rem" }}><HomeIcon /></div>
          <div style={{ display: "flex", alignItems: "center" }}>Home</div>
        </div>
      </div>
      <div>{demo.name}</div>
    </StyledHeaderNavBar>
  )
}
