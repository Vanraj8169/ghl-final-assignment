import { Page } from "@playwright/test";
import { loginObject } from "../objectRepository/login.object";
import { homePageData } from "../../testData/notificationWallet.data";

export class Login {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  // Below function is used to interact with element
  private async interactWithElement(
    action: "fill" | "click",
    locator: string,
    value?: string
  ) {
    const element = this.page.locator(locator);

    switch (action) {
      case "fill":
        if (value) await element.fill(value);
        break;
      case "click":
        await element.click();
        break;
    }
  }
  async signInAndNavigateToDashboard(username: string, password: string) {
    await this.interactWithElement("fill",loginObject.emailInput,username);
    await this.interactWithElement("fill",loginObject.passwordInput,password);

    await this.interactWithElement("click", loginObject.signInBtn);
    await this.interactWithElement("click",loginObject.testLAccount);
    await this.page.waitForURL(homePageData.agencyDashboardUrl);
  }
}
