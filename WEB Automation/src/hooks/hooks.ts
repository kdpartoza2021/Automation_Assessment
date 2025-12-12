import { BeforeAll, AfterAll, Before } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "@playwright/test";
import { pageFix } from "./pageFix";  

let page: Page;
let browser: Browser;

// Launch browser before all scenarios
BeforeAll(async function() {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    pageFix.page = page;
});

let printedFeatures: Set<string> = new Set();

// Display feature description
Before(function ({gherkinDocument}) {
    const feature = gherkinDocument.feature;
    if (!feature) return;

    const featureName = feature.name;

    // Avoid duplicate prints
    if (printedFeatures.has(featureName)) return;
    printedFeatures.add(featureName);

    console.log(`\n=== FEATURE: ${featureName} ===\n`);
});

// AfterAll hook to close the browser
AfterAll(async function() {
    if (browser) {
        await browser.close();
        await page.close();
        console.log("Browser closed after all scenarios\n");
    }
});