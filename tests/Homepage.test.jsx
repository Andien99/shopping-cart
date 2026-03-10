import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../src/components/homepage/Homepage";
import { MemoryRouter } from "react-router";

test("displays the title", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
  const title = screen.getByRole("heading");
  expect(title.textContent).toBe("Welcome to the Budget Shop!");
});

test("displays the shopping link", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.getByRole("link")).toBeInTheDocument();
});

test("shop link points to the correct route", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.getByRole("link", { name: /open shop/i })).toHaveAttribute(
    "href",
    "/shopping",
  );
});
