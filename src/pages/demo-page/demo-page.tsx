import { useParams } from "react-router-dom"
import { StyledPage, StyledErrorPage, StyledError } from "./demo-page.styles"
import { HeaderNavBar } from "./header-nav-bar"
import { lookupAvailableDemoByIdParam } from "../../available-demos"

type DemoPageParams = {
  id: string
}

export const DemoPage = () => {
  const { id } = useParams<DemoPageParams>()
  const demo = lookupAvailableDemoByIdParam(id)

  if (!demo) {
    return (
      <StyledErrorPage>
        <StyledError>
          Oops! It looks like no demo exists with id {id}.
        </StyledError>
      </StyledErrorPage>
    )
  }

  return (
    <StyledPage>
      <HeaderNavBar demo={demo} />
    </StyledPage>
  )
}
