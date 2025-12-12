import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFix } from '../../hooks/pageFix';


Given('User Login Username as {string} and Password as {string}', async function (username, password) {    
    console.log("User navigating to the application");
    await pageFix.page.goto("https://www.saucedemo.com/");
    //Enter credentials and login
    await pageFix.page.locator("input[placeholder='Username']").fill(username);
    console.log("Username: " + username);
    await pageFix.page.locator("input[placeholder='Password']").fill(password);
    console.log("Password: " + password);
    await pageFix.page.locator("input.submit-button.btn_action").click();
    console.log("Login button clicked");

});

Given('Should open {string} screen', async function (screenName: string) {
    const page = pageFix.page; // your global page
    const Lscreen = screenName.toLowerCase();

    // Get current URL
    const currentUrl = pageFix.page.url();

    // Extract page name from URL
    const pageName = currentUrl.substring(currentUrl.lastIndexOf("/") + 1)
        .replace(".html", "")
        .toLowerCase();

    // Screen verification
    if (Lscreen === pageName) {
        console.log(`✅ Screen "${screenName}" opened.`);
    } else {
        throw new Error(`❌ Verification failed: Expected "${Lscreen}" but found "${pageName}"`);
    }
});

When('User add all items to cart', async function () {
    await pageFix.page.locator("button[data-test='add-to-cart-sauce-labs-backpack']").click();
    await pageFix.page.locator("button[data-test='add-to-cart-sauce-labs-bike-light']").click();
    await pageFix.page.locator("button[data-test='add-to-cart-sauce-labs-bolt-t-shirt']").click();
    await pageFix.page.locator("button[data-test='add-to-cart-sauce-labs-fleece-jacket']").click();
    await pageFix.page.locator("button[data-test='add-to-cart-sauce-labs-onesie']").click();
    await pageFix.page.locator("button[data-test='add-to-cart-test.allthethings()-t-shirt-(red)']").click();
});

// MAPPING - buttonSelectors will indicate what button will be clicked

const buttonSelectors = {
  "Shopping Cart"  : "a[data-test='shopping-cart-link']",
  "Login"          : "[data-test='login-button']",
  "Checkout"       : '[data-test="checkout"]',
  "Continue"       : "[data-test='continue']",
  "Finish"         : "[data-test='finish']",
  "Back Home"      : "[data-test='back-to-products']"
};
// ----------------------------------

When('User click {string} button', async function (buttonName: keyof typeof buttonSelectors) {
    await pageFix.page.waitForTimeout(1000);
    const selector = buttonSelectors[buttonName];
    await pageFix.page.locator(selector).click();
    console.log("The button " + buttonName + " is clicked.")
});

Then('Should verify the order confirmation', async function () {
    //await pageFix.page.locator(".complete-header").textContent();
    const isVisible = await pageFix.page.locator('text=Thank you for your order!').isVisible();
        if (isVisible) {
         console.log("Order placed successfully!");
        } else {
        console.log("Expected success message not found.");
        }
});

When('User remove the third item from the cart', async function () {
    await pageFix.page.locator("button[data-test='remove-sauce-labs-bolt-t-shirt']").click();
    console.log("Removed 3rd item")
});


When('User set data in {string}', async function (pageName, dataTable) {
    const data = dataTable.rowsHash();

    for (const field in data) {
        await pageFix.page.locator(`input[data-test='${field}']`).fill(data[field]);
    }
});

Then('Should verify {string} details', async function (getCartQuantities) {
    const cartItems = await pageFix.page.locator('.cart_item').all();

for (const item of cartItems) {
    const name = await item.locator('[data-test="inventory-item-name"]').innerText();
    const qty = await item.locator('.cart_quantity').innerText();

    console.log(`Item: ${name} | Quantity: ${qty}`);
}
});

//===================== TS-02 Add to Cart ============================================

When('User selected one item', async function () {
    // Get all product name elements
    const itemNames = pageFix.page.locator('.inventory_item_name');
    const count = await itemNames.count();

    // Pick a random index
    const randomIndex = Math.floor(Math.random() * count);

    // Get the text of the randomly selected item
    const selected = await itemNames.nth(randomIndex).textContent();
    this.selectedItemName = selected?.trim();
    console.log("Selected item:", this.selectedItemName);
});

When('User add item to cart', async function () {
    const item = pageFix.page.locator(".inventory_item").filter({
        has: pageFix.page.locator(".inventory_item_name", { hasText: this.selectedItemName })
    });

    await item.locator("button").click();
    console.log("Added to cart:", this.selectedItemName);
});

Then('Should verify item details', async function () {
    const cartItems = pageFix.page.locator('.cart_item .inventory_item_name');
    const count = await cartItems.count();
    await pageFix.page.waitForTimeout(1000);
    let found = false;

    for (let i = 0; i < count; i++) {
        const name = (await cartItems.nth(i).textContent())?.trim();

        console.log("Cart item found:", name);

        if (name?.toLowerCase() === this.selectedItemName?.toLowerCase()) {
            found = true;
            break;
        }
    }

    if (!found) {
        throw new Error(`Item "${this.selectedItemName}" was NOT found in the cart`);
    }

    console.log(`Verified item in cart: ${this.selectedItemName}`);
});

//===================== TS-03 Sort items ============================================

When('User Sort products by name', async function () {
    // Get all product names BEFORE sorting
    const namesBefore = await pageFix.page.$$eval('.inventory_item_name', items =>
        items.map(el => el.textContent!.trim())
    );

    console.log("Products BEFORE sorting:");
    console.table(namesBefore);

    const page = this.page;

    // Ensure dropdown is ready
    const dropdown = pageFix.page.locator(".product_sort_container");
    await dropdown.waitFor({ state: "visible" });

    // Explicitly wait a bit to avoid UI transition glitches
    await pageFix.page.waitForTimeout(300);

    // Select Z to A
    await dropdown.selectOption("za");
    console.log("Products sorted successfully");
});

Then('Should verify sorted items', async function () {
    const page = this.page;
    const itemNames = pageFix.page.locator(".inventory_item_name");
    const count = await itemNames.count();

    let names: string[] = [];

    for (let i = 0; i < count; i++) {
        names.push((await itemNames.nth(i).textContent())!.trim());
    }

    // Create a copy and sort it manually in Z→A order
    const sorted = [...names].sort((a, b) => b.localeCompare(a));

    expect(names).toEqual(sorted);

    // Get all product names AFTER sorting
    const namesAfter = await pageFix.page.$$eval('.inventory_item_name', items =>
        items.map(el => el.textContent!.trim())
    );

    console.log("Products AFTER sorting (Z → A):");
    console.table(namesAfter);

});

Then('User should see login error', async function () {
    const page = pageFix.page; // your global page

    // Locate the login error element
    const loginError = pageFix.page.locator('[data-test="error"]');

    // Check if it is visible
    const isVisible = await loginError.isVisible().catch(() => false);

    if (!isVisible) {
        throw new Error('Login error message is not displayed on the page');
    }

    // Get the error text
    const errorMessage = (await loginError.textContent())?.trim();

    console.log(`Login error displayed: "${errorMessage}"`);
});