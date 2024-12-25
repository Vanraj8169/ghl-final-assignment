import { expect, Page } from "@playwright/test";
import { homePageObject } from "../objectRepository/homePage.object";
import { notificationWalletObject } from "../objectRepository/notificationWallet.object";
import { notificationWalletUsageText } from "../../testData/notificationWallet.data";

export class Home{
    readonly page: Page;
    constructor(page:Page){
        this.page =page;
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

    async fetchAllMenus(){
        const menusLocator = this.page.locator(homePageObject.allMenus);
        const menus = await menusLocator.allTextContents();
        console.log(`Menus: ${menus}`);
    }

    async navigateToAgencyBillingDashboard(){
        await this.interactWithElement("click",homePageObject.settingsBtn);
        await this.interactWithElement("click",homePageObject.billingsBtn);
        await this.interactWithElement("click",notificationWalletObject.notificationBtn);

        await expect(this.page.locator(notificationWalletObject.walletNotificationSection)).toBeVisible();
        await expect(this.page.locator(notificationWalletObject.globalLimit)).toBeVisible();
        await expect(this.page.locator(notificationWalletObject.notificationUsageTxt)).toHaveText(notificationWalletUsageText);
    }
}