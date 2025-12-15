module.exports = {
    default: {
        formatOptions: {
            resultsDir: "allure-results",
            snippetInterface: "async-await"
        },
        paths: [
            "src/tests/features/"
        ],
        publishQuiet: true,
        dryRun: false,
        require: [
            "src/tests/steps/*.ts",
            "src/hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress",
            "./allureReporter.js"
        ]
     }
}