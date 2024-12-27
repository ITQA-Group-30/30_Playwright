// tests/support/world.js
const { setWorldConstructor } = require('@cucumber/cucumber');
const { request } = require('@playwright/test');

class CustomWorld {
    constructor() {
        this.request = request;
    }
}

setWorldConstructor(CustomWorld);