export function adjustDateForTimezone(date: Date, userTimezoneOffset: number) {
  const dateInUTC = new Date(date.getTime());
  // console.log("dateInUTC", dateInUTC.toISOString());

  const userOffsetInMinutes = userTimezoneOffset * 60;
  // console.log("timedelta", userTimezoneOffset);
  const userDate = new Date(dateInUTC.getTime() + userOffsetInMinutes * 60000);
  // console.log("userDate", userDate.toISOString());

  return userDate;
}
