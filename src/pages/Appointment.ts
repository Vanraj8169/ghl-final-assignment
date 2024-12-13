import { expect, Page } from "@playwright/test";
import { Locators } from "../locators/common";
import { ContactDetails, matchAppointments } from "../utils/common";

interface AppointmentResponseBody {
  id: string;
  appointment: {
    start_time: string;
    end_time: string;
    timezone: string;
  };
}

interface AppointmentDetails {
  startTime: string;
  endTime: string;
}

interface ApiRequestOptions {
  method: string;
  headers: {
    [key: string]: string;
  };
}

export class Appointment {
  private readonly page: Page;
  private responseBody: AppointmentResponseBody | null = null;
  private contactID: string = '';

  constructor(page: Page) {
    this.page = page;
  }


  private async interactWithElement(
    action: 'fill' | 'click', 
    locator: string, 
    value?: string
  ): Promise<void> {
    const element = this.page.locator(locator);
    
    switch (action) {
      case 'fill':
        if (value) await element.fill(value);
        break;
      case 'click':
        await element.click();
        break;
    }
  }


  private async fetchApiData(
    url: string | undefined, 
    options: ApiRequestOptions
  ): Promise<any> {
    if (!url) {
      throw new Error('API URL is undefined');
    }

    const defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers }
    });

    return response.json();
  }

  async bookAppointment(
    firstName: string,
    lastName: string,
    phoneNo: string,
    email: string
  ): Promise<void> {
    await this.page.waitForLoadState();


    await this.interactWithElement('fill', Locators.FirstNameInput, firstName);
    await this.interactWithElement('fill', Locators.LastNameInput, lastName);
    
    await this.page.waitForTimeout(2000);
    
    await this.interactWithElement('fill', Locators.PhoneNumberInput, phoneNo);
    await this.interactWithElement('fill', Locators.EmailInput, email);
    await this.interactWithElement('click', Locators.TermNCondition);

    const [response] = await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes("/appengine/appointment") &&
          response.status() === 200 &&
          response.request().method() === "POST"
      ),
      this.interactWithElement('click', Locators.BookAppointmentBtn)
    ]);


    this.responseBody = await response.json() as AppointmentResponseBody;
    console.log(this.responseBody);
  }

  async verifyingAppointmentDetails(): Promise<void> {

    const apiUrl = process.env.APPOINTMENT_URL?.replace(
      "{eventId}", 
      this.responseBody?.id ?? ''
    );


    const appointmentDetails = await this.fetchApiData(apiUrl, {
      method: "GET",
      headers: {
        Version: "2021-04-15",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });

    console.log(appointmentDetails);
    

    this.contactID = appointmentDetails.appointment?.contactId ?? '';
    console.log(this.contactID);


    const storedAppointment = {
      start_time: this.responseBody?.appointment?.start_time ?? '',
      end_time: this.responseBody?.appointment?.end_time ?? '',
      timezone: this.responseBody?.appointment?.timezone ?? '',
    };
    console.log(storedAppointment);

    const fetchedAppointment = {
      startTime: appointmentDetails?.startTime ?? '',
      endTime: appointmentDetails?.endTime ?? '',
    };
    console.log(fetchedAppointment);
    

    const isMatch: boolean = matchAppointments(
      fetchedAppointment,
      storedAppointment
    );
    await expect(isMatch).toBe(true);
  }

  async verifyingContactDetails(): Promise<void> {

    const apiUrl = process.env.CONTACT_URL?.replace(
      "{contactId}", 
      this.contactID
    );
    console.log(apiUrl);


    const contactDetails = await this.fetchApiData(apiUrl, {
      method: "GET",
      headers: {
        Version: "2021-07-28",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });

    console.log(contactDetails);


    const { 
      firstName, 
      lastName, 
      email, 
      phone 
    } = contactDetails.contact ?? {};

    expect(firstName).toEqual(ContactDetails.FirstName);
    expect(lastName).toEqual(ContactDetails.LastName);
    expect(email).toEqual(ContactDetails.Email);
    expect(phone?.replace("+91", "")).toEqual(
      ContactDetails.PhoneNo.toString().slice(0, -1)
    );
  }
}