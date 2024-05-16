import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:3000";

// test case for user sign in
test("should allow user to sign in", async ({ page }) => {
  // navigate to the url
  await page.goto(UI_URL);

  // click on sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  // expect the page to have a specific heading - identification
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // fill the form fields
  await page.locator("[name=email]").fill("kurori.test@gmail.com");
  await page.locator("[name=password]").fill("Test@123");

  // click on login button
  await page.getByRole("button", { name: "Login" }).click();

  // expect the page to have the success message - identification
  await expect(page.getByText("Sign in Successful!")).toBeVisible();

  // check if other relevant links and buttons are visible
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

// test case for user registration
test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;

  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("Test@123");
  await page.locator("[name=confirmPassword]").fill("Test@123");

  await page.getByRole("button", { name: "Create Account" }).click();
  await expect(page.getByText("Registration Success!")).toBeVisible();

  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
