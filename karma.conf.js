module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        browsers: ['ChromeHeadless'], // You can add more browsers if needed
        plugins: [
            require('karma-chrome-launcher'),
            require('karma-jasmine'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false // Leave Jasmine Spec Runner output visible in browser
        },
        coverageReporter: {
            dir: require('path').join(__dirname, './coverage'),
            subdir: '.',
            reporters: [
                { type: 'html' },
                { type: 'text-summary' }
            ]
        },
        angularCli: {
            environment: 'dev'
        },
        reporters: ['progress', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false,
        restartOnFileChange: true
    });
};
