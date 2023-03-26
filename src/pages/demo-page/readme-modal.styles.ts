import styled from "@emotion/styled";

export const StyledContent = styled.div`
  padding: 1rem 2rem;
  table {
    border-collapse: collapse;
  }
  table,
  tr,
  td,
  th {
    border: 1px solid grey;
    padding: 0.5rem;
  }
  code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
      Liberation Mono, monospace;
    font-size: 85%;
    white-space: break-spaces;
    background-color: rgba(110, 118, 129, 0.4);
    border-radius: 6px;
  }
  pre {
    padding: 16px;
    font-size: 85%;
    background-color: #161b22;
    border-radius: 6px;
  }
  pre code {
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }
`;
