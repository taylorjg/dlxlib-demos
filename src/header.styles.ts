import styled from "@emotion/styled";

export const StyledHeader = styled.div<{ bgcolor: string }>`
  background-color: ${({ bgcolor }) => bgcolor};
  padding-right: 0.5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 2rem;
  z-index: 1;
`;
