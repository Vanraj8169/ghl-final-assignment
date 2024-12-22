export const Locators = {
    emailInput: '//input[@id="email"]',
    passwordInput: '//input[@id="password"]',
    signInBtn: "//button[normalize-space(text())='Sign in']",
    allMenus: "//span[contains(concat(' ', normalize-space(@class), ' '), ' nav-title ') and contains(concat(' ', normalize-space(@class), ' '), ' hl_text-overflow ')]",
    settingsBtn: '//a[@href="/settings/profile"]',
    billingsBtn: '//a[@href="/settings/billing"]',
    testLAccount: '//div[@class="multiple-users--row"][1]',
    notificationBtn: '//div[@data-name="notifications"]',
    notificationUsageTxt: "(//div[contains(@class,'mb-2 flex')]//div)[2]",
    globalLimit: "//div[@class='p-6 hl-card']",
    toggleBtn: "//div[@role='switch']",
    switchBtn: '//div[@class="n-switch__button"]',
    disableNotificationDialogBox: "//div[contains(@class,'n-card n-modal')]",
    disableBtn: "//span[text()='Disable']",

}