import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../src/components/homepage/Homepage";
import { MemoryRouter } from "react-router";

//List of things to test for the Item component
// 1. Item displays image, title and price
// 2. Item increment button increases the quantity value
// 3. Item decrement button decreases the quantity value
// 4. item quantity cannot decrement below zero
// 5. clicking add to cart will add the correct number of cart items//
