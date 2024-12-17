class LoginPage {
    constructor(page) {
      this.page = page;
      
      // Locators
      this.usernameInput = 'input[name="username"]';
      this.passwordInput = 'input[name="password"]';
      this.loginButton = 'button[type="submit"]';
      this.errorMessage = '.oxd-alert-content-text';
      this.dashboardHeader = 'h6.oxd-topbar-header-breadcrumb-module';
    }
  
    // Navigate to login page
    async navigate() {
      await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
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
  
    // Check if login form is visible
    async isLoginFormVisible() {
      return await this.page.locator(this.usernameInput).isVisible();
    }
  
    // Get error message
    async getErrorMessage() {
      return await this.page.locator(this.errorMessage).textContent();
    }
  }
  
  module.exports = LoginPage;