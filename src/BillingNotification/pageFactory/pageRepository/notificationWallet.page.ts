import { expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { notificationWalletObject } from "../objectRepository/notificationWallet.object";
import {
  notifyEmailAddressText,
  testEmails,
} from "../../testData/notificationWallet.data";

export class NotificationWallet {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async verifyDialogBox(locator: string) {
    const disableNotificationDialogBox = this.page.locator(locator);
    expect(
      disableNotificationDialogBox,
      "Checking whether Dialog box is visible"
    ).toBeVisible();
  }

  async verifyingToggleFunctionality() {
    const toggleBtn = this.page.locator(notificationWalletObject.toggleBtn);

    const isToggleOn = (await toggleBtn.getAttribute("aria-checked")) == "true";

    if (isToggleOn) {
      // Turn off the toggle
      await toggleBtn.click();

      // Verify the 'Disable Notification' dialog box appears
      this.verifyDialogBox(
        notificationWalletObject.disableNotificationDialogBox
      );

      // Click the disable button in the dialog box
      await this.page.locator(notificationWalletObject.disableBtn).click();

      await this.page.waitForSelector(notificationWalletObject.toggleBtn, {
        state: "visible",
      });
      // Verify the toggle is now turned off
      expect(
        toggleBtn,
        "Checking whether toggle is turned off"
      ).toHaveAttribute("aria-checked", "false");
    } else {
      // Turn on the toggle
      await toggleBtn.click();

      // Verify the toggle is now turned on
      expect(toggleBtn, "Checking whether toggle is turned on").toHaveAttribute(
        "aria-checked",
        "true"
      );
    }
  }

  async validateSaveButtonState(value: string): Promise<void> {
    await this.page.fill(notificationWalletObject.walletInput, value);

    if (
      value == "" ||
      isNaN(Number(value)) ||
      value == "0" ||
      Number(value) < 0
    ) {
      expect(
        this.page.locator(notificationWalletObject.saveBtn),
        `Checking whether save button is disabled for input: "${value}"`
      ).toHaveAttribute("tabindex", "-1");
    } else if (Number(value) > 0) {
      expect(
        this.page.locator(notificationWalletObject.saveBtn),
        `Checking whether save button is enabled for input: "${value}"`
      ).toHaveAttribute("tabindex", "0");
    } else {
      throw new Error(
        `Unexpected input value: "${value}". Unable to determine expected behavior.`
      );
    }
  }
  async verifyingEmailNotificationForWalletUsage() {
    const toggleBtn = this.page.locator(notificationWalletObject.toggleBtn);
    if ((await toggleBtn.getAttribute("aria-checked")) === "false") {
      await toggleBtn.click();
    }
    await this.validateSaveButtonState("");
    await this.validateSaveButtonState("abc");
    await this.validateSaveButtonState("0");
    await this.validateSaveButtonState("-5");
    await this.validateSaveButtonState("10");
  }

  async addEmail() {
    const email = faker.internet.email();
    testEmails.push(email);
    await this.page.locator(notificationWalletObject.inputEmail).click();
    await this.page.fill(notificationWalletObject.addUsersInput, email);
    await this.page.locator(notificationWalletObject.addNewEmailBtn).click();
  }
  async verifyAndAddNotifiedEmailAddresses() {
    // Click on the add email address icon
    await this.page.locator(notificationWalletObject.editBtn).click();

    // Verify if the "Notify Email Address" dialog box is visible
    this.verifyDialogBox(notificationWalletObject.notifyEmailAddressDialogBox);

    // Verify if the description is visible: "You can add up to 5 email addresses to get notified about wallet usage."
    expect(
      this.page.locator(notificationWalletObject.notifyEmailAddressDescription),
      "Checking whether the notify email address description is visible"
    ).toHaveText(notifyEmailAddressText);

    // Verify if the cancel button is visible
    expect(
      this.page.locator(notificationWalletObject.cancelBtn),
      "Checking whether the cancel button is visible"
    ).toBeVisible();

    // Verify if the add email button is visible
    expect(
      this.page.locator(notificationWalletObject.addEmailBtn),
      "Checking whether the Add Email button is visible"
    ).toBeVisible();

    const existingEmailCount = await this.page
      .locator(notificationWalletObject.alreadyPresentEmails)
      .count();
    console.log(existingEmailCount);
    let remainingEmailsToAdd = 5 - existingEmailCount;

    while (remainingEmailsToAdd > 0) {
      await this.addEmail();
      --remainingEmailsToAdd;
    }

    // Verify if the add email button is disabled when more than 5 emails are added
    await this.addEmail();
    expect(
      this.page.locator(notificationWalletObject.addEmailBtn),
      "Checking whether the add email button is disabled when more than 5 users are added"
    ).toHaveAttribute("tabindex", "-1");

    await this.page.locator(notificationWalletObject.cancelUserEmail).click();

    // Click on add email button for the 6th email
    await this.page.locator(notificationWalletObject.addEmailBtn).click();

    // Verify if all added emails are present
    for (let i = 0; i < testEmails.length - 1; i++) {
      const addedEmailLocator =
        notificationWalletObject.addedEmailPresence.replace(
          "{email}",
          testEmails[i]
        );
      console.log(addedEmailLocator);
      expect(this.page.locator(addedEmailLocator),"Checking whether email match with the added one's").toBeVisible();
    }
  }
}
