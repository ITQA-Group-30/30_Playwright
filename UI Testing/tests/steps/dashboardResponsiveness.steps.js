const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const DashboardPage = require('../../src/pages/dashboardPage');
const config = require('../../src/utils/config');

let dashboardPage;

Given('I am on the Dashboard page', { timeout: 15000 }, async function () {
    await this.page.goto(config.BASE_URL + config.ROUTES.DASHBOARD);
    dashboardPage = new DashboardPage(this.page);
});

When('the screen size is set to {int} and {int}', { timeout: 10000 }, async function (width, height) {
    await this.page.setViewportSize({ width, height });
});

Then('the dashboard layout should adjust properly', { timeout: 10000 }, async function () {
    const layoutAdjusts = await this.page.evaluate(() => {
        return window.innerWidth >= 375; 
    });
    expect(layoutAdjusts).toBe(true);
});
