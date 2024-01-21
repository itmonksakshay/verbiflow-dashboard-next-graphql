export function adjustDateForTimezone(date: Date, userTimezoneOffset: number) {
  const dateInUTC = new Date(date.getTime());
  const userOffsetInMinutes = userTimezoneOffset * 60;
  const userDate = new Date(dateInUTC.getTime() + userOffsetInMinutes * 60000);
  return userDate;
}
