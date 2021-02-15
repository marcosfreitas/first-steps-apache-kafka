const express = require('express');
const app = express();
const Nightwatch = require('nightwatch');

app.get('/', (req, res) => {
    Nightwatch.cli(async function() {
        const runner = Nightwatch.CliRunner({
          _source: ['tests/test.js'],
        });
        await runner.setup({
          'selenium' : {
            start_process: false,
            'host': 'standalone-chrome',
            cli_args: {
              'webdriver.chrome.driver': require('chromedriver').path
            }
          },
          desiredCapabilities: {
            browserName: 'chrome',
            javascriptEnabled: true,
            chromeOptions : {
              w3c: false
            },
          },
          //'testObject': message.value, -- passagem de dados para os testes
        }).startWebDriver();

        try {
          await runner.runTests();
          const testData = runner.testRunner.globalReporter.globalResults.modules.test.completed.test_generic;
          const results = testData.assertions;
          console.log('[result] = ', testData, results);
        } catch (err) {
          console.error('An error occurred:', err);
        }

        await runner.stopWebDriver();
    });

});

app.listen(3000, () => {
    console.log('Server started at 3000');
});