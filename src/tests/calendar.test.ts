import test, { Page } from "@playwright/test";
import { HomePage } from "../pages/Homepage";
import { Appointment } from "../pages/Appointment";
import { ContactDetails } from "../utils/common";

test.describe("Automation test on calendar", () => {
  let page: Page;
  let homepage: HomePage;
  let appointmentPage: Appointment;
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    homepage = new HomePage(page);
    appointmentPage = new Appointment(page);
    await page.goto(process.env.URL!);
  });

  test("Modifying Timezone", async () => {
    await homepage.modifyTimezone();
  });

  test("Picking Date and Time", async () => {
    await homepage.selectDateAndTimeSlot();
  });

  test("Filling Appointment Form", async () => {
    await appointmentPage.bookAppointment(
      ContactDetails.FirstName,
      ContactDetails.LastName,
      ContactDetails.PhoneNo,
      ContactDetails.Email
    );
  });

  test("Verifying Appointment details", async () =>{
    await appointmentPage.verifyingAppointmentDetails();
  })

  test("Verifying Contact Details", async () => {
    await appointmentPage.verifyingContactDetails();
  })
});
