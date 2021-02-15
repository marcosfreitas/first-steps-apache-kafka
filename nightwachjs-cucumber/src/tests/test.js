/*
teste com problema de selenium.server_path
const {
    createSession,
    closeSession,
    startWebDriver,
    stopWebDriver,
    client
} = require('nightwatch-api');

async function setup(env = 'default') {
await startWebDriver({ env });
await createSession({ env });
}

async function shutdown() {
    await closeSession();
    await stopWebDriver();
}

async function run() {
    await client.url('https://duckduckgo.com/');
    let title;
    await client.getTitle(t => (title = t));
    console.log(title);
}

(async function() {
    try {
        await setup('default');
        await run();
    } catch (err) {
        console.log(err.stack);
    } finally {
        await shutdown();
    }
})();*/

module.exports = {
    'generic_test': browser => {
        console.log('browser.test_object', browser.test_object);
        browser
        .url('https://google.com')
        .pause(1000);
        browser.expect.element('body').to.be.present;
        browser.end();
    }
};