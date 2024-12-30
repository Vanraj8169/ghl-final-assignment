import { Page } from "@playwright/test";
import { loginObject } from "../objectRepository/login.object";
import { homePageData } from "../../testData/notificationWallet.data";

export class Login {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async signInAndNavigateToDashboard(username: string, password: string) {
    await this.page.fill(loginObject.emailInput, username);
    await this.page.fill(loginObject.passwordInput, password);

    await this.page.locator(loginObject.signInBtn).click();
    await this.page.locator(loginObject.testLAccount).click();

    await this.page.waitForURL(homePageData.agencyDashboardUrl);
  }
}
