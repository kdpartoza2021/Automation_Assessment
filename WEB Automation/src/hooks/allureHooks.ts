import { After, Status } from "@cucumber/cucumber";
import { pageFix } from "./pageFix";

After(async function (scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const screenshot = await pageFix.page.screenshot({ fullPage: true });
        this.attach(screenshot, "image/png");

        const html = await pageFix.page.content();
        this.attach(html, "text/html");
    }
});
