class LoginPage {
    constructor(page) {
      this.page = page;
      
      // Locators
      this.usernameInput = '#user-name';
      this.passwordInput = '#password';
      this.loginButton = '#login-button';
      this.errorMessage = '[data-test="error"]';
    }
  
    // Navigate to the login page
    async navigate() {
      await this.page.goto('https://www.saucedemo.com/');
    }
  
    // Enter username
    async enterUsername(username) {
      await this.page.locator(this.usernameInput).fill(username);
    }
  
    // Enter password
    async enterPassword(password) {
      await this.page.locator(this.passwordInput).fill(password);
    }
  
    // Click login button
    async clickLoginButton() {
      await this.page.locator(this.loginButton).click();
    }
  
    // Perform login
    async login(username, password) {
      await this.navigate();
      await this.enterUsername(username);
      await this.enterPassword(password);
      await this.clickLoginButton();
    }
  
    // Check if error message is visible
    async isErrorMessageVisible() {
      return await this.page.locator(this.errorMessage).isVisible();
    }
  
    // Get error message text
    async getErrorMessageText() {
      return await this.page.locator(this.errorMessage).textContent();
    }
  }
  
  module.exports = LoginPage;