import { render, screen } from "@testing-library/react";

import { App } from "./app";

test("renders home page", () => {
  render(<App />);
  expect(screen.getByText("N Queens")).toBeInTheDocument();
});
