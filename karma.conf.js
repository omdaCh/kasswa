module.exports = function (config) {
    config.set({
        // ... other configurations ...

        browsers: ['ChromeHeadless'],

        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--no-sandbox',
                    '--headless',
                    '--disable-gpu',
                    '--remote-debugging-port=9222',
                    '--disable-dev-shm-usage'
                ]
            }
        },

        plugins: [
            require('karma-chrome-launcher'),
            require('karma-jasmine'),
            require('karma-typescript')
        ]
    });
};