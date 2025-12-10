export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.submitButton = page.locator("#submit");
    this.successMessage = page.locator(".post-title");
    this.errorMessage = page.locator("#error");
  }

  async navigate() {
    await this.page.goto("/practice-test-login/");
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getSuccessMessage() {
    return this.successMessage;
  }

  async getErrorMessage() {
    return this.errorMessage;
  }
}
