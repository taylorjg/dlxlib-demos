import styled from "@emotion/styled"

export const StyledPage = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const StyledMainContent = styled.div`
  /* background-image: url("/dlxlib-demos/pattern_apple_wood.png"); */
  padding: 4rem;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledDrawingWrapper = styled.div`
  border: 2px solid grey;
  height: 100%;
  aspect-ratio: 1;
`

export const StyledErrorPage = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledError = styled.div`
  border: 1px solid grey;
  padding: 1rem;
`
