import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login Tests", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test("Positive Login Test", async ({ page }) => {
    await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
    await expect(page).toHaveURL(/logged-in-successfully/);
    await expect(await loginPage.getSuccessMessage()).toContainText(
      "Logged In Successfully"
    );
  });

  test("Negative Login Test", async ({ page }) => {
    await loginPage.login("incorrectUser", "incorrectPassword");
    await expect(await loginPage.getErrorMessage()).toBeVisible();
    await expect(await loginPage.getErrorMessage()).toContainText(
      "Your username is invalid!"
    );
  });
});
