import { useParams } from "react-router-dom"
import { StyledPage } from "./DemoPage.styles"
import { HeaderNavBar } from "./HeaderNavBar"

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
