
// import { format } from "date-fns-tz";
import { FetchedAppointment, StoredAppointment } from "./interfaces";
import { formatInTimeZone } from 'date-fns-tz';

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


export function matchAppointments(fetchedAppointment, storedAppointment) {
  const { startTime, endTime } = fetchedAppointment;
  const { start_time, end_time, timezone } = storedAppointment;

  const startTimeInTargetTZ = new Date(formatInTimeZone(new Date(startTime), timezone, 'yyyy-MM-dd HH:mm:ss'));
  const endTimeInTargetTZ = new Date(formatInTimeZone(new Date(endTime), timezone, 'yyyy-MM-dd HH:mm:ss'));

  const storedStartTimeTZ = new Date(start_time);
  const storedEndTimeTZ = new Date(end_time);

  const fetchedStartTime = `${startTimeInTargetTZ.getDate()} ${startTimeInTargetTZ.getTime()}`;
  const fetchedEndTime = `${endTimeInTargetTZ.getDate()} ${endTimeInTargetTZ.getTime()}`;
  const storedStartTime = `${storedStartTimeTZ.getDate()} ${storedStartTimeTZ.getTime()}`;
  const storedEndTime = `${storedEndTimeTZ.getDate()} ${storedEndTimeTZ.getTime()}`;


  console.log(fetchedStartTime)
  console.log(fetchedEndTime)
  console.log(storedStartTime)
  console.log(storedEndTime)


  const isMatch = fetchedStartTime === storedStartTime && fetchedEndTime === storedEndTime;

  return isMatch;
}



