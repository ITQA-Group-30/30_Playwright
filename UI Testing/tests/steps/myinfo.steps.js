const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const MyInfoPage = require('../../src/pages/MyInfoPage');

Given('I am on the my info page', async function() {
    const myInfoPage = new MyInfoPage(this.page, this.baseURL);
    await myInfoPage.navigate('pim/viewPersonalDetails/empNumber/7');
    await this.page.waitForLoadState('networkidle');
    this.myInfoPage = myInfoPage;
});

Then('I should see my personal details', async function() {
    const isVisible = await this.myInfoPage.isPersonalDetailsVisible();
    expect(isVisible).toBeTruthy();
});