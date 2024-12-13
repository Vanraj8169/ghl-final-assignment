import { parse, parseISO, format } from "date-fns";
import { toZonedTime, format as tzFormat } from "date-fns-tz";
import { FetchedAppointment, StoredAppointment } from "./interfaces";

// Generates a random date for a specific month in the year 2025, excluding weekends (Saturday and Sunday)
export function generateRandomDateForMonth(month: number): string {
  const year = 2025;

  // Set the start and end dates for the given month
  const startDate = new Date(`${year}-${month}-1`);
  const endDate = new Date(year, month, 0); // Last day of the given month

  let randomDate: Date;

  do {
    // Generate a random date between startDate and endDate
    const randomTime =
      startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime());
    randomDate = new Date(randomTime);
  } while (randomDate.getDay() === 0 || randomDate.getDay() === 6); // Exclude weekends

  // Extract year, month, and day
  const randomMonth = randomDate.getMonth() + 1; // getMonth is 0-based
  const randomDay = randomDate.getDate();

  // Format the date as YYYY-M-D (no leading zeros)
  return `${year}-${randomMonth}-${randomDay}`;
}

export const ContactDetails = {
  FirstName: "Ganesh",
  LastName: "Phalke",
  PhoneNo: "1234567890",
  Email: "ganesh@gmail.com",
};

function convertToIST(dateStr: string, sourceTimezone: string): Date {
  // Parse the source time string
  const sourceDate = parse(dateStr, "EEE, MMM d, yyyy h:mm a", new Date());

  const istDate = new Date(sourceDate);
  istDate.setHours(sourceDate.getHours() + 13);
  istDate.setMinutes(sourceDate.getMinutes() + 30);
  
  return istDate;
}

export function matchAppointments(
  fetchedAppointment: FetchedAppointment, 
  storedAppointment: StoredAppointment
): boolean {
  // Convert stored appointment times to IST
  const storedStartIST = convertToIST(storedAppointment.start_time, storedAppointment.timezone);
  const storedEndIST = convertToIST(storedAppointment.end_time, storedAppointment.timezone);

  // Parse fetched appointment times
  const fetchedStartIST = new Date(fetchedAppointment.startTime);
  const fetchedEndIST = new Date(fetchedAppointment.endTime);

  // Log detailed conversion information for debugging

  // Precise time comparison
  return (
    Math.abs(storedStartIST.getTime() - fetchedStartIST.getTime()) < 1000 &&
    Math.abs(storedEndIST.getTime() - fetchedEndIST.getTime()) < 1000
  );
}


