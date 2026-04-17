import { test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Item from "../src/components/shopping/Item/Item";
import { CartProvider } from "../src/components/cart/CartContext";
const mockItem = {
  title: "Test Product",
  price: 9.99,
  img: "test-image.jpg",
  id: 1,
};

//List of things to test for the Item component

// 1. Item displays image, title and price
test("Item displays image, title and price", () => {
  render(
    <MemoryRouter>
      <CartProvider>
        <Item
          title={mockItem.title}
          price={mockItem.price}
          img={mockItem.img}
          id={mockItem.id}
          addToCart={() => {}}
        ></Item>
      </CartProvider>
    </MemoryRouter>,
  );

  expect(screen.getByText("Test Product")).toBeInTheDocument();
  expect(screen.getByText("$9.99")).toBeInTheDocument();
  expect(screen.getByRole("img")).toHaveAttribute("src", "test-image.jpg");
});

// 2. Item increment button increases the quantity value
test("Item increment button increases the quantity value", () => {
  render(
    <MemoryRouter>
      <CartProvider>
        <Item
          title={mockItem.title}
          price={mockItem.price}
          img={mockItem.img}
          id={mockItem.id}
          addToCart={() => {}}
        ></Item>
      </CartProvider>
    </MemoryRouter>,
  );

  const incrementBtn = screen.getByRole("button", { name: "+" });
  const quantity = screen.getByTestId("quantity");
  expect(quantity.textContent).toBe("0");
  fireEvent.click(incrementBtn);
  expect(quantity.textContent).toBe("1");
});
// 3. Item decrement button decreases the quantity value
test("Item decrement button decreases the quantity value", () => {
  render(
    <MemoryRouter>
      <CartProvider>
        <Item
          title={mockItem.title}
          price={mockItem.price}
          img={mockItem.img}
          id={mockItem.id}
          addToCart={() => {}}
        ></Item>
      </CartProvider>
    </MemoryRouter>,
  );

  const decrementBtn = screen.getByRole("button", { name: "-" });
  const incrementBtn = screen.getByRole("button", { name: "+" });
  const quantity = screen.getByTestId("quantity");
  fireEvent.click(incrementBtn);
  fireEvent.click(incrementBtn);
  expect(quantity.textContent).toBe("2");
  fireEvent.click(decrementBtn);
  expect(quantity.textContent).toBe("1");
});
// 4. item quantity cannot decrement below zero
test("item quantity cannot decrement below zero", () => {
  render(
    <MemoryRouter>
      <CartProvider>
        <Item
          title={mockItem.title}
          price={mockItem.price}
          img={mockItem.img}
          id={mockItem.id}
          addToCart={() => {}}
        ></Item>
      </CartProvider>
    </MemoryRouter>,
  );

  const decrementBtn = screen.getByRole("button", { name: "-" });
  const quantity = screen.getByTestId("quantity");
  expect(quantity.textContent).toBe("0");
  fireEvent.click(decrementBtn);
  expect(quantity.textContent).toBe("0");
});

// 5. clicking add to cart will add the correct number of cart items//
test("clicking add to cart will add the correct number of cart items", () => {
  const mockAddToCart = vi.fn();

  render(
    <MemoryRouter>
      <CartProvider>
        <Item
          title={mockItem.title}
          price={mockItem.price}
          img={mockItem.img}
          id={mockItem.id}
          addToCart={mockAddToCart}
        ></Item>
      </CartProvider>
    </MemoryRouter>,
  );

  const incrementBtn = screen.getByRole("button", { name: "+" });
  fireEvent.click(incrementBtn);
  fireEvent.click(incrementBtn);

  const addToCartBtn = screen.getByRole("button", { name: "Add to cart" });
  fireEvent.click(addToCartBtn);

  // addToCart(title, price, img, quantity, id);
  expect(mockAddToCart).toHaveBeenCalledWith(
    "Test Product",
    9.99,
    "test-image.jpg",
    2,
    1,
  );
});
