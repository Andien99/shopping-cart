import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Shopping from "../src/components/shopping/Shopping";
import { MemoryRouter } from "react-router";
import { afterEach } from "vitest";

const fakeProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: "product" + i,
  price: "$9.99",
  image: "fake-image.jpg",
}));

afterEach(() => {
  vi.clearAllMocks();
});

// list of tests to run on shopping page:
test("Shopping page runs and displays title", () => {
  render(
    <MemoryRouter>
      <Shopping />
    </MemoryRouter>,
  );
  const title = screen.getByText("Product list");
  expect(title.textContent).toBe("Product list");
});

afterEach(() => {
  vi.clearAllMocks();
});

// 2. Shopping page displays 20 product items
test("Shopping page displays 20 product items", async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(fakeProducts) }),
  );
  render(
    <MemoryRouter>
      <Shopping />
    </MemoryRouter>,
  );

  const allProducts = await screen.findAllByTestId("item");
  expect(allProducts).toHaveLength(20);
});

afterEach(() => {
  vi.clearAllMocks();
});

// 3. Shopping page displays a loading state while fetching
test("Shopping page displays a loading state while fetching", () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(fakeProducts) }),
  );
  render(
    <MemoryRouter>
      <Shopping />
    </MemoryRouter>,
  );

  const loading = screen.getByText("Loading...");
  expect(loading.textContent).toBe("Loading...");
});

afterEach(() => {
  vi.clearAllMocks();
});

// 4. Shopping page displays an error state if fetch fails
test("Shopping page displays an error state if fetch fails", async () => {
  global.fetch = vi.fn(() =>
    Promise.reject({ json: () => Promise.reject(fakeProducts) }),
  );
  render(
    <MemoryRouter>
      <Shopping />
    </MemoryRouter>,
  );

  const error = await screen.findByTestId("error");
  expect(error.textContent).toBe("Error: 404 not found");
});

afterEach(() => {
  vi.clearAllMocks();
});

// 5. Shopping page displays items after data loads(async test)
test("Shopping page displays items after data loads", async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(fakeProducts) }),
  );
  render(
    <MemoryRouter>
      <Shopping />
    </MemoryRouter>,
  );

  const loading = screen.getByText("Loading...");
  expect(loading).toBeInTheDocument();

  const allProducts = await screen.findAllByTestId("item");
  expect(allProducts).toHaveLength(20);
});
// 6. Clicking 'Add to Cart' on an item updates the cart count in the header/navbar
