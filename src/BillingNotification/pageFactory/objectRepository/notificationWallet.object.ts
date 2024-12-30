import { agencyOwnerEmail, notificationWalletUsageText } from "../../testData/notificationWallet.data";

export const notificationWalletObject = {
    notificationBtn: '//div[@data-name="notifications"]',
    notificationUsageTxt: "(//div[contains(@class,'mb-2 flex')]//div)[2]",
    globalLimit: "//div[text()='Global Limit']",
    toggleBtn: "//div[@role='switch']",
    switchBtn: '//div[@class="n-switch__button"]',
    disableNotificationDialogBox: "//div[contains(@class,'n-card n-modal')]",
    disableBtn: "//span[text()='Disable']",
    walletNotificationSection: "#wallet-notifications-page",
    emailNotificationUsageText: `//div[text()=${notificationWalletUsageText}]`,
    walletInput: "//input[@placeholder='Please Input']",
    saveBtn: '//button[@id="save-btn"]',
    editBtn: "(//button[@linkgray='false'])[3]",
    agencyOwnerEmail: `//div[normalize-space(text())="${agencyOwnerEmail}"]`,
    notifyEmailAddressDialogBox: "//div[contains(@class,'n-card n-modal')]",
    inputEmail: '//div[@class="n-base-selection-tags"]',
    notifyEmailAddressDescription:'//div[@class="description"]',
    cancelBtn: '//div[@class="action"]',
    addEmailBtn: '//button[@id="modal-footer-btn-positive-action"]',
    addUsersInput: '//input[@class="n-base-selection-input-tag__input"]',
    addNewEmailBtn: '//button[@id="add-new-email"]',
    only5EmailUserText: "//div[contains(@class,'text-grey-500 m-2')]",
    cancelUserEmail: '(//button[@aria-label="close"])[6]',
    alreadyPresentEmails: "//div[@class='n-base-selection-tag-wrapper']",
    addedEmailPresence: '//div[text()="{email}"]'
}
