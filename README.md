# Automation_Assessment
WEB and API automation full instructions:

**Web Automation tests to implement**
Instructions:
Create a project folder (Automation_Assessment) and open in VSCode.

Run in terminal :
npm init playwright@latest
npm install -D @playwright/test@latest
npm install -g typescript
npm install --save-dev @cucumber/cucumber
npm install -D allure-cucumberjs
npm install --save-dev rimraf
npm install --save-dev allure-commandline

Transfer the files(src folder, cucumber, AllureReporter, package, package-lock, and tsconfig) 
from /Automation_Assessment-main/Automation_Assessment-main/WEB Automation
to Automation_Assessment folder

Run all by : 
npm test

Run specific scenario by : 
npm test -- --tags "@TS-03"

Generate Allure Report after the tests are executed:
allure generate ./allure-results -o ./allure-report

Open the generated report:
allure open ./allure-report



**API Automation tests to implement**
Instructions:
Create a project folder (Automation_Assessment_API) and open in VSCode.

Run in terminal :
npx playwright install
npm install -D @playwright/test

Transfer the files(tests folder, playwright.config, helpers)
from /Automation_Assessment-main/Automation_Assessment-main/API Automation
to Automation_Assessment_API folder

Run all tests:
npx playwright test

Show report:
npx playwright show-report
