const { Given, When, Then, setDefaultTimeout, Before, BeforeStep, BeforeAll, After, AfterAll, AfterStep } = require("@cucumber/cucumber");
const {chromium } = require('@playwright/test');

let browser;
let page;

Before(async()=>{
    console.log("before Hooks")
})

BeforeStep(async()=>{
    console.log("beforeStep Hooks")
})

BeforeAll(async()=>{
    console.log("beforeAll Hooks")
})

After(async()=>{
    console.log("After Hooks")
})

AfterAll(async()=>{
    console.log("AfterAll Hooks")
})

AfterStep(async()=>{
    console.log("AfterStep Hooks")
})

Given('providing valid url', async function(){
    browser = await chromium.launch({headless: false})
    page = await browser.newPage()
    setDefaultTimeout(10000)
    await page.goto("https://demo.guru99.com/test/newtours/")
})

When('providing valid username and passwrod', async function(){
    setDefaultTimeout(1000)
    await page.locator("//input[@name='userName']").fill('mercury')
    await page.locator("//input[@name='password']").fill('mercury')
})

Then('clicking login button', async function(){
    await page.locator("//input[@name='submit']").click()
    await page.close()
    await browser.close()
})

When('providing valid username as {string} and passwrod as {string}', async function(name, password){
    setDefaultTimeout(1000)
    await page.locator("//input[@name='userName']").fill(name)
    await page.locator("//input[@name='password']").fill(password)
})