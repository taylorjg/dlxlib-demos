import { Link } from "react-router-dom"
import { StyledPage } from "./DemoPage.styles"

export const DemoPage = () => {
  return (
    <StyledPage>
      <Link to="/">Home</Link>
      <div>TODO</div>
    </StyledPage>
  )
}
