import { expect, Locator, Page } from "@playwright/test";
import { notificationWalletObject } from "../objectRepository/notificationWallet.object";

export class NotificationWallet {
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

  async verifyDisableNotificationDialogBox() {
    const disableNotificationDialogBox = this.page.locator(
      notificationWalletObject.disableNotificationDialogBox
    );
    await expect(disableNotificationDialogBox).toBeVisible();
  }

  async verifyToggle(locator: Locator, value: string) {
    await expect(locator).toHaveAttribute("aria-checked", value);
  }

  async verifyingToggleFunctionality() {
    const toggleBtn = this.page.locator(notificationWalletObject.toggleBtn);

    const isToggleOn = (await toggleBtn.getAttribute("aria-checked")) == "true";

    if (isToggleOn) {
      // Turn off the toggle
      await toggleBtn.click();

      // Verify the 'Disable Notification' dialog box appears
      this.verifyDisableNotificationDialogBox();

      // Click the disable button in the dialog box
      await this.interactWithElement(
        "click",
        notificationWalletObject.disableBtn
      );

      // Verify the toggle is now turned off
      await expect(toggleBtn).toHaveAttribute("aria-checked", "false");
    } else {
      // Turn on the toggle
      await toggleBtn.click();

      // Verify the toggle is now turned on
      await expect(toggleBtn).toHaveAttribute("aria-checked", "true");
    }
  }
}
