export function setCookieClientSide(
  name: string,
  value: string,
  daysToExpire: number
) {
  if (typeof window !== "undefined") {
    let expires = "";
    if (daysToExpire) {
      let date = new Date();
      date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
}
