class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = '#username';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
    }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }
}

module.exports = LoginPage;