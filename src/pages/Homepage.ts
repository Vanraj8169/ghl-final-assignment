import { Page } from "@playwright/test";
import { Locators } from "../locators/common";
import { generateRandomDateForMonth } from "../utils/common";

export class HomePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  // Utility method to click on an element
  private async clickElement(locator: string): Promise<void> {
    await this.page.locator(locator).click();
  }

  

  // Selects a date and time slot
  async selectDateAndTimeSlot(): Promise<void> {
    await this.page.waitForLoadState();
    const randomMonth:number = Math.floor(Math.random()*12);
    
    for(let i=1;i<=randomMonth+1;i++){
        await this.clickElement(Locators.NextBtn);
        await this.page.waitForTimeout(1000);
    }

    // Generate a random valid date
    const randomDate: string = generateRandomDateForMonth(randomMonth+1);


    // Click the randomly selected date
    await this.clickElement(
      `//td[@data-id="${randomDate}"]`
    );
    await this.page.waitForTimeout(4000);
   
    // Click on a specific time slot (example: #pm2)
    const amOptions = await this.page.locator('#pick-hours--am .hour-select').count();
    const pmOptions = await this.page.locator('#pick-hours--pm .hour-select').count();

    if (amOptions > 0) {
        await this.clickElement(`#am${Math.floor(Math.random()*amOptions)}`)
    } else if (pmOptions > 0) {
        await this.clickElement(`#pm${Math.floor(Math.random()*pmOptions)}`);
    }
  
    // Click on the "Select Date" button
    await this.clickElement(Locators.selectDateBtn);
  }

  //Modifying Timezone
  async modifyTimezone():Promise<void> {
    await this.page.waitForTimeout(4000);
    await this.clickElement(Locators.MultiSelect);
    await this.page.waitForTimeout(4000);
    await this.clickElement(`//li[@class="multiselect__element" and @role="option" and @id="null-${Math.floor(Math.random()*109)}"]`);
  }
}
