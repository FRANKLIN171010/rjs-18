import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders the calculator", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: "Calculator" })).toBeInTheDocument();
});

test("calculates addition", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: "2" }));
  fireEvent.click(screen.getByRole("button", { name: "+" }));
  fireEvent.click(screen.getByRole("button", { name: "3" }));
  fireEvent.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByText("5", { selector: ".result" })).toBeInTheDocument();
});

test("clears the input", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: "7" }));
  fireEvent.click(screen.getByRole("button", { name: "C" }));

  expect(screen.getByText("0", { selector: ".expression" })).toBeInTheDocument();
});
