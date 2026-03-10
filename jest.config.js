module.exports = {
  maxWorkers: process.env.CI ? 1 : "50%",
  testTimeout: 30000,
  

reporters: [
  "default",
  ["jest-html-reporters", {
    publicPath: "./test-output",
    filename: "report.html",
    darkTheme: true,
    openReport: process.env.CI ? false : true,
    expand: true,             
    inlineSource: true,       
    includeConsoleLog: true,  
    pageTitle: "Automation Report"
  }]
],

  projects: [
    {
      displayName: 'API-TESTS',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ["<rootDir>/apps/tests/api/**/*.test.ts"],
      moduleNameMapper: {
        '^@test-config$': '<rootDir>/apps/tests/test-config',
        '^@test/(.*)$': '<rootDir>/packages/src/$1'
      }
    },

    {
      displayName: 'UI-TESTS',
      preset: 'jest-playwright-preset',
      moduleFileExtensions: ['ts', 'js', 'json', 'node'],
      testEnvironmentOptions: {
      'jest-playwright': {
      browsers: ['chromium'],
      launchOptions: {
        headless: false,
        slowMo: 3000
      },
      contextOptions: {
        recordVideo: {
          dir: 'test-output/videos/'
        }
      }
    }
  },
      testMatch: ["<rootDir>/apps/tests/web/**/*.test.ts"],
      transform: {
      '^.+\\.ts$': 'ts-jest'
      },
      moduleNameMapper: {
        '^@test-config$': '<rootDir>/apps/tests/test-config',
        '^@test/(.*)$': '<rootDir>/packages/src/$1'
      }
    }
  ]
};
