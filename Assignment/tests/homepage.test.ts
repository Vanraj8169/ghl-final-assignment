import test, { expect, Page } from "@playwright/test";
import { Locators } from "../locators/locators";

test.describe("Validating the billing tab and toggle functionality", async () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    await test.step("Setup: Open a new page and navigate to the site", async () => {
      const context = await browser.newContext();
      page = await context.newPage();
      await page.goto("https://staging.gohighlevel.com");
    });
  });

  test("Entering email and password", async () => {
    await test.step("Wait for the page to load", async () => {
      await page.waitForLoadState();
    });

    await test.step("Enter credentials", async () => {
      await page.fill(Locators.emailInput, process.env.USERNAME!);
      await page.fill(Locators.passwordInput, process.env.PASSWORD!);
    });

    await test.step("Sign in and navigate to the dashboard", async () => {
      await page.locator(Locators.signInBtn).click();
      await page.locator(Locators.testLAccount).click();
      await page.waitForURL("https://staging.gohighlevel.com/agency_dashboard/");
    });
  });

  test("Fetching all menus", async () => {
    await test.step("Retrieve and log all menu items", async () => {
      const menusLocator = await page.locator(Locators.allMenus);
      const menus = await menusLocator.allTextContents();
      console.log(`Menus: ${menus}`);
    });
  });

  test("Navigating to the Agency Billing Dashboard", async () => {
    await test.step("Open settings menu and select Billing", async () => {
      await page.locator(Locators.settingsBtn).click();
      await page.locator(Locators.billingsBtn).click();
      await page.locator(Locators.notificationBtn).click();
    });

    await test.step("Verify Notifications Page", async () => {
      await expect(page.locator("#wallet-notifications-page")).toBeVisible();
      await expect(page.locator(Locators.globalLimit)).toBeVisible();
      await expect(page.locator(Locators.notificationUsageTxt)).toHaveText("Set up usage notifications to effectively manage your agency wallet spending");
    });
  });

  test("Verify toggle functionality", async () => {
    const toggleBtn = page.locator(Locators.toggleBtn);
  
    await test.step("Turn off the toggle and verify", async () => {
      // Verify the toggle is initially turned on
      await expect(toggleBtn).toHaveAttribute("aria-checked", "true");
  
      // Turn off the toggle
      await toggleBtn.click();
  
      // Verify the 'Disable Notification' dialog box appears
      const disableNotificationDialogBox = page.locator(Locators.disableNotificationDialogBox);
      await expect(disableNotificationDialogBox).toBeVisible();
  
      // Click the disable button in the dialog box
      await page.locator(Locators.disableBtn).click();
  
      // Verify the toggle is now turned off
      await expect(toggleBtn).toHaveAttribute("aria-checked", "false");
    });
  
    await test.step("Turn on the toggle and verify", async () => {
      // Turn on the toggle
      await toggleBtn.click();
  
      // Verify the toggle is now turned on
      await expect(toggleBtn).toHaveAttribute("aria-checked", "true");
    });
  });
  
});
