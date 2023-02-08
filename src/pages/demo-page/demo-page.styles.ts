import styled from "@emotion/styled"

export const StyledPage = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const StyledMainContent = styled.div`
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledDrawingWrapper = styled.div<{ hideBorder: boolean }>`
  border: ${({ hideBorder }) => hideBorder ? "unset" : "2px solid grey"};
  @supports (aspect-ratio: 1) {
    height: 100%;
    aspect-ratio: 1;
  }
  @supports not (aspect-ratio: 1) {
    width: min(50vw, 50vh);
    height: min(50vw, 50vh);
  }
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
