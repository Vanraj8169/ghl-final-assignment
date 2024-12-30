import { expect, Page } from "@playwright/test";
import { homePageObject } from "../objectRepository/homePage.object";
import { notificationWalletObject } from "../objectRepository/notificationWallet.object";
import { notificationWalletUsageText } from "../../testData/notificationWallet.data";

export class Home{
    readonly page: Page;
    constructor(page:Page){
        this.page =page;
    }

    async fetchAllMenus(){
        const menusLocator = this.page.locator(homePageObject.allMenus);
        const menus = await menusLocator.allTextContents();
        console.log(`Menus: ${menus}`);
    }

    async navigateToAgencyBillingDashboard(){
        await this.page.locator(homePageObject.settingsBtn).click();
        await this.page.locator(homePageObject.billingsBtn).click();
        await this.page.locator(notificationWalletObject.notificationBtn).click();
  
        expect(this.page.locator(notificationWalletObject.walletNotificationSection),'Checking whether notification wallet section is appearing').toBeVisible();
        await this.page.waitForSelector(notificationWalletObject.globalLimit,{state: 'visible'});
        expect(this.page.locator(notificationWalletObject.globalLimit),'Checking whether global limit text is appearing').toBeVisible();
        expect(this.page.locator(notificationWalletObject.notificationUsageTxt),'Checking whether notification wallet usage text is visible').toHaveText(notificationWalletUsageText);
    }
}
