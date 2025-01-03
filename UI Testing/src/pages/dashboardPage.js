const BasePage = require('./BasePage');

class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async navigateToDashboard() {
        await this.navigate('/index.php/dashboard/index');
    }
}

module.exports = DashboardPage;
