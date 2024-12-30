import test, { Page } from "@playwright/test";
import { homePageData } from "../testData/notificationWallet.data";
import { Login } from "../pageFactory/pageRepository/login.page";
import { Home } from "../pageFactory/pageRepository/home.page";
import { NotificationWallet } from "../pageFactory/pageRepository/notificationWallet.page";

test.describe("Validating the billing tab and toggle functionality", async () => {
  let page: Page;
  let loginPage: Login;
  let homePage: Home;
  let notificationWalletPage: NotificationWallet;
  test.beforeAll(async ({ browser }) => {
    await test.step("Setup: Open a new page and navigate to the site", async () => {
      page = await browser.newPage();
      loginPage = new Login(page);
      homePage = new Home(page);
      notificationWalletPage = new NotificationWallet(page);
      await page.goto(homePageData.loginPageUrl);
    });
  });

  test("Entering email and password", async () => {
    await loginPage.signInAndNavigateToDashboard(
      process.env.USERNAME!,
      process.env.PASSWORD!
    );
  });

  test("Fetching all menus", async () => {
    await homePage.fetchAllMenus();
  });

  test("Navigating to the Agency Billing Dashboard", async () => {
    await homePage.navigateToAgencyBillingDashboard();
  });

  test("Verify toggle functionality", async () => {
    await notificationWalletPage.verifyingToggleFunctionality();
  });

  test("Verifying Email Notification for wallet usage", async () => {
    await notificationWalletPage.verifyingEmailNotificationForWalletUsage();
  });

  test("Verifying Notify Email address section", async () => {
    await notificationWalletPage.verifyAndAddNotifiedEmailAddresses();
  });
});
