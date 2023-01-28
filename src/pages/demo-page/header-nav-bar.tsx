import { useHistory } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { AvailableDemo } from "../../types"
import { StyledHeaderNavBar } from "./header-nav-bar.styles"

export type HeaderNavBarProps = {
  demo: AvailableDemo
}

export const HeaderNavBar: React.FC<HeaderNavBarProps> = ({ demo }) => {
  const history = useHistory()

  const onBack = () => history.push("/")

  return (
    <StyledHeaderNavBar data-testid="header-nav-bar">
      <div>
        <div style={{ display: "flex", cursor: "pointer" }} onClick={onBack}>
          <div style={{ display: "flex", alignItems: "center", marginRight: "0.5rem" }}><ArrowBackIcon /></div>
          <div style={{ display: "flex", alignItems: "center" }}>Back</div>
        </div>
      </div>
      <div>{demo.name}</div>
    </StyledHeaderNavBar>
  )
}
