import { useParams } from "react-router-dom"

import { lookupAvailableDemoByShortName } from "available-demos"
import { HeaderNavBar } from "./header-nav-bar"
import { PlaceholderDrawing } from "./placeholder-drawing"
import { Buttons } from "./buttons"
import { StyledPage, StyledMainContent, StyledDrawingWrapper, StyledErrorPage, StyledError } from "./demo-page.styles"

type DemoPageParams = {
  shortName: string
}

export type DemoPageProps = {
  Drawing?: React.FC,
  shortName?: string
}

export const DemoPage: React.FC<DemoPageProps> = ({
  Drawing = PlaceholderDrawing,
  shortName: shortNameProp
}) => {
  const { shortName: shortNameParam } = useParams<DemoPageParams>()
  const shortName = shortNameProp ?? shortNameParam
  const demo = lookupAvailableDemoByShortName(shortName)

  if (!demo) {
    return (
      <StyledErrorPage>
        <StyledError>
          Oops! It looks like no demo exists with short name, "{shortName}".
        </StyledError>
      </StyledErrorPage>
    )
  }

  return (
    <StyledPage>
      <HeaderNavBar demo={demo} />
      <StyledMainContent>
        <StyledDrawingWrapper>
          <Drawing />
        </StyledDrawingWrapper>
      </StyledMainContent>
      <Buttons />
    </StyledPage>
  )
}
