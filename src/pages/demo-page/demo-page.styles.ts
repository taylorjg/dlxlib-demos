import styled from "@emotion/styled";

export const StyledPage = styled.div`
  padding: 3rem 5rem 2rem 5rem;
  @media (max-width: 600px) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  display: flex;
  flex-direction: column;
  height: 100vh; /* fallback */
  height: 100dvh;
`;

export const StyledMainContent = styled.div`
  padding: 2rem 0;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledDrawingWrapper = styled.div<{ hideBorder: boolean }>`
  border: ${({ hideBorder }) => (hideBorder ? "unset" : "2px solid grey")};
  @supports (aspect-ratio: 1) {
    height: 100%;
    max-height: 90dvw;
    aspect-ratio: 1;
  }
  @supports not (aspect-ratio: 1) {
    width: min(50dvw, 50dvh);
    height: min(50dvw, 50dvh);
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
