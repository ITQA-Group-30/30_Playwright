class DashboardPage {
    constructor(page) {
      this.page = page;
      
      // Locators
      this.productTitle = '.title';
      this.productItems = '.inventory-item';
      this.shoppingCart = '#shopping_cart_container';
      this.menuButton = '#react-burger-menu-btn';
      this.logoutLink = '#logout_sidebar_link';
    }
  
    // Check if dashboard is loaded
    async isDashboardVisible() {
      return await this.page.locator(this.productTitle).isVisible();
    }
  
    // Get number of products
    async getProductCount() {
      return await this.page.locator(this.productItems).count();
    }
  
    // Open shopping cart
    async openShoppingCart() {
      await this.page.locator(this.shoppingCart).click();
    }
  
    // Logout method
    async logout() {
      await this.page.locator(this.menuButton).click();
      await this.page.locator(this.logoutLink).click();
    }
  }
  
  module.exports = DashboardPage;