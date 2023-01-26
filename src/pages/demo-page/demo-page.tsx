import { useParams } from "react-router-dom"
import { StyledPage } from "./demo-page.styles"
import { HeaderNavBar } from "./header-nav-bar"

type DemoPageParams = {
  id: string
}

export const DemoPage = () => {
  const { id } = useParams<DemoPageParams>()

  return (
    <StyledPage>
      <HeaderNavBar id={Number(id)} />
    </StyledPage>
  )
}
