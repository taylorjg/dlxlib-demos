import styled from "@emotion/styled";

export const StyledControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  @supports not (gap: 2rem) {
    > *:not(:last-child) {
      margin-right: 2rem;
    }
  }
`;
