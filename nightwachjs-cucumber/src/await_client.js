Given(/^I open Google's search page$/, async () => {
    await client
    .url('http://google.com')
    .waitForElementVisible('body', 1000);
});