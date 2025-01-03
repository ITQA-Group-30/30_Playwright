const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BuzzPage = require('../../src/pages/BuzzPage');
const config = require('../../src/utils/config');

let buzzPage;

Given('I am on the Buzz page', async function () {
    await this.page.goto(config.BASE_URL + config.ROUTES.BUZZ);
    buzzPage = new BuzzPage(this.page);
});

When('I create a new post with {string}', async function (postText) {
    await this.page.getByPlaceholder('What\'s on your mind?').waitFor({ state: 'visible' });
    await this.page.getByPlaceholder('What\'s on your mind?').fill(postText);
});

When('I click the "Post" button', async function () {
    console.log('Waiting for and clicking the "Post" button...');
    await this.page.getByRole('button', { name: 'Post', exact: true }).waitFor({ state: 'visible' });
    await this.page.getByRole('button', { name: 'Post', exact: true }).click();
});








// Then('the new post should be added successfully', { timeout: 10000 }, async function() {
//     const successMessage = await this.page.locator('text=new post added successfully');
//     await successMessage.waitFor({ state: 'visible', timeout: 10000 });
//     if (!await successMessage.isVisible()) {
//         throw new Error('New post was not added successfully');
//     }
// }); //Then the new post should be added successfully


// const { Given, When, Then } = require('@cucumber/cucumber');
// const { expect } = require('@playwright/test');
// const config = require('../../src/utils/config');

// Given('I am on the Buzz page', async function () {
//     await this.page.goto(`${config.BASE_URL}buzz/viewBuzz`);
// });

// When('I create a new post with {string}', async function (postText) {
//     await this.page.getByRole('link', { name: 'Buzz' }).click();
//     await this.page.getByPlaceholder('What\'s on your mind?').waitFor({ state: 'visible' });
//     await this.page.getByPlaceholder('What\'s on your mind?').fill(postText);
// });

// When('I click the "Post" button', async function () {
//     await this.page.getByRole('button', { name: 'Post', exact: true }).waitFor({ state: 'visible' });
//     await this.page.getByRole('button', { name: 'Post', exact: true }).click();
// });

