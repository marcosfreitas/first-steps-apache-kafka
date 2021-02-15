locateStrategy: async function (selector) { return await selector.startsWith('/') ? 'xpath' : 'css selector'; }
