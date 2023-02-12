import styled from "@emotion/styled"

export const StyledTile = styled.div`
  padding-left: 1rem;
  display: grid;
  grid-template-columns: 3fr 4fr;
  max-width: min(20rem, 90vw);
  min-height: calc(min(20rem, 90vw) * 9 / 16);
  border: 1px solid grey;
  cursor: pointer;
`

export const StyledLeftColumn = styled.div`
  display: flex;
  align-items: center;
`

export const StyledRightColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const StyledDrawingWrapper = styled.div<{ hideBorder: boolean }>`
  border: ${({ hideBorder }) => hideBorder ? "unset" : "1px solid grey"};
  width: calc(min(20rem, 90vw) * 3 / 7);
  height: calc(min(20rem, 90vw) * 3 / 7);
`
