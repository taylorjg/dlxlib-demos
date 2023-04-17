import styled from "@emotion/styled";

export const StyledPage = styled.div`
  padding: 3rem 5rem 2rem 5rem;
  @media (max-width: 600px) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  display: flex;
  flex-direction: column;
  height: 90vh; /* fallback if dvh on next line is not recognised */
  height: 100dvh;
`;

export const StyledGrid = styled.div`
  @media (orientation: portrait) {
    grid-template-rows: 1fr auto;
  }
  @media (orientation: landscape) {
    grid-template-columns: 1fr 1fr;
  }
  flex-grow: 1;
  display: grid;
`;

export const StyledDrawingContent = styled.div`
  @media (orientation: portrait) {
    /* background-color: #ff000022; */
    padding: 2rem 0;
  }
  @media (orientation: landscape) {
    /* background-color: #00ff0022; */
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledDrawingWrapper = styled.div<{ hideBorder: boolean }>`
  border: ${({ hideBorder }) => (hideBorder ? "unset" : "2px solid grey")};
  @media (orientation: portrait) {
    @supports (aspect-ratio: 1) {
      aspect-ratio: 1;
      height: 100%;
      max-height: 90vw;
    }
    @supports not (aspect-ratio: 1) {
      width: min(50vw, 50vh);
      height: min(50vw, 50vh);
    }
  }
  @media (orientation: landscape) {
    width: 32vw;
    height: 32vw;
    /* @supports (aspect-ratio: 1) {
      aspect-ratio: 1;
      width: 32vw;
      max-width: 35vw;
      margin-right: 0.5rem;
    } */
    /* @supports not (aspect-ratio: 1) {
      width: 32vw;
      height: 32vw;
    } */
  }
`;

export const StyledControlsContent = styled.div`
  /* background-color: #0000ff22; */
  @media (orientation: landscape) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledErrorPage = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledError = styled.div`
  border: 1px solid grey;
  padding: 1rem;
`;
