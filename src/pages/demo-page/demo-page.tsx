import { useParams } from "react-router-dom"
import { StyledPage, StyledMainContent, StyledDrawingWrapper, StyledErrorPage, StyledError } from "./demo-page.styles"
import { HeaderNavBar } from "./header-nav-bar"
import { SudokuDrawing } from "../../demos/sudoku/drawing"
import { Buttons } from "./buttons"
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
      <StyledMainContent>
        <StyledDrawingWrapper>
          <SudokuDrawing />
        </StyledDrawingWrapper>
      </StyledMainContent>
      <Buttons />
    </StyledPage>
  )
}
