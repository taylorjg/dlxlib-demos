import styled from "@emotion/styled"

export const StyledPage = styled.div`
  padding: 2rem 0;
  width: 100%;
`;

export const StyledTiles = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(auto-fill, min(20rem, calc(90vw)));
  justify-content: center;
  gap: 1rem;
`
