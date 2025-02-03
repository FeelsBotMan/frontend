import App from "./App";
import { render, screen } from "@testing-library/react";

test("renders learn react link", () => {
  render(<App />);
  const headerElement = screen.getByText("book store");
  expect(headerElement).toBeInTheDocument();
});
