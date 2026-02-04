module.exports = {
    testEnvironment: 'node', // Use the Node.js environment for testing
    testMatch: ['**/tests/**/*.test.js'], // Specify the test file pattern
    collectCoverage: true, // Enable code coverage collection
    coverageDirectory: 'coverage', // Output directory for coverage reports
    coverageThreshold: {
        global: {
            branches: 80, // Require at least 80% branch coverage
            functions: 80, // Require at least 80% function coverage
            lines: 80, // Require at least 80% line coverage
            statements: 80 // Require at least 80% statement coverage
        }
    },
    setupFilesAfterEnv: ['./jest.setup.js'], // Specify a setup file for configuring the testing environment
    globals: {
        'NODE_ENV': 'test' // Set the NODE_ENV to 'test' for test runs
    }
};
