import { Given, Then } from 'cucumber';
import { browser, $ } from 'protractor';
import { expect } from 'chai';

Given(/^I open the homepage$/, async (): Promise<void> => {
    await browser.get(browser.baseUrl);
    await ngApimock.selectScenario('get-heroes', 'heroes');
    await browser.get(browser.baseUrl);
});

Then(/^a hero is shown$/, { timeout: 10000 }, async (): Promise<void> => {
    expect(await $('.hero-card').isPresent()).to.be.true;
});